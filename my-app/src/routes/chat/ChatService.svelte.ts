// ChatService.svelte.ts - Shared types and interfaces for chat
import { Client } from '@stomp/stompjs';
import type { StompSubscription, IMessage } from '@stomp/stompjs';
import { apiRequest } from '$lib/api/authApi';
import { userStorage } from '$lib/auth/userStorage';
import { writable } from "svelte/store";

export const userMatches = writable<Match[]>([]);

export type MessageSender = 'self' | 'other';

export interface ChatMessage {
    id: number;
    text: string;
    sender: MessageSender;
    timestamp: Date;
    senderId?: number;
}

export interface Match {
    id: number;
    username: string;
    isActive: boolean;
}

export interface MessageRequestDto {
    content: string;
    writtenBy: number;
    matchId: number;
    timestamp: number;
}

export interface MessageResponseDto {
    id: number;
    content: string;
    senderId: number;
    timestamp: number;
}

export async function loadMatches(): Promise<void> {
    const token = localStorage.getItem("jwt_token");
    if (!token) {
        console.error("JWT token not found");
        userMatches.set([]);
        return;
    }

    try {
        const res = await fetch("http://localhost:8080/matches/all", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            throw new Error(`Server error: ${res.status} ${res.statusText}`);
        }

        const data: Match[] = await res.json();
        userMatches.set(data);
    } catch (err) {
        console.error("Failed to load matches:", err);
        userMatches.set([]);
    }
}

export let stompClient: Client | null = null;

export function initializeWebSocket(onConnectCallback?: () => void, onStompErrorCallback?: (frame: any) => void): void {
    stompClient = new Client({
        brokerURL: 'ws://localhost:8080/ws',
        connectHeaders: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        debug: function (str) {
            console.log('STOMP: ' + str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000
    });

    stompClient.onConnect = () => {
        console.log('Connected to WebSocket');
        if (onConnectCallback) onConnectCallback();
    };

    stompClient.onStompError = (frame) => {
        console.error('STOMP error', frame);
        if (onStompErrorCallback) onStompErrorCallback(frame);
    };

    stompClient.activate();
}

export async function selectMatch(chat: any, matchId: number, currentUserId: number, stompClient: Client | null, subscription: StompSubscription | null, chatContainer: HTMLElement) {
    chat.users = chat.users.map((match: Match) => ({
        ...match,
        isActive: match.id === matchId
    }));

    try {
        const messageHistory = await apiRequest<MessageResponseDto[]>(`/chat/${matchId}`);

        const newMessages = messageHistory.map(msg => ({
            id: msg.id,
            text: msg.content,
            sender: msg.senderId === currentUserId ? 'self' : 'other',
            timestamp: new Date(msg.timestamp),
            senderId: msg.senderId
        }));

        chat.messages = newMessages;

        if (stompClient && stompClient.connected) {
            if (subscription) {
                subscription.unsubscribe();
            }
            subscription = stompClient.subscribe(`/topic/messages/${matchId}`, (message: IMessage) => {
                const receivedMessage = JSON.parse(message.body) as MessageRequestDto;
                const newMsg: ChatMessage = {
                    id: chat.messages.length + 1,
                    text: receivedMessage.content,
                    sender: receivedMessage.writtenBy === currentUserId ? 'self' : 'other',
                    timestamp: new Date(receivedMessage.timestamp),
                    senderId: receivedMessage.writtenBy
                };
                chat.messages.push(newMsg);
                setTimeout(() => {
                    if (chatContainer) {
                        chatContainer.scrollTop = chatContainer.scrollHeight;
                    }
                }, 50);
            });
        }
        setTimeout(() => {
            if (chatContainer) {
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }
        }, 50);
    } catch (error) {
        console.error('Error loading messages:', error);
    }
}

export function sendMessage(message: string, currentMatchId: number, userID: number , stompClient: Client | null) {
    if (message.trim() === "" || !currentMatchId) return;

    const messageToSend: MessageRequestDto = {
        timestamp: Date.now(),
        content: message,
        writtenBy: userID,
        matchId: currentMatchId
    };

    console.log('Sending message:', messageToSend);

    if (stompClient && stompClient.connected) {
        stompClient.publish({
            destination: `/app/chat/${currentMatchId}`,
            body: JSON.stringify(messageToSend)
        });
    }
}

export function handleKeydown(event: KeyboardEvent, sendMessageHandler: () => void) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessageHandler();
    }
}

export function formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
} 
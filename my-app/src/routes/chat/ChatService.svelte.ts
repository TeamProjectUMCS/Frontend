// ChatService.svelte.ts - Shared types and interfaces for chat
import { Client } from '@stomp/stompjs';
import type { StompSubscription, IMessage } from '@stomp/stompjs';
import { apiRequest } from '$lib/api/authApi';
import { userStorage } from '$lib/auth/userStorage';

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
    name: string;
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

export function loadMatches(): Match[] {
    let curr = userStorage.getUser();
    let Match1: Match = {
        id: 1,
        name: 'test',
        isActive: true
    };
    let Match2: Match = {
        id: 2,
        name: 'test2',
        isActive: true
    };
    if (curr === "test") {
        return [Match2];
    } else {
        return [Match1];
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
    // Update active Match in UI
    chat.matches = chat.matches.map((match: Match) => ({
        ...match,
        isActive: match.id === matchId
    }));

    // Load message history for this match
    try {
        const messageHistory = await apiRequest<MessageResponseDto[]>(`/chat/${matchId}`);
        chat.messages = messageHistory.map(msg => ({
            id: msg.id,
            text: msg.content,
            sender: msg.senderId === currentUserId ? 'self' : 'other',
            timestamp: new Date(msg.timestamp),
            senderId: msg.senderId
        }));

        // Subscribe to this match's WebSocket topic
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

export function sendMessage(chat: any, currentMatchId: number, userID: number , stompClient: Client | null) {
    if (chat.newMessage.trim() === "" || !currentMatchId) return;
    const messageToSend: MessageRequestDto = {
        timestamp: Date.now(),
        content: chat.newMessage,
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
    chat.newMessage = "";
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
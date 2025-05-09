<script lang="ts">
    import {onMount, onDestroy} from 'svelte';
    import {Client} from '@stomp/stompjs';
    import type {IMessage, StompSubscription} from '@stomp/stompjs';
    import {auth, type User} from '$lib/auth/auth';
    import {userStorage} from "$lib/auth/userStorage";
    import type {MessageSender, ChatMessage, MessageRequestDto, MessageResponseDto, Match} from './ChatService.svelte';
    import {loadMatches, initializeWebSocket, stompClient,  sendMessage, handleKeydown, formatTime, selectMatch} from './ChatService.svelte';
    import {apiRequest} from '$lib/api/authApi';
    import MessageDisplay from './MessageDisplay.svelte';
    import MessageInput from './MessageInput.svelte';

    let subscription: StompSubscription | null = null;
    let currentMatchId: number = 1;
    let currentUser: User | null;

    let chat = $state({
        messages: [] as ChatMessage[],
        users: [] as Match[],
        newMessage: ""
    });

    let chatContainer: HTMLElement;

    onMount(() => {
        // Get current user from auth store
        const unsubscribe = auth.subscribe(value => {
            currentUser = value.user;
        });

        // Initialize and load data
        initializeData();

        return () => {
            unsubscribe();
        };
    });

    onDestroy(() => {
        if (stompClient && stompClient.connected) {
            if (subscription) {
                subscription.unsubscribe();
            }
            stompClient.deactivate();
        }
    });

    async function initializeData(): Promise<void> {
        chat.users = loadMatches();
        initializeWebSocket(
            () => {
                // onConnect callback
                console.log('Connected to WebSocket');
                if (currentMatchId) {
                    subscribeToMatch(currentMatchId);
                }
            },
            (frame) => {
                // onStompError callback
                console.error('STOMP error', frame);
            }
        );
    }

    function subscribeToMatch(matchId: number): void {
        if (stompClient && stompClient.connected) {
            if (subscription) {
                subscription.unsubscribe();
            }
            subscription = stompClient.subscribe(`/topic/messages/${matchId}`, (message: IMessage) => {
                const receivedMessage = JSON.parse(message.body) as MessageRequestDto;
                const newMsg: ChatMessage = {
                    id: chat.messages.length + 1,
                    text: receivedMessage.content,
                    sender: receivedMessage.writtenBy === currentUser?.id ? 'self' : 'other',
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
    }

    async function selectUserHandler(matchId: number): Promise<void> {
        await selectMatch(chat, matchId, currentMatchId, stompClient, subscription, chatContainer);
        currentMatchId = matchId;
    }

    function sendMessageHandler(): void {
        if(currentUser) {
            sendMessage(chat, currentMatchId, currentUser.id, stompClient);
        }
    }

    function handleKeydownHandler(event: KeyboardEvent): void {
        handleKeydown(event, sendMessageHandler);
    }

    function formatTimeHandler(date: Date): string {
        return formatTime(date);
    }
</script>

<div class="flex h-full w-full bg-gray-900 text-gray-100 overflow-hidden">
    <!-- Chat Content -->
    <div class="flex w-full h-full overflow-hidden">
        <!-- User List Sidebar -->
        <div class="w-40 border-r border-gray-700 h-almost-screen overflow-y-auto flex-shrink-0">
            <div class="p-2">
                {#each chat.users as user}
                    <div
                        class="flex items-center p-2 mb-2 hover:bg-gray-800 rounded cursor-pointer {user.isActive ? 'bg-gray-700 border-l-2 border-blue-400' : ''}"
                        on:click={() => selectUserHandler(user.id)}
                    >

                        <div class="w-6 h-6 rounded-full {user.isActive ? 'bg-blue-400' : 'bg-gray-400'} flex-shrink-0"></div>
                        <div class="ml-2 truncate text-sm {user.isActive ? 'font-medium text-gray-200' : 'text-gray-400'}">
                            {user.name}
                        </div>
                    </div>
                {/each}
            </div>
        </div>

        <!-- Messages Area -->
        <div class="flex-1 flex flex-col h-full overflow-hidden">
            <!-- Message list with fixed height and scrollbar -->
            <div bind:this={chatContainer} class="h-64 flex-1 overflow-y-auto p-4 space-y-4 max-h-128">
                <div class="flex flex-col space-y-4">
                    {#each chat.messages as message}
                        <MessageDisplay {message} />
                    {/each}
                </div>
            </div>

            <!-- Message input with fixed position at bottom -->
            <MessageInput {chat} onSend={sendMessageHandler} />
        </div>
    </div>
</div>

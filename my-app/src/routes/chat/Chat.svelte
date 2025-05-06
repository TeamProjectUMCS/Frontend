<script lang="ts">
    import {onMount, onDestroy} from 'svelte';
    import {Client} from '@stomp/stompjs';
    import type {IMessage, StompSubscription} from '@stomp/stompjs';
    import {auth} from '$lib/auth/auth';
    import {userStorage} from "$lib/auth/userStorage";

    // Define message types
    type MessageSender = 'self' | 'other';

    interface ChatMessage {
        id: number;
        text: string;
        sender: MessageSender;
        timestamp: Date;
        senderId?: number;
    }

    interface User {
        id: number;
        name: string;
        isActive: boolean;
    }

    interface MessageRequestDto {
        content: string;
        writtenBy: number;
        matchId: number;
        timestamp: number ;
    }

    interface MessageResponseDto {
        id: number;
        content: string;
        senderId: number;
        timestamp: number;
    }

    // WebSocket client
    let stompClient: Client | null = null;
    let subscription: StompSubscription | null = null;
    let currentMatchId: number = 1;
    let currentUser: any = null;

    let chat = $state({
        messages: [] as ChatMessage[],
        users: [] as User[],
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
        loadMatches();
        initializeWebSocket();
    }

    //TODO : CHANGE TO FETCH
    function loadMatches(): void {
        let curr = userStorage.getUser()
        let user1 : User = {
            id: 1,
            name: 'test',
            isActive: true
        };

        let user2 : User = {
            id: 2,
            name: 'test2',
            isActive: true
        };
        if (curr === "test"){
            chat.users.push(user2);
        }else {
            chat.users.push(user1);
        }

        console.log(chat.users)
    }

    function initializeWebSocket(): void {
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

            // If we have a selected match, subscribe to its messages
            if (currentMatchId) {
                subscribeToMatch(currentMatchId);
            }
        };

        stompClient.onStompError = (frame) => {
            console.error('STOMP error', frame);
        };

        stompClient.activate();
    }

    function subscribeToMatch(matchId: number): void {
        if (stompClient && stompClient.connected) {
            // Unsubscribe from previous topic if any
            if (subscription) {
                subscription.unsubscribe();
            }

            // Subscribe to the new match's messages
            subscription = stompClient.subscribe(`/topic/messages/${matchId}`, (message: IMessage) => {
                const receivedMessage = JSON.parse(message.body) as MessageRequestDto;

                // Add the received message to our messages array
                const newMsg: ChatMessage = {
                    id: chat.messages.length + 1,
                    text: receivedMessage.content,
                    sender: receivedMessage.writtenBy === currentUser.id ? 'self' : 'other',
                    timestamp: new Date(receivedMessage.timestamp),
                    senderId: receivedMessage.writtenBy
                };

                chat.messages.push( newMsg)

                // Scroll to bottom
                setTimeout(() => {
                    if (chatContainer) {
                        chatContainer.scrollTop = chatContainer.scrollHeight;
                    }
                }, 50);
            });
        }
    }

    async function selectUser(matchId: number): Promise<void> {
        // Update active user in UI
        chat.users = chat.users.map(user => ({
            ...user,
            isActive: user.id === matchId
        }));

        currentMatchId = matchId;

        // Load message history for this match
        try {
            const response = await fetch(`http://localhost:8080/chat/${matchId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            });

            if (response.ok) {
                const messageHistory = await response.json() as MessageResponseDto[];
                chat.messages = messageHistory.map(msg => ({
                    id: msg.id,
                    text: msg.content,
                    sender: msg.senderId === currentUser.id ? 'self' : 'other',
                    timestamp: new Date(msg.timestamp),
                    senderId: msg.senderId
                }));

                // Subscribe to this match's WebSocket topic
                subscribeToMatch(matchId);

                // Scroll to bottom
                setTimeout(() => {
                    if (chatContainer) {
                        chatContainer.scrollTop = chatContainer.scrollHeight;
                    }
                }, 50);
            }
        } catch (error) {
            console.error('Error loading messages:', error);
        }
    }

    // Function to send a new message
    function sendMessage(): void {
        if (chat.newMessage.trim() === "" || !currentMatchId) return;

        // Create message object
        const messageToSend: MessageRequestDto = {
            timestamp: Date.now(),
            content: chat.newMessage,
            writtenBy: 1,     // was senderId
            matchId: currentMatchId        // new: must be sent explicitly
        };

        // Send via WebSocket
        if (stompClient && stompClient.connected) {
            stompClient.publish({
                destination: `/app/chat/${currentMatchId}`,
                body: JSON.stringify(messageToSend)
            });
        }

        // Clear input
        chat.newMessage = "";
    }

    // Handle enter key to send message
    function handleKeydown(event: KeyboardEvent): void {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    }

    // Format timestamp
    function formatTime(date: Date): string {
        return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    }
</script>

<!-- Rest of your HTML remains the same -->
<div class="flex h-full w-full bg-gray-900 text-gray-100 overflow-hidden">
    <!-- Chat Content -->
    <div class="flex w-full h-full overflow-hidden">
        <!-- User List Sidebar -->
        <div class="w-40 border-r border-gray-700 h-almost-screen overflow-y-auto flex-shrink-0">
            <div class="p-2">
                {#each chat.users as user}
                    <div
                            class="flex items-center p-2 mb-2 hover:bg-gray-800 rounded cursor-pointer {user.isActive ? 'bg-gray-700 border-l-2 border-blue-400' : ''}"
                            on:click={() => selectUser(user.id)}
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
                        <div class="flex flex-col {message.sender === 'self' ? 'items-end' : 'items-start'}">
                            <div class="{message.sender === 'self' ? 'bg-pink-200 text-gray-800' : 'bg-green-200 text-gray-800'} rounded-lg px-4 py-2 max-w-xs sm:max-w-md break-words">
                                {message.text}
                            </div>
                            <div class="text-xs text-gray-500 mt-1">
                                {formatTime(message.timestamp)}
                            </div>
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Message input with fixed position at bottom -->
            <div class="border-t border-gray-700 p-3 flex-shrink-0">
                <div class="flex items-center">
                    <input
                            bind:value={chat.newMessage}
                            class="flex-1 bg-gray-800 border border-gray-700 rounded-l-md py-2 px-3 text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            on:keydown={handleKeydown}
                            placeholder="Type a message..."
                            type="text"
                    />
                    <button
                            class="bg-gray-700 hover:bg-gray-600 text-gray-200 py-2 px-4 rounded-r-md border border-gray-700 border-l-0"
                            on:click={sendMessage}
                    >
                        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path clip-rule="evenodd"
                                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                  fill-rule="evenodd"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

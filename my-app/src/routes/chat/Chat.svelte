<!-- App.svelte -->
<script lang="ts">
    import {onMount} from 'svelte';

    // Define message type
    type MessageSender = 'self' | 'other';

    interface ChatMessage {
        id: number;
        text: string;
        sender: MessageSender;
        timestamp: Date;
    }

    interface User {
        id: number;
        name: string;
        isActive: boolean;
    }

    // Sample messages data
    let messages: ChatMessage[] = [
        {id: 1, text: "Hello, how can I help you today?", sender: "other", timestamp: new Date(Date.now() - 3600000)},
        {id: 2, text: "I need assistance with my account settings.", sender: "self", timestamp: new Date(Date.now() - 3000000)},
        {
            id: 3,
            text: "Sure, I'd be happy to help with that. What specific settings are you trying to adjust?",
            sender: "other",
            timestamp: new Date(Date.now() - 2400000)
        }
    ];

    // Sample users data
    let users: User[] = [
        {id: 1, name: "Username", isActive: true},
        {id: 2, name: "Sarah", isActive: false},
        {id: 3, name: "John", isActive: false},
        {id: 4, name: "Alex", isActive: false},
        {id: 5, name: "Maya", isActive: false},
        {id: 6, name: "Maya", isActive: false},
        {id: 7, name: "Maya", isActive: false},
        {id: 8, name: "Maya", isActive: false},
        {id: 9, name: "Maya", isActive: false},
        {id: 10, name: "Maya", isActive: false},
        {id: 11, name: "Maya", isActive: false},
        {id: 12, name: "Maya", isActive: false},
        {id: 13, name: "Maya", isActive: false}

    ];

    let newMessage = "";
    let chatContainer: HTMLElement;

    function selectUser(userId: number): void {
        users = users.map(user => ({
            ...user,
            isActive: user.id === userId
        }));

        // In a real app, you would load messages for the selected user here
        // For now we'll just simulate this behavior
        if (userId !== 1) {
            messages = [
                {id: 1, text: `This is a conversation with user ${userId}.`, sender: "other", timestamp: new Date(Date.now() - 1800000)}
            ];
        } else {
            messages = [
                {id: 1, text: "Hello, how can I help you today?", sender: "other", timestamp: new Date(Date.now() - 3600000)},
                {id: 2, text: "I need assistance with my account settings.", sender: "self", timestamp: new Date(Date.now() - 3000000)},
                {
                    id: 3,
                    text: "Sure, I'd be happy to help with that. What specific settings are you trying to adjust?",
                    sender: "other",
                    timestamp: new Date(Date.now() - 2400000)
                }
            ];
        }

        // Scroll to bottom after changing conversation
        setTimeout(() => {
            if (chatContainer) {
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }
        }, 50);
    }

    // Function to send a new message
    function sendMessage(): void {
        if (newMessage.trim() === "") return;

        const message: ChatMessage = {
            id: messages.length + 1,
            text: newMessage,
            sender: "self",
            timestamp: new Date()
        };

        messages = [...messages, message];
        newMessage = "";

        // Scroll to bottom after message is added
        setTimeout(() => {
            if (chatContainer) {
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }
        }, 50);
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

    // Scroll to bottom on mount
    onMount(() => {
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    });
</script>

<div class="flex h-full w-full bg-gray-900 text-gray-100 overflow-hidden">
    <!-- Chat Content -->
    <div class="flex w-full h-full overflow-hidden">
        <!-- User List Sidebar -->
        <div class="w-40 border-r border-gray-700 h-almost-screen overflow-y-auto flex-shrink-0">
            <div class="p-2">
                {#each users as user}
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
                    {#each messages as message}
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
                            bind:value={newMessage}
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
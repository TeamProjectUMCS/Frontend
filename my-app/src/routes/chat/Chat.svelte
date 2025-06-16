<script lang="ts">
    import {onMount, onDestroy} from 'svelte';
    import type {IMessage, StompSubscription} from '@stomp/stompjs';
    import {auth, type User} from '$lib/auth/auth';
    import type {MessageSender, ChatMessage, MessageRequestDto, MessageResponseDto, Match} from './ChatService.svelte';
    import {initializeWebSocket, stompClient,  sendMessage, handleKeydown, formatTime, selectMatch} from './ChatService.svelte';
    import MessageDisplay from './MessageDisplay.svelte';
    import MessageInput from './MessageInput.svelte';

    import { userMatches, loadMatches } from './ChatService.svelte';


    let subscription: StompSubscription | null = null;
    let currentMatchId: number;
    let currentUser: User | null;

    let chat = $state({
        messages: [] as ChatMessage[],
        users: [] as Match[],
        newMessage: ""
    });

    let chatContainer: HTMLElement;

    onMount(() => {
        const unsubscribe = auth.subscribe(async value => {
            currentUser = value.user;
            if (currentUser) {
                await initializeData();
            }
        });

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
        await loadMatches();

        let firstMatchId: number | null = null;

        const unsubscribe = userMatches.subscribe(matches => {
            console.log("Loaded matches:", matches);
            chat.users = matches;
            if (matches.length > 0) {
                firstMatchId = matches[0].id;
                if (firstMatchId !== undefined) {
                    currentMatchId = firstMatchId;
                } else {
                    console.warn("First match ID is undefined");
                }
            } else {
                console.warn("No matches found");
            }
        });
        function scrollToBottom() {
            setTimeout(() => {
                if (chatContainer) {
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                }
            }, 50);
        }


        initializeWebSocket(
            async () => {
                console.log('Connected to WebSocket');
                if (currentUser && firstMatchId !== null && firstMatchId !== undefined) {
                    await selectMatch(chat, firstMatchId, currentUser.id, stompClient, (sub) => subscription = sub, chatContainer);

                } else {
                    console.warn("Cannot select match: Missing currentUser or firstMatchId");
                }
            },
            (frame) => {
                console.error('STOMP error', frame);
            }
        );
    }

    //
    //
    // function subscribeToMatch(matchId: number): void {
    //     if (stompClient && stompClient.connected) {
    //         if (subscription) {
    //             subscription.unsubscribe();
    //         }
    //         subscription = stompClient.subscribe(`/topic/messages/${matchId}`, (message: IMessage) => {
    //             const receivedMessage = JSON.parse(message.body) as MessageRequestDto;
    //             const newMsg: ChatMessage = {
    //                 id: chat.messages.length + 1,
    //                 text: receivedMessage.content,
    //                 sender: receivedMessage.writtenBy === currentUser?.id ? 'self' : 'other',
    //                 timestamp: new Date(receivedMessage.timestamp),
    //                 senderId: receivedMessage.writtenBy
    //             };
    //             chat.messages.push(newMsg);
    //             setTimeout(() => {
    //                 if (chatContainer) {
    //                     chatContainer.scrollTop = chatContainer.scrollHeight;
    //                 }
    //             }, 50);
    //         });
    //     }
    // }

    async function selectUserHandler(matchId: number): Promise<void> {
        if (!matchId) {
            console.error('Invalid matchId:', matchId);
            return;
        }

        currentMatchId = matchId;

        if (currentUser) {
            //let subscriptionRef = { current: subscription };
            await selectMatch(chat, matchId, currentUser.id, stompClient, subscription, chatContainer);
        }
    }

    function sendMessageHandler(): void {
        if (currentUser) {
            const message = chat.newMessage;
            if (message.trim() === "") return;

            if (!currentMatchId) {
                console.error('No currentMatchId set; cannot send message.');
                return;
            }

            sendMessage(message, currentMatchId, currentUser.id, stompClient);
            chat.newMessage = "";
            //scrollToBottom();
        }
    }

    function handleKeydownHandler(event: KeyboardEvent): void {
        handleKeydown(event, sendMessageHandler);
    }

    function formatTimeHandler(date: Date): string {
        return formatTime(date);
    }
</script>

<div class="flex h-full w-full bg-background text-white overflow-hidden">

    <div class="flex w-full h-full overflow-hidden">

        <div class="w-40 border-r border-secondary-700 h-almost-screen overflow-y-auto ">
            <div class="p-2">
                {#each chat.users as match (match.id)}
                    <div
                        class="flex items-center p-2 mb-2 hover:bg-primary-950 rounded cursor-pointer {match.isActive ? 'bg-neutral-800 border-l-2 border-primary-600' : ''}"
                        on:click={() => selectUserHandler(match.id)}>

                        <div class="w-6 h-6 rounded-full {match.isActive ? 'bg-primary-700' : 'bg-gray-400'}"></div>
                        <div class="ml-2 truncate text-sm {match.isActive ? 'font-medium text-gray-200' : 'text-gray-400'}">
                            {match.username}
                        </div>
                    </div>
                {/each}
            </div>
        </div>


        <div class="flex-1 flex flex-col h-almost-screen overflow-hidden">
            <div bind:this={chatContainer} class="flex-1 overflow-y-auto p-4 space-y-4">
                <div class="flex flex-col space-y-4 " >
                    {#each chat.messages as message}
                        <MessageDisplay {message} />
                    {/each}
                </div>
            </div>
            <div class="h-[10%]">
                <MessageInput {chat} onSend={sendMessageHandler} />
            </div>
        </div>
    </div>
</div>

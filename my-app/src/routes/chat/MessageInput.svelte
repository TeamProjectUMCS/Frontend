<script lang="ts">
    import { handleKeydown } from './ChatService.svelte';
    
    export let chat: {
        newMessage: string;
    };
    export let onSend: () => void;
</script>

<div class="border-t border-gray-700 p-3 flex-shrink-0">
    <div class="flex items-center">
        <input
            bind:value={chat.newMessage}
            class="flex-1 bg-gray-800 border border-gray-700 rounded-l-md py-2 px-3 text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            on:keydown={(e) => handleKeydown(e, onSend)}
            placeholder="Type a message..."
            type="text"
        />
        <button
            class="bg-gray-700 hover:bg-gray-600 text-gray-200 py-2 px-4 rounded-r-md border border-gray-700 border-l-0"
            on:click={onSend}
        >
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      fill-rule="evenodd"/>
            </svg>
        </button>
    </div>
</div> 
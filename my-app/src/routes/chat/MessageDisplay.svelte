<script lang="ts">
    import type { ChatMessage } from './ChatService.svelte';
    import { formatTime } from './ChatService.svelte';

    export let message: ChatMessage;
</script>

<div class="flex w-full mb-1 {message.sender === 'self' ? 'justify-end' : 'justify-start'}">
    <div class="{message.sender === 'self' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'} rounded-lg px-4 py-2 max-w-xs sm:max-w-md break-words">
        {message.text}
        <div class="text-xs text-gray-200 mt-1 text-right">
            {formatTime(message.timestamp)}
        </div>
    </div>
</div>

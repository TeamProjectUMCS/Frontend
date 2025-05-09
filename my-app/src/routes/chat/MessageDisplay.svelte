<script lang="ts">
    import type { ChatMessage } from './ChatService.svelte';
    import { formatTime } from './ChatService.svelte';

    export let message: ChatMessage;
</script>

<div class="flex flex-col {message.sender === 'self' ? 'items-end' : 'items-start'}">
    <div class="{message.sender === 'self' ? 'bg-blue-200 text-gray-800' : 'bg-gray-200 text-gray-800'} rounded-lg px-4 py-2 max-w-xs sm:max-w-md break-words">
        {message.text}
    </div>
    <div class="text-xs text-gray-500 mt-1">
        {formatTime(message.timestamp)}
    </div>
</div> 
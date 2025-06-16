<script lang="ts">
    import type { ChatMessage } from './ChatService.svelte';
    import { formatTime } from './ChatService.svelte';

    export let message: ChatMessage;
</script>
<div class="flex flex-col {message.sender === 'self' ? 'items-end' : 'items-start'}">
    <div class="{message.sender === 'self' ? 'bg-primary-900 text-white' : 'bg-background text-white border-2 border-secondary-900'} rounded-lg px-4 py-2 max-w-xs sm:max-w-md break-words">
        {message.text}
    </div>
        <div class="text-xs text-gray-200 mt-1 text-right">
            {formatTime(message.timestamp)}
        </div>
</div>

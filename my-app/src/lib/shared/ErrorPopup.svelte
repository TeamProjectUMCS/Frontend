<script lang="ts">
    import {fly} from 'svelte/transition';

    export let error: string;
    export let disappear: () => void;

    $: if (error) {
        setTimeout(() => {
            disappear();
        }, 3000);
    }

</script>

{#if error}
    <div in:fly out:fly
         class="text-neutral-100 fixed top-3   left-1/2 -translate-x-1/2 bg-error-700 w-2/7 max-h-fit p-2 text-center rounded-lg flex justify-center items-center shadow-lg">
        {error}
    </div>
{/if}
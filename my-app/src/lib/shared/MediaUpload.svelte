<script lang="ts">
    import {onMount} from 'svelte';
    import ErrorPopup from "$lib/shared/ErrorPopup.svelte";
    import {apiRequest} from "$lib/api/authApi";

    // Add a callback prop
    export let onMediaUpdate: (media: string[]) => void = () => {};

    let files: FileList | null = null;
    let mediaType: 'image' | 'video' = 'image';
    let userMedia: string[] = [];
    let uploading: boolean = false;
    let error: string = "";

    onMount(async () => {
        await loadUserMedia();
    });

    async function loadUserMedia(): Promise<void> {
        try {
            userMedia = await apiRequest<string[]>('/api/media/list');
            console.log('Loaded user media:', userMedia);
            // Call the callback with updated media
            onMediaUpdate(userMedia);
        } catch (err) {
            console.error('Error loading media:', err);
        }
    }

    async function handleSubmit(): Promise<void> {
        if (!files || files.length === 0) return;

        console.log('Uploading file:', files[0].name, 'Type:', mediaType);

        uploading = true;

        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('type', mediaType);

        try {
            await apiRequest('/api/media/upload', { method: 'POST', body: formData });
            files = null;
            await loadUserMedia();
        } catch (err) {
            error = err instanceof Error ? err.message : 'Unknown error occurred';
        } finally {
            uploading = false;
        }
    }

    async function deleteMedia(objectName: string): Promise<void> {
        try {
            await apiRequest(`/api/media/${encodeURIComponent(objectName)}`, {
                method: 'DELETE'
            });
            await loadUserMedia();
        } catch (err) {
            error = err instanceof Error ? err.message : 'Unknown error occurred';
        }
    }

    function extractObjectName(url: string): string {
        const urlParts = url.split('/');
        return urlParts[urlParts.length - 1];
    }
</script>



<ErrorPopup {error} disappear={() => error = ""}/>
<div class="max-w-3xl mx-auto p-5">
    <h2>Upload Profile Media</h2>

    <form on:submit|preventDefault={handleSubmit}>
        <div class="mb-4">
            <label>
                <input type="radio" bind:group={mediaType} value="image">
                Image
            </label>
            <label>
                <input type="radio" bind:group={mediaType} value="video">
                Video
            </label>
        </div>

        <div class="mb-4">
            <input type="file" bind:files accept={mediaType === 'image' ? 'image/jpeg,image/png,image/gif' : 'video/mp4,video/quicktime'}>
        </div>

        <button type="submit" disabled={!files || uploading} class="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50">
            {uploading ? 'Uploading...' : 'Upload'}
        </button>
    </form>

    <div class="mt-8">
        <h3>Your Media</h3>

        {#if userMedia.length === 0}
            <p>No media uploaded yet</p>
        {:else}
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {#each userMedia as mediaUrl}
                    <div class="relative rounded-lg overflow-hidden">
                        {#if mediaUrl.includes('image')}
                            <img src={mediaUrl} alt="User uploaded image" class="w-full h-48 object-cover"/>
                        {:else if mediaUrl.includes('video')}
                            <video controls class="w-full h-48 object-cover">
                                <source src={mediaUrl} type="video/mp4">
                                Your browser does not support video playback.
                            </video>
                        {/if}
                        <button class="absolute bottom-1 right-1 bg-red-600 bg-opacity-70 text-white border-none rounded px-2.5 py-1 cursor-pointer"
                                on:click={() => deleteMedia(extractObjectName(mediaUrl))}>
                            Delete
                        </button>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>
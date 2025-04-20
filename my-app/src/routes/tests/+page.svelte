<script lang="ts">
    import MediaUpload from "$lib/shared/MediaUpload.svelte";

    let uploadedMedia: string[] = [];

    // Callback to update the uploaded media list
    function handleMediaUpdate(media: string[]) {
        uploadedMedia = media;
    }
</script>

<div class="max-w-3xl mx-auto p-5">
    <h1>Media Upload Test</h1>

    <MediaUpload on:mediaUpdate={(e) => handleMediaUpdate(e.detail)} />

    <div class="mt-8">
        <h3>Uploaded Media</h3>

        {#if uploadedMedia.length === 0}
            <p>No media uploaded yet</p>
        {:else}
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {#each uploadedMedia as mediaUrl}
                    <div class="relative rounded-lg overflow-hidden">
                        {#if mediaUrl.includes('image')}
                            <img src={mediaUrl} alt="Uploaded image" class="w-full h-48 object-cover" />
                        {:else if mediaUrl.includes('video')}
                            <video controls class="w-full h-48 object-cover">
                                <source src={mediaUrl} type="video/mp4">
                                Your browser does not support video playback.
                            </video>
                        {/if}
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>
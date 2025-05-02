<script lang="ts">
    import MediaUpload from "$lib/shared/MediaUpload.svelte";
    import {onMount} from 'svelte';
    import {apiRequest} from "$lib/api/authApi";

    let uploadedMedia: string[] = [];

    // Load existing media on component mount
    onMount(async () => {
        try {
            uploadedMedia = await apiRequest<string[]>('/api/media/list');
            console.log('Loaded media:', uploadedMedia);
        } catch (err) {
            console.error('Error loading media:', err);
        }
    });

    function handleMediaUpdate(media: string[]) {
        uploadedMedia = media;
        console.log('Media updated:', uploadedMedia);
    }

    // Helper function to determine if a URL is an image
    function isImage(url: string): boolean {
        // Extract the file path before any query parameters
        const filePath = url.split('?')[0];

        // Check for image file extensions or patterns in the path
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];
        return imageExtensions.some(ext => filePath.toLowerCase().endsWith(ext)) ||
            filePath.includes('/image/') ||
            filePath.includes('image');
    }

    // Helper function to determine if a URL is a video
    function isVideo(url: string): boolean {
        // Extract the file path before any query parameters
        const filePath = url.split('?')[0];

        // Check for video file extensions or patterns in the path
        const videoExtensions = ['.mp4', '.mov', '.avi', '.webm', '.mkv', '.flv'];
        return videoExtensions.some(ext => filePath.toLowerCase().endsWith(ext)) ||
            filePath.includes('/video/') ||
            filePath.includes('video');
    }
</script>

<div class="max-w-3xl mx-auto p-5 ">
    <h1 class="text-2xl font-bold mb-6">Media Upload Test</h1>

    <MediaUpload onMediaUpdate={handleMediaUpdate} />

    <div class="mt-8">
        <h3 class="text-xl font-semibold mb-4">Uploaded Media</h3>

        {#if uploadedMedia.length === 0}
            <p class="text-gray-600">No media uploaded yet</p>
        {:else}
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {#each uploadedMedia as mediaUrl}
                    <div class="relative rounded-lg overflow-hidden shadow-md bg-gray-100">
                        {#if isImage(mediaUrl)}
                            <img src={mediaUrl} alt="Uploaded image" class="w-full h-48 object-cover"/>
                            <div class="p-2 bg-white">
                                <p class="text-sm truncate">Image</p>
                            </div>
                        {:else if isVideo(mediaUrl)}
                            <video controls class="w-full h-48 object-cover">
                                <source src={mediaUrl} type="video/mp4">
                                Your browser does not support video playback.
                            </video>
                            <div class="p-2 bg-white">
                                <p class="text-sm truncate">Video</p>
                            </div>
                        {:else}
                            <div class="flex items-center justify-center h-48 bg-gray-200">
                                <p class="text-gray-600">Unknown media type</p>
                            </div>
                            <div class="p-2 bg-white">
                                <p class="text-sm truncate">Unknown</p>
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>
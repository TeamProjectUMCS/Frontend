<script lang="ts">
	import {page} from '$app/state';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import '../app.css';
	// Import our test style

	let { children } = $props();
</script>


<!-- WAZNE NIE DA SIE SKROLLOWAC STRONY DOPOKI JEST TUTAJ OVERFLOW-HIDDEN, w galeri zrobimy wlasnego skrola czy cos , zeby ladnie wygladalo -->
<div class="flex flex-col bg-background text-neutral-100 w-full h-full ">
	{#if page.url.pathname !== '/login' && page.url.pathname !== '/register' && page.url.pathname !== '/'}
		<Header/>
	{/if}

	<main>
		{@render children()}
	</main>

	{#if page.url.pathname === '/'}
		<Footer/>
	{/if}

</div>

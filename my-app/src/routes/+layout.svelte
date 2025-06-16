<script lang="ts">
	import {page} from '$app/state';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import '../app.css';
	// Import our test style

	let { children } = $props();
</script>


<div class="flex flex-col min-h-screen bg-background text-neutral-100 w-full overflow-hidden ">
	{#if page.url.pathname !== '/login' && page.url.pathname !== '/register' && page.url.pathname !== '/' && page.url.pathname !== '/main'}
		<Header/>
	{/if}

	<main>
		{@render children()}
	</main>

	{#if page.url.pathname === '/'}
		<Footer/>
	{/if}

</div>

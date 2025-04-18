<script lang="ts">
	import {page} from '$app/state';
	import Header from './Header.svelte';
	import '../app.css';
	// Import our test style

	let { children } = $props();
</script>


<!-- WAZNE NIE DA SIE SKROLLOWAC STRONY DOPOKI JEST TUTAJ OVERFLOW-HIDDEN, w galeri zrobimy wlasnego skrola czy cos , zeby ladnie wygladalo -->
<div class="h-screen overflow-hidden flex flex-col bg-background">
	{#if page.url.pathname !== '/login' && page.url.pathname !== '/register'}
		<Header/>
	{/if}

	<main>
		{@render children()}
	</main>

</div>

<style>


	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>

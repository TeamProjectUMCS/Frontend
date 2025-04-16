<script lang="ts">
	import {page} from '$app/state';
	import Header from './Header.svelte';
	import '../app.css';
	// Import our test style

	let { children } = $props();
</script>


<div class="min-h-screen flex flex-col bg-gradient-to-br from-neutral-300 to-neutral-500">
	{#if page.url.pathname !== '/login' && page.url.pathname !== '/register'}
		<Header/>
	{/if}

	<main>
		{@render children()}
	</main>

</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

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

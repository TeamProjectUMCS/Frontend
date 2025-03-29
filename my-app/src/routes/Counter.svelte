<script lang="ts">
	import {Spring} from 'svelte/motion';

	const count = new Spring(0);
	const offset = $derived(modulo(count.current, 1));

	function modulo(n: number, m: number) {
		// handle negative numbers
		return ((n % m) + m) % m;
	}
</script>

<div class="counter flex flex-col items-center border-t border-b border-gray-200 my-4">
	<button aria-label="Decrease the counter by one" class="w-8 h-8 flex items-center justify-center bg-transparent hover:bg-gray-100"
			onclick={() => (count.target -= 1)}>
		<svg aria-hidden="true" class="w-6 h-6" viewBox="0 0 1 1">
			<path class="stroke-current text-gray-700" d="M0,0.5 L1,0.5"/>
		</svg>
	</button>

	<div class="counter-viewport w-32 h-16 overflow-hidden text-center relative">
		<div class="counter-digits absolute w-full h-full" style="transform: translate(0, {100 * offset}%)">
			<strong aria-hidden="true"
					class="hidden absolute w-full h-full flex items-center justify-center text-theme-1 text-4xl">{Math.floor(count.current + 1)}</strong>
			<strong class="absolute w-full h-full flex items-center justify-center text-custom-blue text-4xl">{Math.floor(count.current)}</strong>
		</div>
	</div>

	<button aria-label="Increase the counter by one" class="w-8 h-8 flex items-center justify-center bg-transparent hover:bg-gray-100"
			onclick={() => (count.target += 1)}>
		<svg aria-hidden="true" class="w-6 h-6" viewBox="0 0 1 1">
			<path class="stroke-current text-gray-700" d="M0,0.5 L1,0.5 M0.5,0 L0.5,1"/>
		</svg>
	</button>
</div>

<style>
	.counter {
		display: flex;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		margin: 1rem 0;
	}

	.counter button {
		width: 2em;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 0;
		background-color: transparent;
		touch-action: manipulation;
		font-size: 2rem;
	}

	.counter button:hover {
		background-color: var(--color-bg-1);
	}

	svg {
		width: 25%;
		height: 25%;
	}

	path {
		vector-effect: non-scaling-stroke;
		stroke-width: 2px;
		stroke: #444;
	}

	.counter-viewport {
		width: 8em;
		height: 4em;
		overflow: hidden;
		text-align: center;
		position: relative;
	}

	.counter-viewport strong {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;
		font-weight: 400;
		color: var(--color-theme-1);
		font-size: 4rem;
		align-items: center;
		justify-content: center;
	}

	.counter-digits {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.hidden {
		top: -100%;
		user-select: none;
	}
</style>

<script lang="ts">
	import logo from '$lib/images/logo1.png';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1>
		<span class="welcome bg">
			<picture>
				<img src={logo} alt="logo of svelove" />
			</picture>
		</span>
	</h1>
	<div class="flex space-x-4">
	<a href="/register" class="button bg-primary-700 rounded-lg h-10">
		Register
	</a>
	<a href="/login" class="button bg-primary-700 rounded-lg h-10">
		Login
	</a>
	</div>
</section>

<style>
	section {

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 50%;
		margin: auto;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.button {
		display: inline-block;
		padding: 0.5em 1em;
		color: white;
		text-decoration: none;
		border-radius: 4px;
		cursor: pointer;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>

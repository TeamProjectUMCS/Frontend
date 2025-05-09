<script lang="ts">
	import logo from '$lib/images/logo1.png';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section class="w-full h-screen justify-center flex flex-col items-center">
	<span class="welcome bg flex">
		<picture>
			<img src={logo} alt="logo of svelove"/>
		</picture>
	</span>

	<div class="flex space-x-4 justify-center">
		<a href="/register" class="button flex items-center justify-center bg-primary-700 hover:bg-primary-950
		 							rounded-3xl min-h-14 min-w-36 text-white shadow-button transition-colors duration-300
									text-xl no-underline">
			Register
		</a>
		<a href="/login" class="button flex items-center justify-center text-xl no-underline bg-primary-700 hover:bg-primary-950
		 						rounded-3xl min-h-14 min-w-36 text-white shadow-button transition-colors duration-300">
			Login
		</a>
	</div>
</section>
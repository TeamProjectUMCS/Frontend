<script lang="ts">
	import {page} from '$app/state';
</script>

<header class="flex items-center justify-between p-4 bg-neutral-700 text-neutral-100">
	<nav class="flex items-center justify-between w-screen">
		<ul class="flex items-center space-x-4 text-neutral-100">
			<li aria-current={page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={page.url.pathname.startsWith('/tests') ? 'page' : undefined}>
				<a href="/tests">TEST</a>
			</li>
			<li aria-current={page.url.pathname.startsWith('/chat') ? 'page' : undefined}>
				<a href="/chat">chat</a>
			</li>
		</ul>
	</nav>
</header>



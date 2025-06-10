<script lang="ts">
	import {page} from '$app/state';
</script>

<div class=" text-white">
	<header class="flex items-center justify-center p-4 bg-background text-neutral-100 border-secondary-700 border-b">
		<nav class="w-full flex justify-center">
			<ul class="flex items-center space-x-4 text-neutral-100">
				<li aria-current={page.url.pathname === '/discover' ? 'page' : undefined}>
					<a href="/discover" class="text-white hover:text-secondary-700 text-lg">Discover</a>
				</li>
				<li aria-current={page.url.pathname.startsWith('/tests') ? 'page' : undefined}>
					<a href="/tests" class="text-white hover:text-secondary-700 text-lg">Test michasia</a>
				</li>
				<li aria-current={page.url.pathname.startsWith('/chat') ? 'page' : undefined}>
					<a href="/chat" class="text-white hover:text-secondary-700 text-lg">Chat</a>
				</li>
				<li aria-current={page.url.pathname === '/profile' ? 'page' : undefined} >
					<a href="/profile" class="text-white hover:text-secondary-700 text-lg">Profile</a>
				</li>
				<li aria-current={page.url.pathname === '/logout' ? 'page' : undefined}>
					<a href="/" class="text-white hover:text-secondary-700 text-lg" >Logout :(</a>
				</li>
			</ul>
		</nav>
	</header>
</div>



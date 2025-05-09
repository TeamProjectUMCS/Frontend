<script lang="ts">
	import {page} from '$app/state';
</script>

<div class=" text-white">
	<ul>
		<li aria-current={page.url.pathname === '/chat' ? 'page' : undefined}>
			<a href="/" class="text-white">Chat</a>
		</li>
		<li aria-current={page.url.pathname === '/profile' ? 'page' : undefined} >
			<a href="/" class="text-white">Profile</a>
		</li>
		<li aria-current={page.url.pathname.startsWith('/tests') ? 'page' : undefined}>
			<a href="/tests" class="text-white">TEST</a>
		</li>
		<li aria-current={page.url.pathname === '/logout' ? 'page' : undefined}>
			<a href="/" class="text-white">Logout</a>
		</li>
    <li aria-current={page.url.pathname.startsWith('/chat') ? 'page' : undefined}>
				<a href="/chat" class ="text-white">chat</a>
			</li>
	</ul>
</div>



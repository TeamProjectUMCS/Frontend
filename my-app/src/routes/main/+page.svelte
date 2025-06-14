<script lang="ts">
import {page} from "$app/state";
import logo from "$lib/images/logo1.png";
</script>

<div class="flex flex-col h-screen overflow-hidden bg-background">

    <div class="flex justify-center">
        <a href="/">
            <img src={logo} alt="logo of svelove" class="h-36 mt-6" />
        </a>
    </div>

    <div class="flex-grow flex items-center justify-center">
        <div class="grid grid-cols-2 grid-rows-2 gap-6 place-items-center mb-52">
            <button aria-current={page.url.pathname === '/discover' ? 'page' : undefined}>
                <a href="/discover" class="text-white shadow-button hover:text-primary-700 hover:border-primary-700 hover:bg-neutral-900
                                   transition-colors duration-300 text-xl p-6 w-80 h-28 flex items-center justify-center bg-primary-700 rounded">
                    Discover
                </a>
            </button>

            <button aria-current={page.url.pathname.startsWith('/chat') ? 'page' : undefined}>
                <a href="/chat" class="text-white shadow-button  hover:text-primary-700 hover:border-primary-700 hover:bg-neutral-900
                                    transition-colors duration-300 text-xl p-6 w-80 h-28 flex items-center justify-center bg-primary-700 rounded">
                    Chat
                </a>
            </button>

            <button aria-current={page.url.pathname === '/profile' ? 'page' : undefined}>
                <a href="/profile" class="text-white shadow-button  hover:text-primary-700 hover:border-primary-700 hover:bg-neutral-900
                                    transition-colors duration-300 text-xl p-6 w-80 h-28 flex items-center justify-center bg-primary-700 rounded">
                    Profile
                </a>
            </button>

            <button aria-current={page.url.pathname === '/logout' ? 'page' : undefined}>
                <a href="/" class="text-white shadow-button  hover:text-primary-700 hover:border-primary-700 hover:bg-neutral-900
                                    transition-colors duration-300 text-xl p-6 w-80 h-28 flex items-center justify-center bg-primary-700 rounded">
                    Logout :(
                </a>
            </button>
        </div>
    </div>

</div>

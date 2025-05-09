<script lang="ts">
    import {authAPI} from "$lib/api/authApi";
    import ErrorPopup from "$lib/shared/ErrorPopup.svelte";
    import logo from "$lib/images/logo1.png";

    let login = ""
    let password = ""
    let error = ""

    async function loginUser() {
        try {
            const response = await authAPI.login(login, password);
            window.location.href = "/main";
        } catch (err) {
            console.error(err);
            error = `Jakis error trzeba wstawic na razie ${err}`;
        }
    }
</script>

{@debug error}

<div class="flex flex-col  items-center h-screen pt-12 text-neutral-100 ">
    <div class="flex flex-col gap-4 my-12 w-3/7  border-secondary-400 border-2 rounded-lg bg-neutral-900 p-8 max-w-[400px] shadow-form">
        <picture>
            <a href="/">
            <img src={logo} alt="logo of svelove"/>
            </a>
        </picture>
        <form class="flex flex-col gap-8 mx-auto my-6 max-w-full min-w-form" on:submit|preventDefault={loginUser}>
            <div class="flex flex-col gap-1">
                <label for="login">Login</label>
                <input bind:value={login}
                       class="rounded-lg pl-2 h-10 border-2 border-secondary-400 bg-neutral-800 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-700 shadow-button"
                       id="password"/>
            </div>

            <div class="flex flex-col gap-1">
                <label for="password">Password</label>
                <input bind:value={password}
                       class="rounded-lg pl-2 h-10 border-2 border-secondary-400 bg-neutral-800 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-700 shadow-button"
                       id="password" required type="password"/>
            </div>

            <button class="button  items-center justify-center bg-primary-700 hover:bg-primary-950
		 							rounded-3xl min-h-10 text-white shadow-button transition-colors duration-300
									text-xl no-underline"
                    type="submit">Login</button>
        </form>
    </div>
</div>
<ErrorPopup disappear="{() => (error = '')}" error={error}></ErrorPopup>


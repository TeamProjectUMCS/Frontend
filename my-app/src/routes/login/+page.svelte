<script lang="ts">
    import {authAPI} from "$lib/api/authApi";

    let login = ""
    let password = ""
    let error = ""

    async function loginUser() {
        try {
            const response = await authAPI.login(login, password);

            window.location.href = "/";
        } catch (err) {
            console.error(err);
            error = `Jakis error trzeba wstawic na razie ${err}`;
        }
    }
</script>

<main class="flex flex-col justify-center">
    <h1>Login</h1>
    <form class="flex flex-col gap-4 w-2/7 mx-auto my-16" on:submit|preventDefault={loginUser}>
        <div class="flex flex-col gap-1">
            <label for="login">Login</label>
            <input bind:value={login} class="rounded-lg  h-8 " id="login" required type="text"/>
        </div>

        <div class="flex flex-col gap-1">
            <label for="password">Password</label>
            <input bind:value={password} class="rounded-lg  h-8 " id="password" required type="password"/>
        </div>

        <button class="bg-primary-700 rounded-lg h-8 text-neutral-100 " type="submit">Login</button>
        {#if error}
            <div class="text-error-600 text-center">
                {error}
            </div>
        {/if}
    </form>

</main>

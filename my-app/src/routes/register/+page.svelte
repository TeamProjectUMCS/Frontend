<script lang="ts">
    import {authAPI} from "$lib/api/authApi";
    import type Preference from "$lib/data/Preference";
    import type Sex from "$lib/data/Sex";

    let username = ""
    let login = ""
    let password = ""
    let sex: Sex
    let preference: Preference
    let error = ""


    async function registerUser() {
        try {
            const response = await authAPI.register({
                username,
                login,
                password,
                sex,
                preference
            });
            window.location.href = "/login";
            console.log(response)
        } catch (err) {
            console.error(err);
            error = `Jakis error trzeba wstawic na razie ${err}`;
        }
    }
</script>

<main class="flex flex-col justify-center">
    <h1>Register</h1>
    <form class="flex flex-col gap-4 w-2/7 mx-auto my-16" on:submit|preventDefault={registerUser}>
        <div class="flex flex-col gap-1">
            <label for="username">Username</label>
            <input bind:value={username} class="rounded-lg  h-8 " id="username" required type="text"/>
        </div>

        <div class="flex flex-col gap-1">
            <label for="login">Login</label>
            <input bind:value={login} class="rounded-lg  h-8 " id="register" required type="text"/>
        </div>

        <div class="flex flex-col gap-1">
            <label for="password">Password</label>
            <input bind:value={password} class="rounded-lg  h-8 " id="password" required type="password"/>
        </div>

        <div class="flex flex-col gap-1">
            <label for="sex">Sex</label>
            <select bind:value={sex} class="rounded-lg h-8" id="sex" required>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
        </div>

        <div class="flex flex-col gap-1">
            <label for="preference">Preference</label>
            <select bind:value={preference} class="rounded-lg h-8" id="preference" required>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Both">Both</option>
            </select>
        </div>

        <button class="bg-primary-700 rounded-lg h-8 text-neutral-100 " type="submit">Register</button>
        {#if error}
            <div class="text-error-600 text-center">
                {error}
            </div>
        {/if}
    </form>

</main>

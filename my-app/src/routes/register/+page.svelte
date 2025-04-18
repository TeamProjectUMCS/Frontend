<script lang="ts">
    import {authAPI} from "$lib/api/authApi";
    import type Preference from "$lib/data/Preference";
    import type Sex from "$lib/data/Sex";
    import ErrorPopup from "$lib/shared/ErrorPopup.svelte";

    let username = "";
    let login = "";
    let password = "";
    let sex: Sex;
    let preference: Preference;
    let error = "";

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
        } catch (err) {
            console.error(err);
            error = `Jakis error trzeba wstawic na razie ${err}`;
        }
    }
</script>

<div class="flex flex-col items-center h-screen  text-neutral-100">
    <div class="flex flex-col gap-2 my-6 w-3/7 border-secondary-400 border-2 rounded-lg bg-neutral-900 p-8 shadow-md">
        <h2 class="text-4xl font-bold text-center">Register</h2>
        <form class="flex flex-col gap-6 mx-auto my-6 max-w-full min-w-form" on:submit|preventDefault={registerUser}>
            <div class="flex flex-col gap-1">
                <label for="username">Username</label>
                <input bind:value={username}
                       class="rounded-lg pl-2 h-8 border-2 border-secondary-400 bg-neutral-800 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-700"
                       id="username" required type="text"/>
            </div>

            <div class="flex flex-col gap-1">
                <label for="login">Login</label>
                <input bind:value={login}
                       class="rounded-lg pl-2 h-8 border-2 border-secondary-400 bg-neutral-800 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-700"
                       id="login"/>
            </div>

            <div class="flex flex-col gap-1">
                <label for="password">Password</label>
                <input bind:value={password}
                       class="rounded-lg pl-2 h-8 border-2 border-secondary-400 bg-neutral-800 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-700"
                       id="password" required type="password"/>
            </div>

            <div class="flex flex-col gap-1">
                <label for="sex">Sex</label>
                <select bind:value={sex}
                        class="rounded-lg pl-2 h-8 border-2 border-secondary-400 bg-neutral-800 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-700"
                        id="sex" required>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div class="flex flex-col gap-1">
                <label for="preference">Preference</label>
                <select bind:value={preference}
                        class="rounded-lg pl-2 h-8 border-2 border-secondary-400 bg-neutral-800 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-700"
                        id="preference" required>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Both">Both</option>
                </select>
            </div>

            <button class="bg-primary-700 rounded-lg h-8" type="submit">Register</button>
        </form>
    </div>
</div>
<ErrorPopup disappear="{() => (error = '')}" error={error}></ErrorPopup>

<script lang="ts">
    import { onMount } from "svelte";

    type UserProfileDto = {
        username: string;
        login: string;
        sex: string;
        preference: string;
        hobbies: string[];
        description: string;
        localization: string | null;
        age: number;
        age_min: number;
        age_max: number;
    };

    const sexOptions = ["Male", "Female", "Other"];
    const preferenceOptions = ["Men", "Women", "Both", "Other"];

    let profile: UserProfileDto | null = null;
    let error = "";
    let loading = true;

    let editedSex = "";
    let editedPreference = "";
    let editedDescription = "";
    let editedLocalization = "";
    let editedAge = 0;
    let editedAgeMin = 0;
    let editedAgeMax = 0;

    let updateMessage = "";
    let updateError = "";

    // Password change
    let oldPassword = "";
    let newPassword = "";
    let confirmPassword = "";
    let passwordError = "";
    let passwordSuccess = "";

    async function fetchProfile() {
        try {
            const token = localStorage.getItem("jwt_token");
            if (!token) throw new Error("Brak tokena JWT");

            const res = await fetch("http://localhost:8080/profile", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!res.ok) {
                throw new Error(`Błąd serwera: ${res.status} ${res.statusText}`);
            }

            profile = await res.json();
            if (profile) {
                editedSex = profile.sex;
                editedPreference = profile.preference;
                editedDescription = profile.description;
                editedLocalization = profile.localization ?? "";
                editedAge = profile.age;
                editedAgeMin = profile.age_min;
                editedAgeMax = profile.age_max;
            }
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        }
    }

    async function saveProfileChanges() {
        updateMessage = "";
        updateError = "";

        try {
            const token = localStorage.getItem("jwt_token");
            if (!token || !profile) throw new Error("Brak tokena lub profilu");

            const response = await fetch("http://localhost:8080/profile/edit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    username: profile.username,
                    preference: editedPreference.toUpperCase(),
                    hobbyIds: [],
                    description: editedDescription,
                    localization: editedLocalization,
                    age: editedAge,
                    ageMin: editedAgeMin,
                    ageMax: editedAgeMax,
                    sex: editedSex.toUpperCase()
                })
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(text || "Błąd aktualizacji profilu");
            }

            updateMessage = "Zapisano zmiany!";
        } catch (e) {
            updateError = e.message;
        }
    }

    async function changePassword() {
        passwordError = "";
        passwordSuccess = "";

        if (newPassword !== confirmPassword) {
            passwordError = "Nowe hasła się nie zgadzają";
            return;
        }

        try {
            const token = localStorage.getItem("jwt_token");
            if (!token) throw new Error("Brak tokena JWT");

            const response = await fetch("http://localhost:8080/profile/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    oldPassword,
                    newPassword
                })
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(text || "Błąd zmiany hasła");
            }

            passwordSuccess = "Hasło zostało zmienione!";
            oldPassword = newPassword = confirmPassword = "";
        } catch (e) {
            passwordError = e.message;
        }
    }

    onMount(fetchProfile);
</script>

<div class="p-8 max-w-3xl mx-auto bg-background text-neutral-100 rounded-2xl shadow-form font-sans">
    {#if loading}
        <p>Ładowanie profilu...</p>
    {:else if error}
        <p class="text-error-600 font-semibold mt-4">Błąd: {error}</p>
    {:else if profile}
        <h1 class="text-3xl font-bold text-primary-500 mb-4">{profile.username}</h1>

        <h2 class="text-2xl text-secondary-500 font-semibold mt-8 mb-4">Dane osobowe</h2>
        <div class="mb-4"><strong>Login:</strong> {profile.login}</div>

        <div class="mb-4">
            <label class="block mb-1">Płeć:</label>
            <select bind:value={editedSex} class="w-full p-2 bg-neutral-900 border border-neutral-700 rounded-special text-neutral-100">
                {#each sexOptions as option}
                    <option value={option}>{option}</option>
                {/each}
            </select>
        </div>

        <div class="mb-4">
            <label class="block mb-1">Preferencje:</label>
            <select bind:value={editedPreference} class="w-full p-2 bg-neutral-900 border border-neutral-700 rounded-special text-neutral-100">
                {#each preferenceOptions as option}
                    <option value={option}>{option}</option>
                {/each}
            </select>
        </div>

        <div class="mb-4">
            <label class="block mb-1">Wiek:</label>
            <input type="number" min="18" bind:value={editedAge}
                   class="w-full p-2 bg-neutral-900 border border-neutral-700 rounded-special text-neutral-100" />
        </div>

        <div class="mb-4">
            <label class="block mb-1">Zakres wieku partnera:</label>
            <div class="flex gap-4">
                <input type="number" min="18" bind:value={editedAgeMin}
                       class="w-full p-2 bg-neutral-900 border border-neutral-700 rounded-special text-neutral-100" />
                <input type="number" min={editedAgeMin} bind:value={editedAgeMax}
                       class="w-full p-2 bg-neutral-900 border border-neutral-700 rounded-special text-neutral-100" />
            </div>
        </div>

        <div class="mb-4">
            <label class="block mb-1">Opis:</label>
            <textarea rows="4" bind:value={editedDescription}
                      class="w-full p-2 bg-neutral-900 border border-neutral-700 rounded-special text-neutral-100"></textarea>
        </div>

        <div class="mb-4">
            <label class="block mb-1">Lokalizacja:</label>
            <input type="text" bind:value={editedLocalization}
                   class="w-full p-2 bg-neutral-900 border border-neutral-700 rounded-special text-neutral-100" />
        </div>

        <button on:click={saveProfileChanges}
                class="bg-primary-700 hover:bg-primary-600 text-white px-6 py-2 rounded-xl shadow-button mt-4 transition">
            Zapisz zmiany
        </button>

        {#if updateMessage}
            <p class="text-green-400 font-medium mt-4">{updateMessage}</p>
        {/if}
        {#if updateError}
            <p class="text-error-600 font-medium mt-4">{updateError}</p>
        {/if}

        <h2 class="text-2xl text-secondary-500 font-semibold mt-10 mb-4">Zmiana hasła</h2>
        {#if passwordError}
            <p class="text-error-600 font-medium mb-2">{passwordError}</p>
        {/if}
        {#if passwordSuccess}
            <p class="text-green-400 font-medium mb-2">{passwordSuccess}</p>
        {/if}

        <div class="mb-4">
            <label class="block mb-1">Obecne hasło:</label>
            <input type="password" bind:value={oldPassword}
                   class="w-full p-2 bg-neutral-900 border border-neutral-700 rounded-special text-neutral-100" />
        </div>

        <div class="mb-4">
            <label class="block mb-1">Nowe hasło:</label>
            <input type="password" bind:value={newPassword}
                   class="w-full p-2 bg-neutral-900 border border-neutral-700 rounded-special text-neutral-100" />
        </div>

        <div class="mb-4">
            <label class="block mb-1">Potwierdź nowe hasło:</label>
            <input type="password" bind:value={confirmPassword}
                   class="w-full p-2 bg-neutral-900 border border-neutral-700 rounded-special text-neutral-100" />
        </div>

        <button on:click={changePassword}
                class="bg-secondary-700 hover:bg-secondary-600 text-white px-6 py-2 rounded-xl shadow-button mt-2 transition">
            Zmień hasło
        </button>
    {/if}
</div>

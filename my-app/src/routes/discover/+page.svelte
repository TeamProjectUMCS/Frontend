<script lang="ts">
    import type { UserMatchDto } from "$lib/api/authApi";
    import Sex from "\$lib/data/Sex";
    import { onMount } from "svelte";
    import male_pfp from "$lib/images/male_pfp.png";
    import female_pfp from "$lib/images/female_pfp.png";
    import other_pfp from "$lib/images/other_pfp.png";

    let loading: boolean = true;
    let error: string | null = null;
    let potentialMatches: UserMatchDto[] = [];
    let currentIndex = 0;

    async function fetchPotentialMatches(): Promise<void> {
        try {
            const token = localStorage.getItem("jwt_token");
            if (!token) throw new Error("Brak tokena JWT");

            const res = await fetch("http://localhost:8080/matches/potential", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error(`Błąd serwera: ${res.status} ${res.statusText}`);
            }

            const data: UserMatchDto[] = await res.json();

            if (!Array.isArray(data)) {
                throw new Error("Oczekiwano listy użytkowników, ale odpowiedź nie jest tablicą.");
            }

            potentialMatches = data;
            currentIndex = 0;

            console.log("Użytkownicy:", potentialMatches);
        } catch (e: any) {
            error = e.message || "Nieznany błąd";
            console.error("Błąd:", error);
        } finally {
            loading = false;
        }
    }

    function skipUser() {
        if (currentIndex < potentialMatches.length - 1) {
            currentIndex++;
        } else {
            potentialMatches=[];
        }
    }

    onMount(() => {
        fetchPotentialMatches();
    });
</script>

{#if loading}
    <p class="text-center text-white">Ładowanie...</p>
{:else if error}
    <p class="text-center text-red-500">{error}</p>
{:else if potentialMatches.length === 0}
    <p class="text-center text-white">Brak dostępnych dopasowań.</p>
{:else}
    <div class="flex flex-col md:flex-col gap-6 p-6 items-center max-w-4xl mx-auto m-10 bg-background text-neutral-100 rounded-2xl shadow-form font-sans h-full">
        <div class="flex flex-col items-center p-4 rounded-xl border-2 border-secondary-700 w-full min-h-128 bg-neutral-950">
            {#if potentialMatches[currentIndex].sex===Sex.MALE}
            <img src={male_pfp} alt="User Image" class="w-60 h-60 object-cover m-4" />
            {:else if potentialMatches[currentIndex].sex===Sex.FEMALE}
            <img src={female_pfp} alt="User Image" class="w-60 h-60 object-cover m-4" />
            {:else}
            <img src={other_pfp} alt="User Image" class="w-60 h-60 object-cover m-4" />
            {/if}
            <div class="text-center m-3 border-2 border-secondary-700 rounded-xl min-w-80 min-h-48 p-4">
                <h2 class="text-xl font-semibold">
                    {potentialMatches[currentIndex].username}, {potentialMatches[currentIndex].age} lat
                </h2>
                <p class="text-white mb-2">{potentialMatches[currentIndex].description}</p>
                <p class="text-sm text-gray-400">Płeć: {potentialMatches[currentIndex].sex}</p>
                <p class="text-sm text-gray-400">Preferencje: {potentialMatches[currentIndex].preference}</p>
                <p class="text-sm text-gray-400">Lokalizacja: {potentialMatches[currentIndex].localization}</p>
                <p class="text-sm text-gray-400">Zainteresowania: {potentialMatches[currentIndex].hobbies.join(", ")}</p>
            </div>
        </div>

        <div class="flex flex-row justify-center gap-20 items-center m-4 p-3 rounded-xl w-full md:w-1/2 mx-auto">
            <button class="button shadow-button hover:bg-primary-950 bg-neutral-950 transition-colors duration-300 rounded-xl min-h-16 text-lg min-w-52"
                    on:click={skipUser}>
                Skip
            </button>

            <button class="button shadow-button bg-primary-700 hover:bg-primary-500 transition-colors duration-300 rounded-xl min-h-16 text-lg min-w-52">
                Like
            </button>
        </div>
    </div>
{/if}

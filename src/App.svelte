<script lang="ts">
    import Photo from "./components/Photo.svelte"
    import ValidationResult from "./components/ValidationResult.svelte";
    import ValidationBlock from "./components/ValidationBlock.svelte";
    import Log from "./components/Log.svelte";
    import {onMount} from "svelte";
    import {username} from "./stores/user";
    import {loadPeople, people, peopleById} from "./stores/people";
    import {currentPerson} from "./stores/currentPerson";
    import Header from "./components/Header.svelte";

    onMount(() => {
        $username = 'Алексей Найден'
        loadPeople();
        // $currentPerson = $peopleById.get('4')
    });

</script>

<Header eventName="Бал"/>

<main>
    <div class="container mx-auto">
        {#if $currentPerson}
            <div class="grid gap-4 grid-cols-10 grid-rows-3">
                <div class="row-span-3 col-span-3">
                    <Photo/>
                </div>
                <div class="col-span-7">
                    <div class="text-3xl">{$currentPerson.fio}</div>
                    <div class="text-2xl">{$currentPerson.brigade}</div>
                </div>

                <div class="col-span-4 row-span-2 flex flex-col justify-end">
                    <ValidationBlock/>
                </div>

                <div class="row-span-2 col-span-3 bg-green">
                    <ValidationResult/>
                </div>
            </div>
        {:else}
            <div class="w-full h-full text-3xl text-center pt-16 pb-16 font-bold bg-slate-200">
                Отсканируйте карточку
            </div>
        {/if}
        <Log/>
    </div>
</main>

<script lang="ts">
    import Photo from "./components/Photo.svelte"
    import ValidationResult from "./components/ValidationResult.svelte";
    import ValidationBlock from "./components/ValidationBlock.svelte";
    import Log from "./components/Log.svelte";
    import {onMount} from "svelte";
    import {username} from "./stores/user";
    import {loadPeople, people} from "./stores/people";
    import {currentPerson} from "./stores/currentPerson";
    import Header from "./components/Header.svelte";
    import {page} from "./stores/page";
    import List from "./components/List.svelte";

    onMount(() => {
        $username = 'Алексей Найден'
        loadPeople();
    });
</script>

<Header eventName="Бал"/>

<main>
    <div class="container mx-auto">
        {#if $page === 'scan'}
            {#if $username}
                {#if $currentPerson}
                    <div class="grid gap-4 grid-cols-10 grid-rows-3 h-80">
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
                    <div class="w-full pt-16 pb-16 bg-slate-200 h-80 flex flex-col justify-center ">
                        <div class="font-bold text-3xl text-center">
                            Отсканируйте карточку
                        </div>
                    </div>
                {/if}
            {:else}
                <div class="w-full pt-16 pb-16 bg-slate-200 h-80 flex flex-col justify-center ">
                    <div class="font-bold text-3xl text-center">
                        Укажите своё имя
                    </div>
                </div>
            {/if}
            <Log/>
        {:else}
            <List />
        {/if}
    </div>
</main>

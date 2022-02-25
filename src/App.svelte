<script lang="ts">
    import Photo from "./components/Photo.svelte"
    import ValidationResult from "./components/ValidationResult.svelte";
    import ValidationBlock from "./components/ValidationBlock.svelte";
    import Heroicon from '@martinse/svelte-heroicons';
    import {user} from '@martinse/svelte-heroicons/dist/solid';
    import Log from "./components/Log.svelte";
    import {onMount} from "svelte";
    import {username} from "./stores/user";

    let eventName = "Вход на бал"
    onMount(() => {
        $username = 'Алексей Найден'
    });
</script>

<header class="pb-3">
    <div class="bg-indigo-900 text-white leading-loose pl-3 pt-1 pb-1">
        <span class="font-bold text-2xl">СПбСО</span>
        <span class="text-xl text-silver">{eventName}</span>
        <span class="inline-block">
            <button><Heroicon icon={user}/></button>
            {$username}
        </span>
    </div>
</header>

<main>
    <div class="container mx-auto">
        <div class="grid gap-4 grid-cols-10 grid-rows-3">
            <div class="row-span-3 col-span-3">
                <Photo/>
            </div>
            <div class="col-span-7">
                <div class="text-3xl">Найден Алексей Владимирович</div>
                <div class="text-2xl">СПО Северный Ветер</div>
            </div>

            <div class="col-span-4 row-span-2 flex flex-col justify-end">
                <ValidationBlock/>
            </div>

            <div class="row-span-2 col-span-3 bg-green">
                <ValidationResult ok={true}/>
            </div>
        </div>
        <Log/>
    </div>
</main>

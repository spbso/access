<script lang="ts">
    import Heroicon from '@martinse/svelte-heroicons';
    import {user} from '@martinse/svelte-heroicons/dist/solid';
    import {username} from "../stores/user";
    import {currentPerson} from "../stores/currentPerson";
    import {peopleById} from "../stores/people";

    export let eventName: string;

    let freshCardId: string = null

    const checkCard = () => {
        $currentPerson = $peopleById.get(freshCardId);
        console.log($currentPerson)
    }
</script>

<header class="pb-3">
    <div class="bg-indigo-900 text-white leading-loose pl-3 pt-1 pb-1">
        <span class="font-bold text-2xl">СПбСО</span>
        <span class="text-xl text-silver">{eventName}</span>
        <span class="inline-block">
            <button><Heroicon icon={user}/></button>
            {$username}
        </span>
        <span class="inline-block">
            <input type="text" bind:value={freshCardId} class="text-black"/>
            <button on:click={checkCard}>Проверить</button>
        </span>
    </div>
</header>

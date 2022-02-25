<script lang="ts">
    import Heroicon from '@martinse/svelte-heroicons';
    import {check, ban} from '@martinse/svelte-heroicons/dist/solid';
    import {currentPerson} from "../stores/currentPerson";

    let bgClass, icon;
    $: {
        if ($currentPerson.isValid()) {
            bgClass = 'bg-green-600';
            icon = check;
        } else {
            bgClass = 'bg-rose-900';
            icon = ban;
        }
    }
</script>

<div class="w-full h-full {bgClass} text-white text-8xl flex place-content-center items-center rounded-2xl">
    <div>
        {#key $currentPerson}
            <Heroicon icon={icon}/>
        {/key}
    </div>
</div>

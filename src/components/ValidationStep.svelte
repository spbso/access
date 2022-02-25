<script lang="ts">
    import Heroicon from '@martinse/svelte-heroicons';
    import {check, ban} from '@martinse/svelte-heroicons/dist/solid';

    export let ok;
    export let text;

    const itemClass = ok ? 'text-green-600' : 'text-rose-900';
    const icon = ok ? check : ban;
</script>
<li class={itemClass}>
    <Heroicon icon={icon}/>
    <span class="font-semibold">{text}</span>
</li>

<script lang="ts">
    import ValidationStep from "./ValidationStep.svelte";
    import {currentPerson} from "../stores/currentPerson";
</script>

<ul class="leading-10">
    {#key $currentPerson}
        {#if currentPerson}
            <ValidationStep ok={$currentPerson.ticket} text="Билет"/>
            <ValidationStep ok={$currentPerson.isRsoValid()} text="РСО" details={$currentPerson.rsoDetails()}/>
        {/if}
    {/key}
</ul>

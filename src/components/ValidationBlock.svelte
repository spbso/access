<script lang="ts">
    import ValidationStep from "./ValidationStep.svelte";
    import {currentPerson} from "../stores/currentPerson";
</script>

<ul class="leading-10">
    {#key $currentPerson}
        <ValidationStep ok={$currentPerson.ticket} text="Билет"/>
        <ValidationStep ok={$currentPerson.isQrValid()} text="QR-код"/>
        <ValidationStep ok={$currentPerson.isRsoValid()} text="РСО"/>
    {/key}
</ul>

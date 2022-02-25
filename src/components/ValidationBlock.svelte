<script lang="ts">
    import ValidationStep from "./ValidationStep.svelte";
</script>

<ul class="leading-10">
    <ValidationStep ok={true} text="QR-код" details="действует"/>
    <ValidationStep ok={false} text="РСО" details="истекает через 4 дня"/>
</ul>

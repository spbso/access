<script lang="ts">
    import {StructuredListCell, StructuredListRow} from "carbon-components-svelte";
    import FaceActivatedFilled32 from "carbon-icons-svelte/lib/FaceActivatedFilled32/FaceActivatedFilled32.svelte";
    import FaceDissatisfiedFilled32
        from "carbon-icons-svelte/lib/FaceDissatisfiedFilled32/FaceDissatisfiedFilled32.svelte";

    export let ok;
    export let text;
</script>
<StructuredListRow>
    <StructuredListCell>
        {#if ok}
            <FaceActivatedFilled32 height="10rem" width="10rem" on:click={() => ok = !ok} class={ok ? 'validation-step__ok' : 'validation-step__fail'}/>
        {:else}
            <FaceDissatisfiedFilled32 height="10rem" width="10rem" on:click={() => ok = !ok} class={ok ? 'validation-step__ok' : 'validation-step__fail'}/>
        {/if}
    </StructuredListCell>
    <StructuredListCell>{text}</StructuredListCell>
</StructuredListRow>

<style lang="scss">
  @import 'node_modules/@carbon/colors/scss/colors.scss';

  :global(.validation-step__fail) {
    color: $red-60;
  }

  :global(.validation-step__ok) {
    color: $green-50;
  }
</style>

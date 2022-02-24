<script lang="ts">
    import {Tile} from "carbon-components-svelte";
    import FaceActivatedFilled32 from "carbon-icons-svelte/lib/FaceActivatedFilled32/FaceActivatedFilled32.svelte";
    import FaceDissatisfiedFilled32
        from "carbon-icons-svelte/lib/FaceDissatisfiedFilled32/FaceDissatisfiedFilled32.svelte";

    export let ok;
</script>

<Tile class={`validation-result validation-result-` + (ok ? 'ok': 'fail')}>
    {#if ok}
        <FaceActivatedFilled32 height="10rem" width="10rem" on:click={() => ok = !ok}/>
    {:else}
        <FaceDissatisfiedFilled32 height="10rem" width="10rem" on:click={() => ok = !ok}/>
    {/if}
</Tile>

<style lang="scss">
  @import 'node_modules/@carbon/colors/scss/colors.scss';

  :global(.validation-result) {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  :global(.validation-result-fail) {
    background-color: $red-60;
    color: white;
  }

  :global(.validation-result-ok) {
    background-color: $green-50;
    color: white;
  }
</style>

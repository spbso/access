<script lang="ts">
    import {StructuredList, StructuredListBody} from "carbon-components-svelte";
    import ValidationStep from "./ValidationStep.svelte";
</script>

<StructuredList condensed class="validation-block__list">
    <StructuredListBody>
        <ValidationStep ok={true} text="Билет"/>
        <ValidationStep ok={true} text="QR-код"/>
        <ValidationStep ok={false} text="РСО"/>
    </StructuredListBody>
</StructuredList>

<style lang="scss">
  @import 'node_modules/@carbon/colors/scss/colors.scss';

  :global(.validation-block__list) {
    margin-bottom: 0;
  }
</style>

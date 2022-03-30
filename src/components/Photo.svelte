<script lang="ts">
    import {currentPerson} from "../stores/currentPerson";
    import {photoPath} from "../stores/photoPath";
</script>

<div>
    <img src="file://{$photoPath}/{$currentPerson.id}.jpg"
         class="drop-shadow-xl object-contain rounded-2xl max-h-80 mx-auto"
         alt="Person"/>
</div>

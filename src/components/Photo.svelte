<script lang="ts">
    import {currentPerson} from "../stores/currentPerson";
</script>

<div>
    <img src="stub/{$currentPerson.id}.jpg" class="drop-shadow-xl object-contain rounded-2xl max-h-80 mx-auto"
         alt="Person"/>
</div>

<script lang="ts">
    let items = [1, 2, 3, 4, 5];
</script>

<table class="table-auto w-full mt-5">
    <thead>
    <tr>
        <th>Время</th>
        <th>ФИО</th>
        <th>Отряд</th>
        <th>Результат</th>
    </tr>
    </thead>
    <tbody>
    {#each items as item}
        <tr>
            <td>17:34:45</td>
            <td>Найден Алексей Владимирович</td>
            <td>СПО Северный Ветер</td>
            <td>ОК</td>
        </tr>
    {/each}
    </tbody>
</table>

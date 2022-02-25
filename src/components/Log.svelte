<script lang="ts">
    import {logRecords} from "../stores/log";
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
    {#each $logRecords as record}
        <tr>
            <td>{record.timestamp}</td>
            <td>{record.fio}</td>
            <td>{record.brigade}</td>
            <td>{record.ticket && record.qr && record.rso}</td>
        </tr>
    {/each}
    </tbody>
</table>

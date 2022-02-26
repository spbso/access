<script lang="ts">
    import {logRecords} from "../stores/log";
    import {format} from 'date-fns'
    import {ru} from 'date-fns/locale'
    import Heroicon from '@martinse/svelte-heroicons';
    import {ticket, qrcode, document} from '@martinse/svelte-heroicons/dist/outline';

    const classForIcon = (result: boolean): string => {
        return result ? 'text-green-600' : 'text-rose-900'
    }
</script>

<div class="h-64 overflow-y-auto">
    <table class="table-fixed w-full mt-5">
        <thead>
        <tr>
            <th class="w-32">Время</th>
            <th class="w-3/5">ФИО</th>
            <th>Отряд</th>
            <th class="w-32">Результат</th>
        </tr>
        </thead>
        <tbody class="text-center">
        {#each $logRecords as record}
            <tr class="hover:bg-slate-200">
                <td>{format(record.timestamp * 1000, 'HH:mm:ss', {locale: ru})}</td>
                <td>{record.fio}</td>
                <td>{record.brigade}</td>
                <td>
                    <abbr title="Наличие билета">
                        <Heroicon icon={ticket} class={classForIcon(record.ticket)}/>
                    </abbr>
                    <abbr title="Действительный QR-код">
                        <Heroicon icon={qrcode} class={classForIcon(record.qr)}/>
                    </abbr>
                    <abbr title="Членство в РСО">
                        <Heroicon icon={document} class={classForIcon(record.rso)}/>
                    </abbr>
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>

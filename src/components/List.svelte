<script lang="ts">
    import {people} from "../stores/people"
    import {format} from 'date-fns'
    import {ru} from 'date-fns/locale'
    import Heroicon from '@martinse/svelte-heroicons';
    import {check, x} from '@martinse/svelte-heroicons/dist/outline';

    let sortBy: 'fio' | 'brigade' = 'fio'

    let sortedPeople = null
    let filterString = ''


    $: {
        sortedPeople = $people.sort((a, b) => {
            if (sortBy === 'fio') {
                return a.fio.localeCompare(b.fio)
            } else if (sortBy === 'brigade') {
                return a.brigade.localeCompare(b.brigade)
            } else {
                return 0
            }
        })
    }
</script>

<div class="flex">
    <div>Сортировать по</div>
    <div class="hover:underline cursor-pointer mx-1 {sortBy === 'fio' ? 'font-bold' : ''}"
         on:click={() => sortBy='fio'}>ФИО
    </div>
    <div class="hover:underline cursor-pointer mx-1 {sortBy === 'brigade' ? 'font-bold' : ''}"
         on:click={() => sortBy='brigade'}>отряду
    </div>
</div>
<table class="table-fixed w-full mt-5">
    <thead>
    <tr>
        <th>ФИО</th>
        <th>Отряд</th>
        <th>Билет</th>
        <th>Членство в РСО</th>
    </tr>
    </thead>
    <tbody class="text-center">
    {#each sortedPeople as person}
        <tr class="hover:bg-slate-200">
            <td class="text-left {person.isValid() ? 'text-green-600' : 'text-rose-900'}">{person.fio}</td>
            <td class="text-left">{person.brigade}</td>
            <td class={person.ticket ? '' : 'text-rose-900'}>
                <Heroicon icon={person.ticket ? check : x}/>
            </td>
            <td class={person.isRsoValid() ? '' : 'text-rose-900'}>
                {#if person.rso}
                    {format(person.rso, 'dd MMMM yyyy', {locale: ru})}
                {:else}
                    Нет данных
                {/if}
            </td>
        </tr>
    {/each}
    </tbody>
</table>

<script lang="ts">
    import Heroicon from '@martinse/svelte-heroicons';
    import {user} from '@martinse/svelte-heroicons/dist/solid';
    import {username} from "../stores/user";
    import {currentPerson} from "../stores/currentPerson";
    import {peopleById} from "../stores/people";
    import {page} from "../stores/page";
    import {log} from "../stores/log";
    import {onMount} from "svelte";

    export let eventName: string;

    let freshCardId: string = null
    let usernameValue = ''
    let loginVisible = false

    const checkCard = () => {
        $currentPerson = $peopleById.get(freshCardId);
        console.log($currentPerson)
        log($currentPerson)
    }

    const setUsername = () => {
        $username = usernameValue
        loginVisible = false
    }

    const toggleLogin = () => {
        loginVisible = !loginVisible;
    }

    let filePath = 0

    const openClick = async () => {
        filePath = await window.electronAPI.openFile()
    }

    onMount(() => {
        window.electronAPI.handleCounter((event, value) => {
            const oldValue = filePath
            const newValue = oldValue + value
            filePath = newValue
            event.reply('counter-value', newValue)
        })
    })

</script>

<header class="pb-3">
    <div class="bg-indigo-900 text-white leading-loose pl-3 pt-1 pb-1 flex">
        <div class="font-bold text-2xl">СПбСО</div>
        <div class="text-xl text-silver ml-3">{eventName}</div>
        <div>
            <button on:click={openClick}>Открыть</button>
            <span>{filePath}</span>
        </div>
        <div class="ml-auto">
            <input type="text" bind:value={freshCardId} class="text-black rounded-xl px-2 w-16"/>
            <button class="hover:bg-indigo-700 px-2 rounded-lg" on:click={checkCard}>Проверить</button>
        </div>
        <nav>
            <ul class="list-none flex cursor-pointer">
                <li class="hover:bg-indigo-700 mr-3 px-1 rounded-lg {$page === 'scan' ? 'bg-indigo-500': ''}" on:click={() => $page = 'scan'}>Сканирование</li>
                <li class="hover:bg-indigo-700 mr-3 px-1 rounded-lg {$page === 'list' ? 'bg-indigo-500': ''}" on:click={() => $page = 'list'}>Списки</li>
            </ul>
        </nav>
        <div class="mr-3">
            <button class="hover:bg-indigo-700 rounded-lg px-3" on:click={toggleLogin}>
                <Heroicon icon={user}/> {$username ?? 'Войдите в систему'}</button>
            {#if loginVisible}
                <div id="login-form" class="absolute right-0 bg-white text-black p-2 rounded-lg border">
                    <input type="text" placeholder="Имя и фамилия" class="border rounded-lg border-indigo-900 px-1"
                           bind:value={usernameValue}/>
                    <button class="border px-2 rounded-lg hover:bg-indigo-700" on:click={setUsername}>OK</button>
                </div>
            {/if}
        </div>
    </div>
</header>

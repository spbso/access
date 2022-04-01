<script lang="ts">
    import Heroicon from '@martinse/svelte-heroicons';
    import {user} from '@martinse/svelte-heroicons/dist/solid';
    import {username} from "../stores/user";
    import {currentCardUid, currentPerson} from "../stores/currentPerson";
    import {peopleByUid} from "../stores/people";
    import {page} from "../stores/page";
    import {eventName} from "../stores/event";

    let usernameValue = ''
    let loginVisible = false

    const checkCard = () => {
        if ($peopleByUid.has($currentCardUid)) {
            $currentPerson = $peopleByUid.get($currentCardUid);
        } else {
            $currentPerson = null;
        }

        $currentCardUid = ''

        console.log('current person', $currentPerson)

        if (window.electronAPI) {
            window.electronAPI.logPerson($currentPerson)
        }
    }

    const handleKeydown = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            checkCard();
        }
    }

    const setUsername = () => {
        $username = usernameValue.length > 0 ? usernameValue : null;
        loginVisible = false
    }

    const toggleLogin = () => {
        loginVisible = !loginVisible;
    }

    const onLoginKeydown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            setUsername();
        }
    }
</script>

<header class="pb-3">
    <div class="bg-indigo-900 text-white leading-loose pl-3 pt-1 pb-1 flex">
        <div class="font-bold text-2xl">СПбСО</div>
        <div class="text-xl text-silver ml-3 self-center">{$eventName ?? 'Загрузите данные'}</div>
        <div class="ml-6">
            <input type="text" placeholder="ID карточки" bind:value={$currentCardUid}
                   class="text-black rounded-xl px-2 w-42" on:keydown={handleKeydown}/>
            <!-- <button class="hover:bg-indigo-700 px-2 rounded-lg" on:click={checkCard}>Проверить</button> -->
        </div>
        <nav class="ml-auto">
            <ul class="list-none flex cursor-pointer">
                <li class="hover:bg-indigo-700 mr-3 px-1 rounded-lg {$page === 'scan' ? 'bg-indigo-500': ''}"
                    on:click={() => $page = 'scan'}>Сканирование
                </li>
                <li class="hover:bg-indigo-700 mr-3 px-1 rounded-lg {$page === 'list' ? 'bg-indigo-500': ''}"
                    on:click={() => $page = 'list'}>Списки
                </li>
            </ul>
        </nav>
        <div class="mr-3">
            <button class="hover:bg-indigo-700 rounded-lg px-3 {$username ? '' : 'bg-rose-500'}" on:click={toggleLogin}>
                <Heroicon icon={user}/> {$username ?? 'Нажми сюда'}</button>
            {#if loginVisible}
                <div id="login-form" class="absolute right-0 bg-white text-black p-2 rounded-lg border">
                    <input type="text" placeholder="Имя и фамилия" class="border rounded-lg border-indigo-900 px-1"
                           bind:value={usernameValue}
                           on:keydown={onLoginKeydown}/>
                    <button class="border px-2 rounded-lg hover:bg-indigo-700" on:click={setUsername}>OK</button>
                </div>
            {/if}
        </div>
    </div>
</header>

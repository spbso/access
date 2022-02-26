import {writable} from "svelte/store";

export const page = writable('scan')

export const showScan = (): void => {
    page.set('scan')
}
export const showList = (): void => {
    page.set('list')
}

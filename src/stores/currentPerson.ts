import {writable} from "svelte/store";
import type {Person} from "./people";

export const currentPerson = writable<Person>(null)

export const currentCardUid = writable<string>('');

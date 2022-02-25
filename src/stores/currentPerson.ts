import {writable} from "svelte/store";
import type {Person} from "./people";

export const currentPerson = writable<Person>(undefined)

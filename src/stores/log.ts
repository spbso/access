import {writable} from "svelte/store";
import type {Person} from "./people";

export type LogRecord =
    {
        timestamp: number;
        id: string;
        fio: string;
        brigade: string;
        qr: boolean;
        rso: boolean;
        ticket: boolean;
    }

export const logRecords = writable<LogRecord[]>([])

export const log = (person: Person) => {
    logRecords.update((existing) => [...existing,
        {
            timestamp: Number(new Date()) / 1000,
            id: person.id,
            fio: person.fio,
            brigade: person.brigade,
            qr: person.isQrValid(),
            rso: person.isRsoValid(),
            ticket: person.ticket
        }
    ])
}

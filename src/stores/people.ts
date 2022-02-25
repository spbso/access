import {derived, writable} from "svelte/store";
import {fakeTickets as testData} from "../data/FakeTickets";


export class Person {
    id: string;
    fio: string;
    brigade: string;
    ticket: boolean;
    rso: number | null;
    qr: number | null;

    constructor({id, fio, brigade, ticket, rso, qr}) {
        this.id = id
        this.fio = fio
        this.brigade = brigade
        this.ticket = ticket
        this.rso = rso
        this.qr = qr
    }

    isValid(): boolean {
        return this.isRsoValid() && this.isQrValid() && this.ticket
    }

    isRsoValid(): boolean {
        const timestamp = Number(new Date())/1000
        console.log('ts', timestamp)
        console.log('rso', this.rso)
        return (this.rso ?? 0) >= timestamp
    }

    isQrValid(): boolean {
        const timestamp = Number(new Date())/1000
        return (this.qr ?? 0) >= timestamp
    }
}

export const people = writable<Person[]>([]);

export const loadPeople = (): void => {
    const parsedPeople = testData.map((item) => new Person(item))
    people.set(parsedPeople)
}

export const peopleById = derived(people, (peeps) => {
    const result = new Map<string, Person>()
    peeps.forEach(p => result.set(p.id, p))
    return result
})

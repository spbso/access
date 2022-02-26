import {derived, writable} from "svelte/store"
import {fakeTickets as testData} from "../data/FakeTickets"
import {formatDistance} from 'date-fns'
import {ru} from 'date-fns/locale'


export class Person {
    id: string;
    fio: string;
    brigade: string;
    ticket: boolean;
    rso?: number;
    qr?: number;

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
        const timestamp = Number(new Date()) / 1000
        return (this.rso ?? 0) >= timestamp
    }

    rsoDetails(): string {
        if (this.isRsoValid()) {
            return ""
        } else {
            if (this.rso ?? 0 > 0) {
                return `истекло ${formatDistance(this.rso * 1000, new Date(), {addSuffix: true, locale: ru})}`
            } else {
                return "нет данных"
            }
        }
    }

    isQrValid(): boolean {
        const timestamp = Number(new Date()) / 1000
        return (this.qr ?? 0) >= timestamp
    }

    qrDetails(): string {
        if (this.isQrValid()) {
            return ""
        } else {
            if (this.qr ?? 0 > 0) {
                return `закончился ${formatDistance(this.qr * 1000, new Date(), {addSuffix: true, locale: ru})}`
            } else {
                return "нет данных"
            }
        }
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

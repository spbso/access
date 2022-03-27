import {derived, writable} from "svelte/store"
import {formatDistance} from 'date-fns'
import {ru} from 'date-fns/locale'


export class Person {
    id: string;
    uid: string
    fio: string;
    brigade: string;
    ticket: boolean;
    rso?: Date;

    constructor({id, uid, fio, brigade, ticket, rso}) {
        this.id = id
        this.uid = uid
        this.fio = fio
        this.brigade = brigade
        this.ticket = ticket
        this.rso = rso
    }

    isValid(): boolean {
        return this.isRsoValid() && this.ticket
    }

    isRsoValid(): boolean {
        return (this.rso ?? 0) >= new Date()
    }

    rsoDetails(): string {
        if (this.isRsoValid()) {
            return ""
        } else {
            if (this.rso ?? 0 > 0) {
                return `истекло ${formatDistance(this.rso, new Date(), {addSuffix: true, locale: ru})}`
            } else {
                return "нет данных"
            }
        }
    }
}

export const people = writable<Person[]>([]);

export const loadPeople = (data): void => {
    const parsedPeople = data.map((item) => new Person(item))
    people.set(parsedPeople)
}

export const peopleByUid = derived(people, (peeps) => {
    const result = new Map<string, Person>()
    peeps.forEach(p => result.set(p.uid, p))
    return result
})

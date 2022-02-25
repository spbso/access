import {atom} from 'nanostores';
// import * as testData from '../data/tickets.json';


export class Ticket {
    id: string;
    fio: string;
    brigade: string;
    rso: number | null;
    qr: number | null;

    isValid(): boolean {
        const timestamp = Number(new Date())
        return this.isRsoValid() && this.isQrValid()
    }

    isRsoValid(): boolean {
        const timestamp = Number(new Date())
        return (this.rso ?? 0) >= timestamp
    }

    isQrValid(): boolean {
        const timestamp = Number(new Date())
        return (this.qr ?? 0) >= timestamp
    }
}

export const tickets = atom<Ticket[]>(null)

export const loadTickets = (): void => {
    // console.log(testData);
}

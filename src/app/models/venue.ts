import { Schedule } from "./schedule";

    export class Venue {
        venueID: number;
        name: string;
        address: string;
        postalCode: string;
        capacity: number;
        schedule?: Schedule[];
    }

import axios from "axios";
import host from './host.ts';

const post: string = "/addReservation";
const get: string = "/getReservationList";
const update: string = "/updateReservation";
const remove: string = "/deleteReservation";

class Reservation {
    // private ref: number; // auto increment, ID
    // private type: string;
    // private dateReservation: Date;
    // private dateDebut: Date;
    // private dateFin: Date;
    // private status: string;
    // private nbPersonne: number;
    // private nbChambre: number;
    // private numeroClient: number;
    // private matricule: string;

    public obtenirListeReservation() {
        const fetch = axios.get(host + get);
        return fetch;
    }

    public faireReservation(newReservation: any) { // => ajouter reservation
        const fetch = axios.post(host + post, newReservation);
        return fetch;
    }

    public modifierReservation(reference: number, reservation: any) {
        const fetch = axios.put(host + update + "/" + reference, reservation);
        return fetch;
    }

    public annulerReservation(reference: number) { // => supprimer reservation
        const fetch = axios.delete(host + remove + "/" + reference);
        return fetch;
    }
}

export default Reservation;
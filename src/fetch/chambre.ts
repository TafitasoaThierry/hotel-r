import axios from "axios";
import host from './host.ts';

const post: string = "/addReservation";
const get: string = "/getReservationList";
//const getChambreById: string = "/getChanbreById";
const update: string = "/updateReservation";
const remove: string = "/deleteReservation";

class Chambre {
    // private numero: string = ""; // ID
    // private type: string = "";
    // private status: string = "";

    public obtenirListeReservation() {
        const fetch = axios.get(host + get);
        return fetch;
    }

    public faireReservation() { // => ajouter Reservation
        const fetch = axios.post(host + post);
        return fetch;
    }

    public modifierReservation(reference: number) {
        const fetch = axios.put(host + reference + update);
        return fetch;
    }

    public annulerReservation(reference: number) { // => supprimer reservation
        const fetch = axios.delete(remove + reference + remove);
        return fetch;
    }
}

export default Chambre;
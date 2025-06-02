import axios from "axios";
import host from './host.ts';

const post: string = "/addChambre";
const get: string = "/getChambreList";
const getChambreById: string = "/getChambreById";
const update: string = "/updateChambre";
const remove: string = "/deleteChambre";

class Chambre {
    // private numero: string = ""; // ID
    // private type: string = "";
    // private status: string = "";

    public obtenirListeChambre() {
        const fetch = axios.get(host + get);
        return fetch;
    }

    public obtenirChambreByNumero(numero: string) {
        const fetch = axios.get(host + getChambreById + "/" + numero);
        return fetch;
    }

    public ajouterChambre(newChambre: any) { // => ajouter chambre
        const fetch = axios.post(host + post, newChambre);
        return fetch;
    }

    public modifierChambre(numero: number, chambreNewInfo: any) {
        const fetch = axios.put(host + update + "/" + numero, chambreNewInfo);
        return fetch;
    }

    public supprimerChambre(numero: number) { // => supprimer chambre
        const fetch = axios.delete(host + remove + "/" + numero);
        return fetch;
    }
}

export default Chambre;
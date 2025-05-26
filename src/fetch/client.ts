import axios from "axios";
import host from './host.ts';
import Person from './person.ts';

const post: string = "/addClient";
const get: string = "/getClientList"; // liste globale
const getClientById = "/getClientByNumeroClient"; // By ID
const getClientByTel = "/getClientByTel"; // obtenir * client par le numero tel => (tout client avec le tel en parametre)
const getClientByEmail = "/getClientByEmail"; // obtenir * client par email => (tout client avec l'email en parametre)
const update: string = "/updateClient";
const remove: string = "/deleteClient";

class Client extends Person {
    // private numeroClient: number = 9; // auto increment, ID

    public obtenirListeClient() {
        const fetch = axios.get(host + get);
        return fetch;
    }

    public obtenirClientByNumeroClient(numeroClient: any) {
        const fetch = axios.get(host + getClientById + "/" + numeroClient);
        return fetch;
    }

    public obtenirClientByTel(tel: string) {
        const fetch = axios.get(host + getClientByTel + "/" + tel);
        return fetch;
    }

    public obtenirClientByEmail(email: string) {
        const fetch = axios.get(host + getClientByEmail + "/" + email);
        return fetch;
    }

    public creerCompte(client: any) { // => ajouter client
        const fetch = axios.post(host + post, client);
        return fetch;
    }

    public modifierCompte(numeroClient: number) { // => supprimer client
        const fetch = axios.put(host + numeroClient + update);
        return fetch;
    }

    public supprimerClient(numeroClient: number) {
        const fetch = axios.delete(remove + numeroClient + remove);
        return fetch;
    }
}

export default Client;
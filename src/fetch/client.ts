import axios from "axios";
import host from './host.ts';
import Person from './person.ts';

const post: string = "/addClient";
const get: string = "/getClientList"; // select *
const getClientById: string = "/getClientByNumeroClient"; // By ID
const getClientByTel: string = "/getClientByTel"; // obtenir * client par le numero tel => (tout client avec le tel en parametre)
const getClientByEmail: string = "/getClientByEmail"; // obtenir * client par email => (tout client avec l'email en parametre)
const update: string = "/updateClient";
const remove: string = "/deleteClient";

class Client extends Person {
    // private numeroClient: number = 9; // auto increment, ID

    public obtenirListeClient() {
        const fetch = axios.get(host + get);
        return fetch;
    }

    public obtenirClientByNumeroClient(numeroClient: number) {
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

    public modifierCompte(numeroClient: number, client: any) {
        const fetch = axios.put(host + update + "/" + numeroClient, client);
        return fetch;
    }

    public supprimerClient(numeroClient: number) {
        const fetch = axios.delete(host + remove + "/" + numeroClient);
        return fetch;
    }
}

export default Client;
import axios from "axios";
import host from './host.ts';
import Person from './person.ts';

const post: string = "/addClient";
const get: string = "/getClientList";
const getClientById = "/getClientById";
const update: string = "/updateClient";
const remove: string = "/deleteClient";

class Client extends Person {
    private numeroClient: number; // auto increment, ID

    public constructor() {
        super();
        this.numeroClient = 0;
    }

    public obtenirListeClient() {
        const fetch = axios.get(host + get);
        return fetch;
    }

    public creerCompte() { // => ajouter client
        const fetch = axios.post(host + post);
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
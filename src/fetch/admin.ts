import axios from "axios";
import host from './host.ts';
import Person from './person.ts';

const post: string = "/addAdmin";
const get: string = "/getAdminList";
const getById: string = "/getAdminById";
const update: string = "/updateAdmin";
const remove: string = "/deleteAdmin";

class Admin extends Person {
    private matricule: string; // ID

    public constructor() {
        super();
        this.matricule = "";
    }

    public obtenirListeAdmin() {
        const fetch = axios.get(host + get);
        return fetch;
    }

    public creerCompte() { // => ajouter Admin
        const fetch = axios.post(host + post);
        return fetch;
    }

    public modifierAdmin(matricule: string) {
        const fetch = axios.put(host + matricule + update);
        return fetch;
    }

    public supprimerAdmin(matricule: string) {
        const fetch = axios.delete(remove + matricule + remove);
        return fetch;
    }
}

export default Admin;
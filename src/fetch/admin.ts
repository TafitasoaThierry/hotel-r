import axios from "axios";
import host from './host.ts';
import Person from './person.ts';

const post: string = "/addAdmin";
const get: string = "/getAdminList";
const getById: string = "/getAdminById";
const update: string = "/updateAdmin";
const remove: string = "/deleteAdmin";

class Admin extends Person {
    // private matricule: string; // ID

    public obtenirListeAdmin() {
        const fetch = axios.get(host + get);
        return fetch;
    }

    public obtenirAdminByMatricule(matricule: string) {
        const fetch = axios.get(host + getById + "/" + matricule);
        return fetch;
    }

    public creerCompte(newAdmin: any) { // => ajouter Admin
        const fetch = axios.post(host + post, newAdmin);
        return fetch;
    }

    public modifierAdmin(matricule: string, adminNewInfo: any) {
        const fetch = axios.put(host + update + "/" + matricule, adminNewInfo);
        return fetch;
    }

    public supprimerAdmin(matricule: string) {
        const fetch = axios.delete(host + remove + "/" + matricule);
        return fetch;
    }
}

export default Admin;
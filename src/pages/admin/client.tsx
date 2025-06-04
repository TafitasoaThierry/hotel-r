import { useEffect, useState } from "react";
import ClientObj from "../../fetch/client";

export default function Client() {
    const [clientList, setClientList] = useState([]);
    
    useEffect(() => {
        const client = new ClientObj();
        client.obtenirListeClient()
        .then((response) => {
            setClientList(response.data);
            console.log(client);
        })
    }, [])
    return (
        <div className="client-container">
            <h1>Listes client</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Numero client</th>
                        <th>Nom</th>
                        <th>Prenoms</th>
                        <th>Tel</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {clientList.map((client:any) => <ListClient key={client.numeroClient} client={client} />)}
                </tbody>
            </table>
        </div>
    );
}

function ListClient({client}: any) {
    return (
        <tr>
            <td>client.numeroCl</td>
            <td>client.nom</td>
            <td>client.prenoms</td>
            <td>client.tel</td>
            <td>client.email</td>
        </tr>
    );
}
import { useEffect, useState } from "react";
import "../../styles/admin.dashboard.scss";
import ReservationObj from "../../fetch/reservation";
import { BarChart } from "@mui/x-charts";
import Client from "../../fetch/client";

export default function Dashboard() {
    return (
        <div className="dashboard-container">
            <Reservation />
        </div>
    );
}

function Reservation() {
    const [recent, setRecent] = useState(0);
    const [total, setTotal] = useState(0);
    const [ceMois, setCeMois] = useState(0);
    const [reservationList, setReservationList] = useState([]);
    const Person = [
        { "id": "001", "name": "aaa", "age": 19 },
        { "id": "002", "name": "bbb", "age": 18 },
        { "id": "003", "name": "ccc", "age": 30 },
        { "id": "004", "name": "ddd", "age": 21 }
    ]

    useEffect(() => {
        const reservation = new ReservationObj();
        reservation.obtenirListeReservation()
        .then((response) => {
            effectif(response.data);
            setReservationList(response.data);
        })
        .catch((e) => console.log(e))
    }, [])

    useEffect(() => {
        setReservationList(reservationList);
        console.log(reservationList);
    }, [reservationList])

    function effectif(obj: any) {
        const date = new Date();
        const now = setDateFormat(date.getDate().toString(), date.getMonth().toString(), date.getFullYear().toString());
        //let countTodayReservation:any = obj.filter(item => item.dateReservation == now)
        console.log(now);
        setTotal(obj.length);
        setRecent(0);
        setCeMois(0);
    }
    function setDateFormat(day:string, month:string, year:string) {
        day = day.length < 2 ? "0" + day : day;
        month = month.length < 2 ? "0" + month : month;
        return `${day}/${month}/${year}`;
    }

    return (
        <div className="reservation-container">
            <div className="data">
                <Histogramme />
                <div className="box-list">
                    <div className="box nouvelle">
                        <h5>Aujourd'hui</h5>
                        <h3><i className="fa-solid fa-history"></i> { recent }</h3>
                    </div>
                    <div className="box totale">
                        <h5>Totale réservation</h5>
                        <h3>{ total }</h3>
                    </div>
                    {/* <div className="box ce-mois">
                        <h5>Recette de ce mois</h5>
                        <h3>{ ceMois }</h3>
                    </div> */}
                </div>
            </div>
            <h2>Listes de réservation</h2>
            <div className="search-field">
                <input type="text" className="form-control" placeholder="Rechercher de réservation(nom, prenoms)" />
                <button className="btn"><i className="fa-solid fa-search"></i> Rechercher</button>
            </div>
            <div className="filter">
                <button className="btn label">Filtre: </button>
                <button className="btn btn-filter">Tout</button>
                <button className="btn btn-filter">Payé</button>
                <button className="btn btn-filter">Non Payé</button>
            </div>
            <div className="reservation-list">
                { reservationList.map((reservation:any) => <List key={reservation.ref} reservation={reservation} />) }
            </div>
        </div>
    );
}

function Histogramme() {
    return (
        <div className="histogramme">
            <h2>Recette mensuelle</h2>
            <BarChart
                xAxis={[
                    {
                        id: 'barCategories',
                        data: ['Jan', 'Fev', 'Mars', 'Avr', 'Mai', 'Jui','Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Dec'],
                    },
                ]}
                series={[
                    {
                        data: [2, 5, 3, 2, 5, 3, 2, 5, 3, 23, 12, 31],
                    },
                ]}
                className="bar-chart"
            />
        </div>
    );
}

function List(props: any) {
    const [client, setClient] = useState({
        nom: "",
        prenoms: ""
    });
    function getID(ref: any) {
        alert("ID = " + ref);
    }
    function getClient(numeroClient: any) {
        const client = new Client();
        client.obtenirClientByNumeroClient(numeroClient)
        .then((r) => {
            setClient({
                nom: r.data.nom,
                prenoms: r.data.prenoms
            })
        })
    }
    return (
        <div className="list">
            <p onChange={() => getClient(props.reservation.numeroClient)}>{props.reservation.ref}, cli_ID = {props.reservation.numeroClient}, nom: {client.nom}, prenoms: {client.prenoms}</p>
            <button className="btn btn-primary" onClick={() => getID(props.reservation.ref)}>GET_ID</button>
        </div>
    );
}
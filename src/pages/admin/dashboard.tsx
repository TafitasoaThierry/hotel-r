import { useEffect, useState } from "react";
import "../../styles/admin.dashboard.scss";
import ReservationObj from "../../fetch/reservation";

export default function Dashboard() {
    return (
        <div className="dashboard-container">
            <div><Reservation /></div>
        </div>
    );
}

function Reservation() {
    const [recent, setRecent] = useState(12);
    const [total, setTotal] = useState(0);
    const [ceMois, setCeMois] = useState(0);

    useEffect(() => {
        const reservation = new ReservationObj();
        reservation.obtenirListeReservation()
        .then((response) => {
            effectif(response.data);
        })
        .catch((e) => console.log(e))
    }, [])

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
            <div className="box">
                <div className="box-item">
                    <h5>Nouvelle réservation</h5>
                    <h1 className="value"><i className="fa-solid fa-history"></i> {recent}</h1>
                </div>
                <div className="box-item">
                    <h5>Total réservation</h5>
                    <h1 className="value"><i className="fa-solid fa-total"></i> {total}</h1>
                </div>
                <div className="box-item">
                    <h5>Recette de ce mois</h5>
                    <h1 className="value"><i className="fa-solid fa-entry"></i> {ceMois}</h1>
                </div>
            </div>
            <h3>Listes de reservation</h3>
            <div className="search-field">
                <input type="text" className="form-control" placeholder="Rechercher de réservation(nom, prenoms)" />
                <button className="btn"><i className="fa-solid fa-search"></i> Rechercher</button>
            </div>
            <div className="reservation-list">
                <div className="list">Réservation de 1 chambre classique pour 2 personnes</div>
                <div className="list">Réservation de 1 chambre classique pour 2 personnes</div>
                <div className="list">Réservation de 1 chambre classique pour 2 personnes</div>
                <div className="list">Réservation de 1 chambre classique pour 2 personnes</div>
                <div className="list">Réservation de 1 chambre classique pour 2 personnes</div>
            </div>
            <div><Histogramme /></div>
            <div className="reservation-list">
                <div className="list">Réservation de 1 chambre classique pour 2 personnes</div>
                <div className="list">Réservation de 1 chambre classique pour 2 personnes</div>
                <div className="list">Réservation de 1 chambre classique pour 2 personnes</div>
                <div className="list">Réservation de 1 chambre classique pour 2 personnes</div>
                <div className="list">Réservation de 1 chambre classique pour 2 personnes</div>
            </div>
        </div>
    );
}

function Histogramme() {
    return (
        <h1>Histogramme</h1>
    );
}
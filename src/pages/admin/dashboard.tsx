import { useEffect, useState } from "react";
import "../../styles/admin.dashboard.scss";
import ReservationObj from "../../fetch/reservation";
import { BarChart } from "@mui/x-charts";

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
            <div className="data">
                <div className="box-list">
                    <div className="box nouvelle">
                        <h5>Nouvelle réservation</h5>
                        <h3>{ recent }</h3>
                    </div>
                    <div className="box totale">
                        <h5>Totale réservation</h5>
                        <h3>{ total }</h3>
                    </div>
                    <div className="box ce-mois">
                        <h5>Recette de ce mois</h5>
                        <h3>{ ceMois }</h3>
                    </div>
                </div>
                <Histogramme />
            </div>
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
                height={280}
            />
        </div>
    );
}
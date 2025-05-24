import ReservationObject from "../fetch/reservation";
import "../styles/reservation.scss";
import queen from "../assets/image/queen.png";
import king from "../assets/image/king.png";
import twin from "../assets/image/twin.png";
import { useState } from "react";

export default function Reservation() {
    const [reservation, setReservation] = useState({
        // ID: ref
        type: "", // standard / king / 2 lits
        nbPersonne: 2,
        nbChambre: 1,
        dateReservation: "",
        dateDebut: "",
        dateFin: "",
        numeroClient: 0,
        status: "non-payé", // non-payé & payé
    })

    function reserver() {
        const reservation = new ReservationObject();
        reservation.faireReservation(reservation)
        .then((r) => console.log(r))
        .catch((err) => console.log(err));
        // console.log(`Reservation pour ${JSON.stringify(reservation)}`);
        // alert(`1st date: ${reservation.dateDebut <= reservation.dateFin}`)
        // alert(`${reservation.dateDebut.split('-').reverse().join('-')}`)
        // alert(`actual date = ${new Date('2025-05-24').getTime()} date entered = ${new Date(reservation.dateDebut).getTime()}`)
    }

    return (
        <div className="reservation">
            <h5>Types de chambre</h5>
            <div className="offres">
                <div className="box">
                    <input type="radio" name="choix" className="radio" onChange={() => {
                        setReservation(previousState => {
                            return { ... previousState, type: "Standard" }
                        });
                    }} />
                    <label>Standard</label>
                    <img src={ queen } alt="deluxe" />
                </div>
                <div className="box">
                    <input type="radio" name="choix" className="radio" onChange={() => {
                        setReservation(previousState => {
                            return { ... previousState, type: "King" }
                        });
                    }} />
                    <label>King</label>
                    <img src={ king } alt="deluxe" />
                </div>
                <div className="box">
                    <input type="radio" name="choix" className="radio" onChange={() => {
                        setReservation(previousState => {
                            return { ... previousState, type: "2 Lits" }
                        });
                    }} />
                    <label>2 Lits</label>
                    <img src={ twin } alt="deluxe" />
                </div>
                <button className="question"><i className="fa-solid fa-question"></i> En savoir plus</button>
            </div>
            
            <div className="container">
                <div className="form">
                    <div className="form-group">
                        <label className="txt">Nombre de personne</label>
                        <input type="number" className="form-control" min={1} max={30} value={ reservation.nbPersonne > 30 ? 30 : reservation.nbPersonne } onChange={(e) => {
                            setReservation(previousState => {
                                return { ... previousState, nbPersonne: parseInt(e.target.value) }
                            });
                        }} placeholder="Nombre de personne" />
                    </div>
                    <div className="form-group">
                        <label>Du </label>
                        <input type="date" className="form-control" value={reservation.dateDebut} onChange={(e) => {
                            setReservation(previousState => {
                                return { ... previousState, dateDebut: e.target.value }
                            });
                        }} />
                        <label>Au </label>
                        <input type="date" className="form-control" value={reservation.dateFin} onChange={(e) => {
                            setReservation(previousState => {
                                return { ... previousState, dateFin: e.target.value }
                            });
                        }} />
                    </div>
                    <div className="form-group">
                        <label className="txt">Nombre de chambre</label>
                        <input type="number" className="form-control" min={1} max={30} maxLength={3} placeholder="Nombre de chambre" value={ reservation.nbChambre > 30 ? 30 : reservation.nbChambre } onChange={(e) => {
                            setReservation(previousState => {
                                return { ... previousState, nbChambre: parseInt(e.target.value) }
                            });
                        }} />
                    </div>
                    <div className="form-group">
                        <button className="form-control btn" onClick={reserver}><i className="fa-solid fa-calendar"></i> Réserver</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
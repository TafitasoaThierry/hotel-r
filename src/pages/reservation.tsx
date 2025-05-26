import "../styles/reservation.scss";
import queen from "../assets/image/queen.png";
import king from "../assets/image/king.png";
import twin from "../assets/image/twin.png";
import ReservationObject from "../fetch/reservation";
import { useEffect, useState } from "react";

export default function Reservation() {
    const [reservation, setReservation] = useState({
        type: "",
        nbPersonne: 2,
        nbChambre: 1,
        dateReservation: "",
        dateDebut: "",
        dateFin: "",
        status: "non-payé",
        numeroClient: 0,
        matricule: "non-designé"
    })
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const user:any = localStorage.getItem("user");
        ((user != null) && (JSON.parse(user).isConnected)) ? setIsConnected(true) : setIsConnected(false);
    }, [localStorage.getItem("user")])

    useEffect(() => {
        if(isConnected == true) {
            const user:any = localStorage.getItem("user");
            setReservation(previousState => {
                return { ... previousState, numeroClient: JSON.parse(user).numeroClient }
            });
            // console.log("numCLI: " + JSON.parse(user).numeroClient);
            // console.log("type: " + JSON.parse(user).type);
            // console.log("isConnected: " + JSON.parse(user).isConnected);
        }else {
            console.log("NOT_CONNECTED");
        }
    }, [isConnected])

    useEffect(() => {
        const user:any = localStorage.getItem("user");
        if(isConnected) {
            setReservation(previousState => {
                return { ... previousState, numeroClient: JSON.parse(user).numeroClient }
            });
        }
    }, [reservation.numeroClient])

    useEffect(() => {
        const date = new Date();
        setReservation(previousState => {
            return { ...previousState, dateReservation: setDateFormat(date.getDate().toString(), date.getMonth().toString(), date.getFullYear().toString()) }
        })
    }, [new Date().getDate()])
    
    function reserver() {
        const newReservation = new ReservationObject();
        console.log(reservation);
        // newReservation.faireReservation(reservation)
        // .then((r) => {
        //     console.log(r.data);
        // })
    }

    return (
        <div className="reservation">
            <h5>Types de chambre</h5>
            <p style={{ color: "green", display: isConnected ? "none" : "inline" }}><small>(Vous n'êtes pas encore connecter)</small></p>
            <div className="offres">
                <div className="box">
                    <input type="radio" name="choix" className="radio" onChange={() => {
                        setReservation(previousState => {
                            disabledBtn();
                            return { ... previousState, type: "Standard" }
                        });
                    }} />
                    <label>Standard</label>
                    <img src={ queen } alt="deluxe" />
                </div>
                <div className="box">
                    <input type="radio" name="choix" className="radio" onChange={() => {
                        setReservation(previousState => {
                            disabledBtn();
                            return { ... previousState, type: "King" }
                        });
                    }} />
                    <label>King</label>
                    <img src={ king } alt="deluxe" />
                </div>
                <div className="box">
                    <input type="radio" name="choix" className="radio" onChange={() => {
                        setReservation(previousState => {
                            disabledBtn();
                            return { ... previousState, type: "2 Lits" }
                        });
                    }} />
                    <label>2 Lits</label>
                    <img src={ twin } alt="deluxe" />
                </div>
                <button className="question"><i className="fa-solid fa-question"></i> En savoir plus</button>
            </div>
            
            <div className="container">
                <h5>Formulaire de réservation</h5>
                <div className="form">
                    <div className="form-group">
                        <label>Nombre de personne</label>
                        <input type="number" className="form-control" min={1} max={30} value={ reservation.nbPersonne > 30 ? 30 : reservation.nbPersonne } onChange={(e) => {
                            setReservation(previousState => {
                                return { ... previousState, nbPersonne: parseInt(e.target.value) }
                            });
                        }} placeholder="Nombre de personne" />
                    </div>
                    <div className="form-group">
                        <label>Du </label>
                        <input type="date" className="form-control" onChange={(e) => {
                            setReservation(previousState => {
                                return { ... previousState, dateDebut: e.target.value.toString().split("-").reverse().join("/") }
                            });
                        }} />
                        <label>Au </label>
                        <input type="date" className="form-control" onChange={(e) => {
                            setReservation(previousState => {
                                return { ... previousState, dateFin: e.target.value.toString().split("-").reverse().join("/") }
                            });
                        }} />
                    </div>
                    <div className="form-group">
                        <label>Nombre de chambre</label>
                        <input type="number" className="form-control" min={1} max={30} maxLength={3} placeholder="Nombre de chambre" value={ reservation.nbChambre > 30 ? 30 : reservation.nbChambre } onChange={(e) => {
                            setReservation(previousState => {
                                return { ... previousState, nbChambre: parseInt(e.target.value) }
                            });
                        }} />
                    </div>
                    <div className="form-group">
                        <button className="form-control btn" onClick={reserver}
                            disabled={ disabledBtn() }
                        ><i className="fa-solid fa-calendar"></i> Réserver</button>
                    </div>
                    <p className="errorMsg" style={{ 
                        display: compare(reservation.dateDebut, reservation.dateFin) ? "inline": "none" 
                    }}><i className="fa-solid fa-info"></i> Entrer une date correcte</p>
                </div>
            </div>
        </div>
    );
    function disabledBtn() {
        if(
            (isConnected == false) || 
            (reservation.type == "") || 
            (compare(reservation.dateDebut, reservation.dateFin)) || 
            (reservation.dateDebut == "") ||
            (reservation.dateFin == "") ||
            (reservation.dateDebut == reservation.dateFin && reservation.dateDebut != "") ||
            (reservation.dateDebut == reservation.dateFin && reservation.dateDebut == "")
        ) {
            return true;
        }
        return false;
    }
    function setDateFormat(day:string, month:string, year:string) {
        day = day.length < 2 ? "0" + day : day;
        month = month.length < 2 ? "0" + month : month;
        return `${day}/${month}/${year}`;
    }
    function toISO(date:string) {
        return new Date(date.split("/").reverse().join("-"));
    }
    function compare(dateDeb:any, dateFin:any) {
        if(toISO(dateDeb) >= toISO(dateFin)) {
            return true;
        }
        return false;
    }
}
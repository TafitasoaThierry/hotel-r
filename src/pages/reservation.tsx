import "../styles/reservation.scss";
// import queen from "../assets/image/queen.png";
// import king from "../assets/image/king.png";
// import twin from "../assets/image/twin.png";

export default function Reservation() {
    return (
        <div className="reservation">
            <h1>Offres</h1>
        </div>
    );
}

/**
 * 
            <div className="offres">
                <div className="box">
                    <h5>Queen</h5>
                    <img src={ queen } alt="deluxe" width={ 80 + "px" } />
                    <input type="radio" name="choix" />
                </div>
                <div className="box">
                    <h5>King</h5>
                    <img src={ king } alt="deluxe" width={ 100 + "px" } />
                    <input type="radio" name="choix" />
                </div>
                <div className="box">
                    <h5>Twin</h5>
                    <img src={ twin } alt="deluxe" width={ 80 + "px" } />
                    <input type="radio" name="choix" />
                </div>
            </div>
            <form className="formulaire">
                <div className="row">
                    <div className="col">
                        <input type="number" className="form-control" placeholder="Nombre de personne" />
                    </div>
                    <div className="col">
                        <input type="date" className="form-control" />
                    </div>
                    <div className="col">
                        <input type="numbre" className="form-control" placeholder="Chambre"/>
                    </div>
                    <div className="col">
                        <input type="button" className="form-control btn btn-primary" value={ "Réserver" } />
                    </div>
                </div>
            </form>
 */
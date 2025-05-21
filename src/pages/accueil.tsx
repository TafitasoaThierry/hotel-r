import img from "../assets/image/receptionniste.jpg";
//import reception from "../assets/image/reception.jpg";
//import connection from "../assets/image/undraw_internet-on-the-go_npa2.png";
//import service from "../assets/image/20945944.jpg";
import question from "../assets/image/question.png";
import { Link } from "react-router";

export default function Accueil({ setCurrent }: any) {
    return (
        <div className="accueil">
            <div className="welcome">
                <img src={ img } alt="receptionniste" />
            </div>
            <div className="container">
                <div className="landing">
                    <div className="greeting">BIENVENUE</div>
                    <div className="link">
                        <div className="description">
                            <h3>Réserver maintenant et réposer plustard</h3>
                            <p>Assurez et vivez vôtre vacance en toute sécurité et confiance</p>
                        </div>
                        <Link to={ "/reservation" }><button className="btn btn-primary" onClick={ () => setCurrent("/reservation") }>Nos offres</button></Link>
                    </div>
                </div>
                <div className="item service-presentation">
                    <h1>Nos services <i className="fa-solid fa-hotel"></i></h1>
                    <img src={ question } alt="?" width={600 + "px"} />
                </div>
                <div className="item service-list">
                    <div className="box">
                        <h5>
                            <i className="fa-solid fa-x"></i> Réception 24h/24
                        </h5>
                    </div>
                    <div className="box">
                        <h5>
                            <i className="fa-solid fa-x"></i> Service de chambre
                        </h5>
                    </div>
                    <div className="box">
                        <h5>
                            <i className="fa-solid fa-wifi"></i> Connexion internet
                        </h5>
                    </div>
                    <div className="box">
                        <h5>
                            <i className="fa-solid fa-x"></i> Petit déjeuner
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    );
}
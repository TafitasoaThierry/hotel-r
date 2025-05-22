import img from "../assets/image/receptionniste.jpg";
import { Link } from "react-router";
import question from "../assets/image/question.png";
import time from "../assets/image/time.png";
import roomService from "../assets/image/roomService.png";
import petitDejeuner from "../assets/image/petitdejeuner.png";

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
                        <div className="service">
                            <img src={time} alt="service" className="service-icon" />
                        </div>
                        <h5>Réception 24h/24</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur ad porro ex provident dignissimos accusantium maiores omnis expedita.</p>
                    </div>
                    <div className="box">
                        <div className="service">
                            <img src={roomService} alt="service" className="service-icon" />
                        </div>
                        <h5>Service de chambre</h5>
                        <p>Vous pouvez demander à toute heure que ce soit un petit-déjeuner tardif ou snack de minuit</p>
                    </div>
                    <div className="box">
                        <div className="service">
                            <img src={time} alt="service" className="service-icon" />
                        </div>
                        <h5>Connexion internet</h5>
                        <p>Un Wi-Fi gratuit et sécurisé dans toutes les chambres et espaces communs</p>
                    </div>
                    <div className="box">
                        <div className="service">
                            <img src={petitDejeuner} alt="service" className="service-icon" />
                        </div>
                        <h5>Petit déjeuner</h5>
                        <p>Avec des options saines et locales</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
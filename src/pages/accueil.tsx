import { Link } from "react-router";
import imgPresentation from "../assets/image/20945944.jpg";
import question from "../assets/image/question.png";
import time from "../assets/image/time.png";
import roomService from "../assets/image/roomService.png";
import petitDejeuner from "../assets/image/petitdejeuner.png";
import wifi from "../assets/image/wi-fi.png";
import logo from "../assets/image/hotel_17020506.png";
//import video from "../assets/video/hotel (1).mp4";

export default function Accueil({ setCurrent }: any) {
    return (
        <div className="accueil">
            <div className="presentation">
                <div className="text">
                    <div className="salutation"><h1>BIENVENUE</h1></div>
                    <div className="introduction">
                        <h3>Réserver maintenant et réposer plustard</h3>
                        <p>Assurez et vivez vôtre vacance en toute sécurité et confiance</p>
                        <Link to={ "/reservation" }><button className="btn" onClick={ () => setCurrent("/reservation") }>Nos offres</button></Link>
                    </div>
                </div>
                <div className="image">
                    <img src={imgPresentation} alt="presentation" />
                </div>
            </div>
            <div className="service-presentation">
                <h1>NOS SERVICES</h1>
                <img src={ question } alt="?" width={600 + "px"} />
            </div>
            <div className="service-list">
                <div className="image">
                    <img src={logo} alt="hotel" />
                </div>
                <div className="content">
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
                            <img src={wifi} alt="service" className="service-icon" />
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
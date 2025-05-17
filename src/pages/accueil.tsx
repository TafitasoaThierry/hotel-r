import img from "../assets/image/receptionniste.jpg";
import reception from "../assets/image/reception.jpg";
import connection from "../assets/image/undraw_internet-on-the-go_npa2.png";
import { Link } from "react-router";

export default function Accueil({ setCurrent }: any) {
    return (
        <div className="accueil">
            <div className="welcome">
                <img src={ img } alt="receptionniste" />
            </div>
            <div className="container">
                <div className="landing">
                    <div className="greeting">Bienvenue</div>
                    <div className="link">
                        <p className="description">
                            <b>Réserver maintenant et réposer plustard</b> <br />
                            Assurez et vivez vôtre vacance en toute sécurité et confiance
                        </p>
                        <Link to={ "/reservation" }><button className="btn btn-primary" onClick={ () => setCurrent("/reservation") }>Nos offres</button></Link>
                    </div>
                </div>
                <div className="item" style={{justifyContent: "center"}}><h1>Nos services</h1></div>
                <div className="item">
                    <div className="reception"><img src={ reception } alt="reception" /></div>
                    <p className="reception-label">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, provident exercitationem dolorum hic voluptatem nostrum numquam nesciunt vel excepturi velit sunt, architecto ullam sed totam id voluptates corrupti beatae maiores?</p>
                </div>
                <div className="item">
                    <div className="reception"><img src={ connection } alt="reception" /></div>
                    <p className="reception-label">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, provident exercitationem dolorum hic voluptatem nostrum numquam nesciunt vel excepturi velit sunt, architecto ullam sed totam id voluptates corrupti beatae maiores?</p>
                </div>
                <div className="item">
                    <div className="reception"><img src={ reception } alt="reception" /></div>
                    <p className="reception-label">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, provident exercitationem dolorum hic voluptatem nostrum numquam nesciunt vel excepturi velit sunt, architecto ullam sed totam id voluptates corrupti beatae maiores?</p>
                </div>
                <div className="item">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, provident exercitationem dolorum hic voluptatem nostrum numquam nesciunt vel excepturi velit sunt, architecto ullam sed totam id voluptates corrupti beatae maiores?
                </div>
            </div>
        </div>
    );
}
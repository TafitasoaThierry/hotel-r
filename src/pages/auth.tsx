import { useState } from "react";
import "../styles/auth.scss";

export default function Auth() {
    const [showConnexion, setShowConnexion] = useState(true);

    if(showConnexion == true ) {
        return <Connexion setShowConnexion={ setShowConnexion } />;
    }
    return <Creation setShowConnexion={ setShowConnexion }/>;
}

function Creation({ setShowConnexion }: any) {
    return (
        <div className="auth">
            <form className="form creation">
            <p  style={ { textAlign: "right" } }><button onClick={ () => setShowConnexion(false) }><small>Connexion</small> <i className="fa-solid fa-arrow-right"></i></button></p>
            <h3 style={ { textAlign: "center" } }>Création de compte</h3>
            <div className="form-group">
                <label>Nom</label>
                <input type="text" className="form-control" placeholder="Nom" />
            </div>
            <div className="form-group">
                <label>Prenoms</label>
                <input type="text" className="form-control" placeholder="Prenom(s)" />
            </div>
            <div className="form-group">
                <label>Téléphone</label>
                <input type="text" className="form-control" placeholder="Numero téléphone" />
            </div>
            <div className="form-group">
                <label>Adresse email</label>
                <input type="mailto" className="form-control" placeholder="exemple@gmail.com"/>
            </div>
            <div className="form-group">
                <input type="button" className="form-control btn btn-primary" value={ "S'inscrire" } style={ { marginTop: "8px" } } />
            </div>
        </form>
        </div>
    );
}

function Connexion({ setShowConnexion }: any) {
    return (
        <div className="auth">
            <form className="form connexion">
            <p><button onClick={ () => setShowConnexion(false) }><i className="fa-solid fa-arrow-left"></i><small> Créer compte</small></button></p>
            <h3 style={ { textAlign: "center" } }>Connexion</h3>
            <div className="form-group">
                <label>Téléphone ou Adresse email</label>
                <input type="text" className="form-control" placeholder="Numero téléphone ou email" />
            </div>
            <div className="form-group">
                <label>Mots de passe</label>
                <input type="password" className="form-control" placeholder="Mots de passe" />
            </div>
            <div className="form-group">
                <input type="button" className="form-control btn btn-primary" value={ "Se connecter" } style={ { marginTop: "8px" } } />
            </div>
        </form>
        </div>
    );
}
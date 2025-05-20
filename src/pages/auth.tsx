import { useEffect, useState } from "react";
import "../styles/auth.scss";
import Client from "../fetch/client";

export default function Auth({ setCurrent, setDisplayUserStatus}: any) {
    const [showConnexion, setShowConnexion] = useState(true);

    if(showConnexion) {
        return <Connexion setShowConnexion={ setShowConnexion } setCurrent={ setCurrent } setDisplayUserStatus={ setDisplayUserStatus } />;
    }
    return <Creation setShowConnexion={ setShowConnexion } />;
}

function Creation({ setShowConnexion }: any) {
    const [client, setClient] = useState({ // client object
        nom: "",
        prenoms: "",
        tel: "",
        email: "",
        mdp: ""
    });
    const [nomInfo, setNomInfo] = useState("none");
    const [prenomsInfo, setPrenomsInfo] = useState("none");
    const [emailInfo, setEmailInfo] = useState("none");
    const [isEmail, setIsEmail] = useState(false);
    const [showConfirmMdp, setShowConfirmMdp] = useState("none");
    const [mdp, setMdp] = useState("");

    useEffect(() => {
        createMdp();
    }, [mdp])

    useEffect(() => {
        createMdp();
        if(mdp.length > 0) {
            inscrire(); // s'inscrire si le mots de passe et non vide ou < 8
        }
    }, [client.mdp])

    function inscrire() {
        console.log("mdp = " + mdp);
        console.log("client = " + JSON.stringify(client));
        const newclient = new Client();
        newclient.creerCompte(client)
            .then((r) => {console.log(r)})
            .catch(() => console.log("inscription !okay"));

        setClient({ // clear form input
            nom: "",
            prenoms: "",
            email: "",
            tel: "",
            mdp: ""
        })

        setMdp(""); // mdp = ""; valeur vide
    }

    /**
     * eliminer les nombres ou caractères spéciaux dans le nom/prenoms
     */
    function editNom(nom:string, type:string) { // nom et prenoms
        let correct:string = "";
        let n:number = nom.length;

        /** // eliminer les nombres seulement
         * 
         *  for(let character of nom) {
                if((parseInt(character)) || (character == '0')) { 
                    nom = nom.replace(character, ''); // remplacer les nombres par ''
                    type == "nom" ? setNomInfo("inline") : setPrenomsInfo("inline");
                }else {
                    correct = correct + character;
                    type == "nom" ? setNomInfo("none") : setPrenomsInfo("none");
                }
            }
         */

        // eliminer les nombres et les caractères speciaux
        for(let i:number = 0; i < n; i++) {
            if(
                (nom.charCodeAt(i) <= 63) || // code ASCII
                (91 <= nom.charCodeAt(i) && nom.charCodeAt(i) <= 96) ||
                (123 <= nom.charCodeAt(i) && nom.charCodeAt(i) <= 191)
            ) {
                if((nom[i] == nom[i + 1]) && (nom[i] == ' ')) { // 2 espaces consecutifs, eliminer l'espace suivant
                    nom = nom.replace(nom[i], ' ');
                }else if(nom[i] == ' ') { // 1 espace
                    correct = correct + nom[i];
                    type == "nom" ? setNomInfo("none") : setPrenomsInfo("none");
                }else {
                    nom = nom.replace(nom[i], ''); // remplacer les caractères spéciaux ou nombres par ''
                    type == "nom" ? setNomInfo("inline") : setPrenomsInfo("inline");
                }
            }else {
                correct = correct + nom[i];
                type == "nom" ? setNomInfo("none") : setPrenomsInfo("none");
            }
        }
        return correct;
    }

    function checkNom(nom: string) {
        setClient({
            nom: editNom(nom, "nom"),
            prenoms: client.prenoms,
            email: client.email,
            tel: client.tel,
            mdp: client.mdp
        })
    }

    function checkPrenoms(prenom: string) {
        setClient({
            nom: client.nom,
            prenoms: editNom(prenom, "prenoms"),
            email: client.email,
            tel: client.tel,
            mdp: client.mdp
        })
    }

    function checkTelephone(tel: string) {
        let correct:string = "";
        let n:number = tel.length;

        for(let i:number = 0; i < n; i++) {
            if(48 <= tel.charCodeAt(i) && tel.charCodeAt(i) <= 57 || tel[i] == '+') { // only number and '+' symbol
                correct += tel[i];
            }else {
                tel = tel.replace(tel[i], '');
            }
        }

        setClient({
            nom: client.nom,
            prenoms: client.prenoms,
            tel: correct,
            email: client.email,
            mdp: client.mdp
        })
    }

    function checkEmail(email: string) {
        for(let c of email) { // remove space
            if(c == ' ') {
                email = email.replace(c, '');
            }
        }
        if(email.slice(-10) != "@gmail.com" || email.length <= 10) {
            setEmailInfo("inline");
            setIsEmail(false);
        }else {
            setEmailInfo("none");
            setIsEmail(true);
        }
        setClient({
            nom: client.nom,
            prenoms: client.prenoms,
            tel: client.tel,
            email: email,
            mdp: client.mdp
        }) 
    }

    function disabledBtn(): boolean {
        if(client.nom == "" || client.prenoms == "" || isEmail == false || client.tel == "") {
            return true;
        }
        return false;
    }

    function createMdp() {
        setClient({
            nom: client.nom,
            prenoms: client.prenoms,
            email: client.email,
            tel: client.tel,
            mdp: mdp // from confirmForm
        })
    }

    return (
        <div className="container">
            <div className="auth">
                <div className="form creation">
                    <p style={ { textAlign: "right" } }><button onClick={ () => setShowConnexion(true) }><small><i>Se connecter </i> </small> <i className="fa-solid fa-arrow-right"> </i></button></p>
                    <h3 style={ { textAlign: "center" } }>Inscription</h3>
                    <div className="form-group">
                        <label>Nom</label>
                        {/* or using a spread operator to update each propertie of client object */}
                        <input type="text" className="form-control" maxLength={80} value={ client.nom } onChange={ (e) => checkNom(e.target.value) } placeholder="Nom" />
                        <p style={ { color: "green", display: nomInfo } }><small>Ne doit pas contient des caractères spéciaux ou nombres</small></p>
                    </div>
                    <div className="form-group">
                        <label>Prenoms</label>
                        <input type="text" className="form-control" maxLength={80} value={ client.prenoms } onChange={ (e) => checkPrenoms(e.target.value) }placeholder="Prenom(s)" />
                        <p style={ { color: "green", display: prenomsInfo } }><small>Ne doit pas contient des caractères spéciaux ou nombres</small></p>
                    </div>
                    <div className="form-group">
                        <label>Téléphone</label>
                        <input type="text" className="form-control" maxLength={20} value={ client.tel } onChange={ (e) => checkTelephone(e.target.value) } placeholder="Numero téléphone" />
                    </div>
                    <div className="form-group">
                        <label>Adresse email</label>
                        <input type="mailto" className="form-control" value={ client.email } maxLength={50} onChange={ (e) => checkEmail(e.target.value) } placeholder="exemple@gmail.com"/>
                        <p style={ { color: "green", display: emailInfo } }><small>example@gmail.com</small></p>
                    </div>
                    <div className="form-group">
                        <input type="button" onClick={ () => setShowConfirmMdp("inline") } disabled={ disabledBtn() } className="form-control btn btn-primary" value={ "S'inscrire" } style={ { marginTop: "8px" } } />
                    </div>
                </div>
            </div>
            <ConfirmMdp sendMdp={ setMdp } showConfirmMdp={ showConfirmMdp } setShowConfirmMdp={ setShowConfirmMdp } />
        </div>
    );
}

function ConfirmMdp({ sendMdp, showConfirmMdp, setShowConfirmMdp }: any) {
    const [mdp, setMdp] = useState("");
    const [showMdpInfo, setShowMdpInfo] = useState("none"); // show if mdp.length < 8
    const [confirmation, setConfirmation] = useState(""); // mdp confirmation
    const [showConfirmationInfo, setShowConfirmationInfo] = useState("none"); // show if mdp != confirmation
    
    function checkMdp(mdp: string) {
        setMdp(mdp);

        (mdp.length < 8) // check mdp longer => 8 char farafahakeliny
            ? setShowMdpInfo("inline") 
            : setShowMdpInfo("none");

        ((mdp == confirmation) && (mdp.length >= 8))
            ? setShowConfirmationInfo("none") // HAHAHAH
            : ((mdp == confirmation) && (mdp.length < 8))
                ? setShowConfirmationInfo("none")
                : ((mdp != confirmation) && (mdp.length >= 8) && (confirmation.length >= 8))
                    ? setShowConfirmationInfo("inline")
                    : setShowConfirmationInfo("none");
    }

    function checkConfirmation(confirmation: string) {
        setConfirmation(confirmation);

        ((mdp == confirmation) && (mdp.length >= 8))
            ? setShowConfirmationInfo("none") // correct 
            : setShowConfirmationInfo("inline"); // display error message if mdp.length < 8 and mdp != confirmation
    }

    function isCorrect() {
        if((mdp == confirmation) && (mdp.length >= 8)) { // ampiasaina ny inverse i.e ra egale de false de ra !egale de true
            return false;
        }
        return true;
    }

    function validateForm() {
        // alert(`mdp = ${mdp} and confirm = ${confirmation}`);

        sendMdp(mdp); // joker ty

        // clear form
        setMdp("");
        setConfirmation("");
        
        // hide all error message
        setShowMdpInfo("none");
        setShowConfirmationInfo("none");
        
        // hide confirm form
        setShowConfirmMdp("none"); // manage ConfirmMdp component
    }

    function quitConfirmForm() {
        // alert("clicked = " + showConfirmMdp);
        setMdp("");
        setConfirmation("");
        setShowMdpInfo("none");
        setShowConfirmationInfo("none");
        setShowConfirmMdp("none"); // manage ConfirmMdp component
    }

    if(showConfirmMdp == "inline"){
        return (
            <div className="auth">
                <div className="form mdp">
                    <h3 style={ { textAlign: "center" } }>Finaliser l'inscription</h3>
                    <div className="form-group">
                        <label>Mots de passe</label>
                        <input type="password" className="form-control" maxLength={40} value={ mdp } onChange={ (e) => checkMdp(e.target.value) } placeholder="Mots de passe" />
                        <p style={ { color: "red", display: showMdpInfo } }><small>8 caractères au minimum</small></p>
                    </div>
                    <div className="form-group">
                        <label>Confirmer</label>
                        <input type="password" className="form-control" minLength={8} maxLength={40} value={ confirmation } onChange={ (e) => checkConfirmation(e.target.value) } placeholder="Confirmation" />
                        <p style={ { color: "red", display: showConfirmationInfo } }><small>Erreur de la confirmation</small></p>
                    </div>
                    <div className="form-group">
                        <input type="button" disabled={ isCorrect() } onClick={ () => validateForm() } className="form-control btn btn-primary" value={ "Valider" } style={ { marginTop: "8px" } } />
                    </div>
                    <div className="form-group">
                        <input type="button" onClick={ () => quitConfirmForm() } className="form-control btn cancel" value={ "Annuler" } style={ { marginTop: "8px" } } />
                    </div>
                    <div className="form-group">
                        {/* <p style={ { color: "green" } }><small>En validant vous pourrez effectuez des réservations</small></p> */}
                    </div>
                </div>
            </div>
        );
    }
}

function Connexion({ setShowConnexion, setCurrent, setDisplayUserStatus }: any) {
    const [mdp, setMdp] = useState("");
    const [telEmail, setTelEmail] = useState("");
    const [isCorrect, setIsCorrect] = useState({
        telEmail: "none",
        mdp: "none"
    });
    const [nope, setNope] = useState("none"); // not in the database

    const seConnecter = () => {
        const client = new Client();
        client.obtenirClientByTel(telEmail)
            .then((telFound) => { // if tel entered
                if(telFound.data.length > 0) {
                    const data = telFound.data;
                    for(const elem of data) {
                        if(elem.mdp == mdp) { // correct mdp with tel entered
                            // alert("Correct tel");
                            setIsCorrect({ telEmail: isCorrect.telEmail, mdp: "none" });
                            connect(elem);
                            break;
                        }else {
                            setIsCorrect({ telEmail: isCorrect.telEmail, mdp: "inline" });
                        }
                    }
                    setNope("none");
                }else {
                    client.obtenirClientByEmail(telEmail)
                        .then((emailFound) => { // if email entered
                            if(emailFound.data.length > 0) {
                                const data = emailFound.data;
                                for(const elem of data) {
                                    if(elem.mdp == mdp) { // correct mdp with email entered
                                        // alert("Correct email")// correct mdp with email entered
                                        setIsCorrect({ telEmail: isCorrect.telEmail, mdp: "none" });
                                        connect(elem);
                                        break;
                                    }else {
                                        setIsCorrect({ telEmail: isCorrect.telEmail, mdp: "inline" });
                                    }
                                }
                                setNope("none");
                            }else { // nope: sady tsy email no tel
                                setIsCorrect({ telEmail: "none", mdp: "none" }) // no email and no tel
                                setNope("inline");
                            }
                        })
                }
            })
    }

    function checkTelEmail(telEmail: string) {
        let correct:string = "";
        let n = telEmail.length;

        for(let i:number = 0; i < n; i++) {
            if((telEmail[i] == telEmail[i + 1]) && (telEmail[i + 1] == ' ')) {
                telEmail = telEmail.replace(telEmail[i], ' ');
            }else{
                correct += telEmail[i];
            }
        }
        setTelEmail(correct);
    }

    function connect(client: any) {
        let user = {
            "type": "client",
            "numeroClient": client.numeroClient,
            "isConnected": true
        }

        setMdp("");
        setTelEmail("");
        setDisplayUserStatus("block");
        setCurrent("Réservation");
        localStorage.setItem("user", JSON.stringify(user));
        window.location.replace("http://localhost:5173/reservation");
    }

    return (
        <div className="auth">
            <div className="form connexion">
                <p><button className="arrow" onClick={ () => setShowConnexion(false) }><i className="fa-solid fa-arrow-left"></i><small><i> S'inscrire</i></small></button></p>
                <h3 style={ { textAlign: "center" } }>Connexion</h3>
                <div className="form-group">
                    <label>Téléphone ou Adresse email</label>
                    <input type="text" value={ telEmail } onChange={ (e) => checkTelEmail(e.target.value) } className="form-control" placeholder="Numero téléphone ou email" />
                    <p style={ { padding: "8px", color: "red", display: isCorrect.telEmail } }><small>Introuvale</small></p>
                </div>
                <div className="form-group">
                    <label>Mots de passe</label>
                    <input type="password" value={ mdp } onChange={ (e) => setMdp(e.target.value) } className="form-control" placeholder="Mots de passe" />
                    <p style={ { color: "red", display: isCorrect.mdp } }><small>Mots de passe incorrectes</small></p>
                </div>
                <p style={ { padding: "8px", color: "red", display: nope } }><small>Compte introuvable !</small></p><br />
                <p style={ { padding: "8px", color: "red", display: nope } }><small>Vérifiez bien vos informations</small></p>
                <div className="form-group">
                    <input type="button" onClick={ seConnecter } disabled={
                        ((mdp == '') || (telEmail == ''))
                            ? true
                            : false
                        } className="form-control btn btn-primary" style={ { marginTop: "8px" } } value={ "Se connecter" } />
                </div>
            </div>
        </div>
    );
}
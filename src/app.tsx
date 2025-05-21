import Accueil from "./pages/accueil";
import Reservation from "./pages/reservation";
import Contact from "./pages/contact";
import Auth from "./pages/auth";
import "./styles/color.scss";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import { useEffect, useState } from "react";

export default function App() {
    const [current, setCurrent] = useState("Accueil");
    const [displayUserStatus, setDisplayUserStatus] = useState("none");
    const [displayUserIcon, setDisplayUserIcon] = useState("none");
    const [showDeconnecterModal, setShowDeconnecterModal] = useState("none");
    
    /**
     * onpopstate: to detect go forward() and back() history event
     */
    window.onpopstate = () => {
        setCurrentPageDisplayer(window.location.pathname);
    }

    useEffect(() => {
        setCurrentPageDisplayer(window.location.pathname);
    }, [current])

    /**
     * change current menu displayer
     */
    function setCurrentPageDisplayer(pathname: any) {
        if(pathname == "/") {
            setCurrent("Accueil");
        }else if(pathname == "/reservation") {
            setCurrent("Réservation");
        }else if(pathname == "/contact") {
            setCurrent("Contact");
        }else {
            setCurrent("Connexion");
        }
    }

    useEffect(() => {
        let user: any = localStorage.getItem("user");
        if((user != null) && (JSON.parse(user).isConnected == true)) {
            setDisplayUserStatus("block");
        }else {
            setDisplayUserStatus("none");
        }
    }, [displayUserStatus])

    useEffect(() => {
        setInterval(() => {
            let user: any = localStorage.getItem("user");
            if((user != null) && (JSON.parse(user).isConnected == true)) {
                setDisplayUserIcon("block");
            }else {
                setDisplayUserIcon("none");
            }
        }, 1000)
    }, [displayUserIcon])

    function seDeconnecter() {
        setShowDeconnecterModal("block");
    }

    return (
        <BrowserRouter>
            <div className="header">
                <div className="logo"><i className="fa-solid fa-hotel"></i><span> HOTEL</span></div>
                <div className="right-side">
                    <div className="status" style={ { display: displayUserIcon } }>
                        <button className="btn btn-user">T</button>
                    </div>
                    <div className="menu">
                        <div className="menu-btn">
                            <div className="current">{ current }</div>
                            <button><i className="fa-solid fa-navicon"></i></button>
                        </div>
                        <div className="nav-menu">
                            <li><Link to={ "/" } className="link" onClick={ () => setCurrent("Accueil") }><i className="fa-solid fa-home"></i>Accueil</Link></li>
                            <li><Link to={ "/reservation" } className="link" onClick={ () => setCurrent("Réservation") }><i className="fa-solid fa-calendar"></i>Réservation</Link></li>
                            <li><Link to={ "/contact" } className="link" onClick={ () => setCurrent("Contact") }><i className="fa-solid fa-phone"></i>Contact</Link></li>
                            <li className="sign-btn" style={ { display: displayUserStatus == "block" ? "none" : "block" } }><Link to={ "/auth" } className="link" onClick={ () => setCurrent("Connexion") }><i className="fa-solid fa-sign-in"></i>Se connecter</Link></li>
                            <li className="sign-btn" style={ { display: displayUserStatus } }><Link to={ "?" } className="link" onClick={ () => seDeconnecter() }><i className="fa-solid fa-sign-out"></i>Se déconnecter</Link></li>
                        </div>
                    </div>
                </div>
            </div>

            <div className="deconnecter-field" style={ { display: showDeconnecterModal } }>
                <Deconnecter setShowDeconnecterModal={ setShowDeconnecterModal } setDisplayUserStatus={ setDisplayUserStatus } />
            </div>
            <div className="main">
                <Routes>
                    <Route path="/" element={ <Accueil setCurrent={ setCurrent } /> } />
                    <Route path="/reservation" element={ <Reservation /> } />
                    <Route path="/contact" element={ <Contact /> } />
                    <Route path="/auth" element={ <Auth setCurrent={ setCurrent } setDisplayUserStatus={ setDisplayUserStatus } /> } />
                </Routes>
            </div>
            <div className="footer">
                <div className="white-space">

                </div>
                <div className="main-footer">

                </div>
            </div>
        </BrowserRouter>
    );
}

function Deconnecter({ setShowDeconnecterModal, setDisplayUserStatus }: any) {
    function confirmer() {
        localStorage.clear();
        setShowDeconnecterModal("none");
        setDisplayUserStatus("none");
    }

    return (
        <div className="deconnecter">
            <div className="deconnecter-modal">
                <div className="modal-icon"><i className="fa-solid fa-sign-out"></i></div>
                <div className="head">
                    <h4>Déconnexion</h4>
                </div>
                <div className="body">
                    <p>Est-ce que vous voulez déconnecter?</p>
                </div>
                <div className="footer">
                    <button className="btn annuler" onClick={ () => setShowDeconnecterModal("none") }><i className="fa-solid fa-cancel"></i></button>
                    <button className="btn confirmer" onClick={ confirmer }><i className="fa-solid fa-sign-out"></i></button>
                </div>
            </div>
        </div>
    );
}
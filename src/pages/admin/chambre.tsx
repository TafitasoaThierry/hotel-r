import { useEffect, useState } from "react";
import "../../styles/admin.chambre.scss";
import ChambreObj from "../../fetch/chambre";

export default function Chambre() {
    const [chambre, setChambre] = useState({
        total: 0,
        libre: 0,
        occupe: 0
    });
    const [listeChambre, setListeChambre] = useState([]);
    const [showAddChambreModal, setShowAddChambreModal] = useState(false);

    useEffect(() => {
        const chambre = new ChambreObj();
        chambre.obtenirListeChambre()
        .then((response) => {
            setListeChambre(response.data);
        })
        
        setInterval(() => {
            chambre.obtenirListeChambre()
            .then((response) => {
                setListeChambre(response.data);
            })
        }, 1000)
    }, [])

    useEffect(() => {
        setChambre({
            total: listeChambre.length,
            libre: listeChambre.filter((c: any) => c.status == "libre").length,
            occupe: listeChambre.filter((c: any) => c.status == "occupe").length
        })
    }, [listeChambre])

    return (
        <div className="chambre-container">
            <div className="counter">
                <div className="box total">
                    <h2>Total</h2>
                    <h1>{chambre.total}</h1>
                </div>
                <div className="box libre">
                    <h2>Libre</h2>
                    <h1>{chambre.libre}</h1>
                </div>
                <div className="box occupe">
                    <h2>Occupée</h2>
                    <h1>{chambre.occupe}</h1>
                </div>
            </div>
            <div className="box-container">
                { listeChambre.map((item: any) => <ListeChambre key={item.numero} chambre={item} />) }
            </div>
            <div className="ajouter" onClick={() => setShowAddChambreModal(true)}>
                <i className="fa-solid fa-add"></i>
            </div>
            <AjouterChambre showAddChambreModal={showAddChambreModal} setShowAddChambreModal={setShowAddChambreModal} listeChambre={listeChambre}/>
        </div>
    );
}

function ListeChambre ({chambre}: any) {
    return (
        <div className="box">
            <h5>{chambre.numero}</h5>
            <p>{chambre.status}</p>
            <p>{chambre.type}</p>
        </div>
    );
}

function AjouterChambre({showAddChambreModal, setShowAddChambreModal, listeChambre}: any) {
    const [chambre, setChambre] = useState({
        numero: "",
        type: "classique",
        status: "libre",
        prix: 0
    });
    const [isDuplicated, setIsDuplicated] = useState(false);

    function check(numeroChambre: string) {
        setChambre(prev => {
            return { ...prev, numero: numeroChambre }
        })
        for(let c of listeChambre) {
            if(c.numero == numeroChambre) {
                setIsDuplicated(true);
                return true;
            }
        }
        setIsDuplicated(false);
        return false;
    }

    function annuler() {
        setShowAddChambreModal(false);
        clear();
    }

    function valider() {
        const newChambre = new ChambreObj();
        newChambre.ajouterChambre(chambre)
        .then((response) => {
            console.log("Chambre avec status " + response.status);
            setShowAddChambreModal(false);
            clear();
        })
        // console.log(chambre);
    }
    
    function clear() {
        setChambre({
            numero: "",
            type: "classique",
            status: "libre",
            prix: 0
        })
    }
    return (
        <div className="form-container" style={{ display: showAddChambreModal == true ? "flex" : "none" }}>
            <div className="form">
                <div className="form-group">
                    <label>Numero de chambre</label>
                    <input type="text" value={chambre.numero} onChange={(e) => check(e.target.value)} maxLength={4} placeholder="Numero de chambre" className="form-control"/>
                    <p style={{ color: "red", display: isDuplicated ? "inline" : "none" }}><small>Chambre existe déjà</small></p>
                </div>
                <div className="form-group">
                    <label>Type de chambre</label>
                    <select name="type" className="form-control" onChange={(e) => setChambre(
                        prev => { return { ...prev, type: e.target.value} }
                    )}>
                        <option value="classique">Classique</option>
                        <option value="vip">VIP</option>
                    </select>
                </div>
                <div className="form-group">
                    <button onClick={valider} disabled={(chambre.numero == "" || isDuplicated) ? true : false} className="form-control btn btn-primary"><i className="fa-solid fa-add"></i> Ajouter</button>
                </div>
                <div className="form-group">
                    <button onClick={annuler} className="form-control btn cancel"><i className="fa-solid fa-cancel"></i> Annuler</button>
                </div>
            </div>
        </div>
    )
}
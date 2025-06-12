import { useEffect, useState } from "react";
import "../../styles/admin.chambre.scss";
import "../../styles/admin.dashboard.scss";
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
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    function supprimer() {
        setShowDeleteModal(true);
    }

    return (
        <div className="box">
            <h5 className="numeroChambre">{chambre.numero}</h5>
            <p>{ chambre.status == "libre" ? <i className="fa-solid fa-unlock"></i> : <i className="fa-solid fa-lock"></i> } {chambre.status}</p>
            <p>{chambre.type}</p>
            <button className="btn delete-chambre" onClick={() => supprimer()}><i className="fa-solid fa-trash"></i></button>
            <button className="btn update-chambre"><i className="fa-solid fa-edit"></i></button>
            <ConfirmDelete
                numero={chambre.numero}
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
            />
        </div>
    );
}

function ConfirmDelete({numero, showDeleteModal, setShowDeleteModal} : any) {
    const remove = () => {
        const chambre = new ChambreObj();
        chambre.supprimerChambre(numero)
        .then((response) => console.log(response.data))
        setShowDeleteModal(false);
    }

    return (
        <div className="confirm-delete" style={{ display: showDeleteModal == true ? "flex" : "none" }}>
            <div className="delete-modal">
                <i className="fa-solid fa-trash delete-modal-icon"></i>
                <h4>Supprimer une chambre</h4>
                <p>La suppression est irréversible</p>
                <p>Chambre {numero}</p>
                <div className="control-btn">
                    <button className="btn cancel-btn" onClick={() => setShowDeleteModal(false)}><i className="fa-solid fa-cancel"></i> Annuler</button>
                    <button className="btn delete-btn" onClick={remove}><i className="fa-solid fa-trash"></i> Supprimer</button>
                </div>
            </div>
        </div>
    );
}

function AjouterChambre({showAddChambreModal, setShowAddChambreModal, listeChambre}: any) {
    const [chambre, setChambre] = useState({
        numero: "",
        type: "Classique",
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
                <h3 style={{ textAlign: "center", padding: "16px" }}>Ajouter une chambre</h3>
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
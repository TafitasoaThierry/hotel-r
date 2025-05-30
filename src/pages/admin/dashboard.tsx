export default function Dashboard() {
    return (
        <div className="dashboard">
            <div><Reservation /></div>
            <div><Histogramme /></div>
        </div>
    );
}

function Reservation() {
    return (
        <div className="reservation-container">
            <div className="box">
                <div className="box-item">
                    <h5>Nouvelle réservation</h5>
                    <h1><i className="fa-solid fa-history"></i> 12</h1>
                </div>
                <div className="box-item">
                    <h5>Total réservation</h5>
                    <h1><i className="fa-solid fa-total"></i> 2312</h1>
                </div>
                <div className="box-item">
                    <h5>Recette de ce mois</h5>
                    <h1><i className="fa-solid fa-entry"></i> 123000</h1>
                </div>
            </div>
            <h1>Reservation</h1>
        </div>
    );
}

function Histogramme() {
    return (
        <h1>Histogramme</h1>
    );
}
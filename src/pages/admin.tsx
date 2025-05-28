import { BrowserRouter, Route, Routes, Link } from "react-router";

function Menu() {
    return (
        <div className="menu">
            <li><Link to={"/"}>Dashboard</Link></li>
            <li><Link to={"/admin/client"}>Client</Link></li>
            <li><Link to={"/admin/chambre"}>Chambre</Link></li>
        </div>
    );
}

function Admin() {
    return (
        <div className="admin">
            <h1>Admin menu</h1>
            <Menu />
        </div>
    );
}

function Dashboard() {
    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <Reservation />
        </div>
    );
}

function Reservation() {
    return (
        <div className="reservation">
            <h1>Reservation List</h1>
        </div>
    );
}

function Client() {
    return (
        <div className="client">
            <h1>Listes client</h1>
        </div>
    );
}

function Chambre() {
    return (
        <div className="chambre">
            <h1>Chambre</h1>
        </div>
    );
}

export default Admin;
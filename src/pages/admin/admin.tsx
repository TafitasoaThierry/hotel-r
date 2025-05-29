import { Link, Outlet } from "react-router";
import "../../styles/admin.global.scss";

function Menu() {
    return (
        <div className="menu">
            <li><Link to={"/admin"} className="link"><i className="fa-solid fa-line-chart"></i> Dashboard</Link></li>
            <li><Link to={"/admin/client"} className="link"><i className="fa-solid fa-user"></i> Client</Link></li>
            <li><Link to={"/admin/chambre"} className="link"><i className="fa-solid fa-room"></i> Chambre</Link></li>
        </div>
    );
}

function Admin() {
    return (
        <div className="admin">
            <div className="menu-container"><Menu /></div>
            <div className="content-container"><Outlet /></div>
        </div>
    );
}

export default Admin;
import { Link, Outlet } from "react-router";
import "../../styles/admin.global.scss";

function Menu() {
    return (
        <div className="dashboard-menu">
            <div className="user-icon"><i className="fa-solid fa-user"></i></div>
            <Link to={"/admin"} className="link"><i className="fa-solid fa-line-chart"></i> Tableau de bord</Link>
            <Link to={"/admin/client"} className="link"><i className="fa-solid fa-user"></i> Client</Link>
            <Link to={"/admin/chambre"} className="link"><i className="fa-solid fa-hotel"></i> Chambre</Link>
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
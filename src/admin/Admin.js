import { Link, Outlet } from "react-router-dom";

function Admin() {
    return <div className="container-fluid" style={{ backgroundColor: "lightblue" }}>
        <br></br>
        <div className="row">
            <div className="col-sm-3">
                <div className="navbar navbar-expand-sm navbar-light bg-light">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to={"/admin/newdoctor"}>Add Doctor</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/admin/showdoctors"}>Show Doctors</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <br></br>
        <Outlet></Outlet>
        <br></br>
    </div>
}

export default Admin;
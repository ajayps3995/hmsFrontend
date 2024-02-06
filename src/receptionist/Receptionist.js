import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
function Receptionist(){
    return <div className="container fluid">
        <div className="row">
            <div className="col-sm-6">
                <div className="navbar navbar-expand-sm navbar-light bg-light">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to={"/receptionist/appointment"}>Show Appointments</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <br></br>
        <Outlet></Outlet>
    </div>
}
export default Receptionist;
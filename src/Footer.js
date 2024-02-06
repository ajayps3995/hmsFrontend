import { Link } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css"

function Footer() {
    return <div className="container-fluid" style={{ backgroundColor: "#212529" }}>
        <div className="row">
            <div className="col-sm-4">
                <div className="container">
                    <footer className="py-5">
                        <div className="row">
                            <div className="col-2">
                                <h5 style={{color:"white"}}>Section</h5>
                                <ul className="nav flex-column">
                                    <li className="nav-item mb-2">
                                        <Link className="nav-link p-0 text-muted" to={"/"} style={{ color: "black" }}>Home</Link>
                                    </li>
                                    <li className="nav-item mb-2">
                                        <Link className="nav-link p-0 text-muted" to={"/about"} style={{ color: "black" }}>About</Link>
                                    </li>
                                    <li className="nav-item mb-2">
                                        <Link className="nav-link p-0 text-muted" to={"/contact"} style={{ color: "black" }}>Contact</Link>
                                    </li>
                                    <li className="nav-item mb-2">
                                        <Link className="nav-link p-0 text-muted" to={"/Department"} style={{ color: "black" }}>Department</Link>
                                    </li>
                                    <li className="nav-item mb-2" >
                                        <Link className="nav-link p-0 text-muted" to={"/login"} style={{ color: "black" }}>Login</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>

        </div>
    </div>
}

export default Footer;
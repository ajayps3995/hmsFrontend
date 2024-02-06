import logo from "./images/logo1.jpg";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { useNavigate } from "react-router-dom";
import DropDown from "./Dropdown";
function Header() {

    var loggedIn = false;
    if (sessionStorage.getItem("isLoggedIn") != null) {
        loggedIn = true;
    }
    const navigate = useNavigate()
    var logout = ()=>{
        sessionStorage.clear();
        navigate("/");
    }

    return <div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-2">
                    <figure>
                        <img src={logo} alt="Logo" style={{ height: "80px", width: "125px" }}></img>
                    </figure>
                </div>
                <div className="col">
                    <ul className="nav justify-content-end" style={{ paddingTop: "50px",paddingRight:"15px"}}>
                        <Navbar expand="lg">
                            <Container>
                                
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="me-auto">
                                        <Nav.Link href="/">Home</Nav.Link>
                                        <Nav.Link href="/about">About Us</Nav.Link>
                                        <Nav.Link href="/contact">Contact Us</Nav.Link>
                                        {loggedIn?<NavDropdown title={"Hello"+" "+sessionStorage.getItem("username")} id="basic-nav-dropdown">
                                            <DropDown/>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item onClick={logout}>
                                                Logout
                                            </NavDropdown.Item>
                                        </NavDropdown>:<Nav.Link href="/login">Login</Nav.Link>}
                                        
                                    </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                      </ul> 
                </div>
                <hr></hr>
            </div>
        </div>
    </div>
}



export default Header;
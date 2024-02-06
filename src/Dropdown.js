
import NavDropdown from 'react-bootstrap/NavDropdown';

function DropDown() {
    if (sessionStorage.getItem("role") == "PATIENT") {
        return <div>
            <NavDropdown.Item href="/patient/profile">Profile</NavDropdown.Item>
            <NavDropdown.Item href="/patient/appointment">
                Appointments
            </NavDropdown.Item>
            <NavDropdown.Item href="/patient/bill">
                Bills
            </NavDropdown.Item>
            <NavDropdown.Item href="/patient/prescription">Prescriptions</NavDropdown.Item>
        </div>
    }else if(sessionStorage.getItem("role") == "DOCTOR"){
        return <div>
            <NavDropdown.Item href="/doctor/profile">Profile</NavDropdown.Item>
            <NavDropdown.Item href="/doctor/appointment">
                Appointments
            </NavDropdown.Item>
            <NavDropdown.Item href="/doctor/prescription">
                Prescriptions
            </NavDropdown.Item>
        </div>
    }else if(sessionStorage.getItem("role") == "ADMIN"){
        return <div>
            <NavDropdown.Item href="/admin/newdoctor">Add Doctor</NavDropdown.Item>
            <NavDropdown.Item href="/admin/showdoctors">
                Show Doctors
            </NavDropdown.Item>
            {/* <NavDropdown.Item href="/doctor/prescription">
                Prescriptions
            </NavDropdown.Item> */}
        </div>
    }else{
        return <div>
        <NavDropdown.Item href="/receptionist/appointment">Show Appointments</NavDropdown.Item>
        {/* <NavDropdown.Item href="/doctor/prescription">
            Prescriptions
        </NavDropdown.Item> */}
    </div>
    }
}

export default DropDown;
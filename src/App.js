import Header from "./Header";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Patient from "./patient/Patient";
import Login from "./Login";
import Footer from "./Footer";
import PatientProfile from "./patient/PatientProfile";
import PatientAppointment from "./patient/Appointments";
import PatientPrescription from "./patient/Prescriptions";
import Register from "./Register";
import BookAppointment from "./patient/BookAppointment";
import ProtectedRoute from "./ProtectedRoute";
import Doctor from "./doctor/Doctor";
import DoctorProfile from "./doctor/DoctorProfile";
import DoctorAppointment from "./doctor/Appointments";
import DoctorPrescription from "./doctor/Prescriptions";
import Admin from "./admin/Admin";
import ShowDoctor from "./admin/ShowDoctors";
import NewDoctor from "./admin/NewDoctor.js";
import EditDoctor from "./admin/EditDoctor";
import PatientBill from "./patient/Bills";
import ReceptionistAppointment from "./receptionist/Appointments";
import ReceptionistBill from "./receptionist/Bill";
import Receptionist from "./receptionist/Receptionist";
import Billgeneration from "./receptionist/BillGeneration";
import Payment from "./patient/Payment";
import Failure from "./patient/Failure";
import Success from "./patient/Success";
import AddPrescription from "./doctor/AddPrescription";
import Prescriptiondetails from "./Prescriptiondetails";
function App() {
    return <div>
        <Header></Header>
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/appointment" element={<ProtectedRoute />}>
                <Route path="" element={<BookAppointment />} />
            </Route>
            <Route path="/success" element={<ProtectedRoute />}>
                <Route path="" element={<Success />} />
            </Route>

            <Route path="/failure" element={<ProtectedRoute />}>
                <Route path="" element={<Failure />} />
            </Route>

            <Route path="/doctor" element={<ProtectedRoute />}>
                <Route path="" element={<Doctor />}>
                    <Route path="" element={<DoctorProfile />} />
                    <Route path="profile" element={<DoctorProfile />} />
                    <Route path="appointment" element={<DoctorAppointment />} />
                    <Route path="prescription" element={<DoctorPrescription />} />
                    <Route path="addprescription" element={<AddPrescription/>}/>
                </Route>
            </Route>

            <Route path="/admin" element={<ProtectedRoute />}>
                <Route path="" element={<Admin />}>
                    <Route path="showdoctors" element={<ShowDoctor />} />
                    <Route path="newdoctor" element={<NewDoctor/>}/>
                    <Route path="addservice" element={<DoctorPrescription />} />
                </Route>
            </Route>
            <Route path="/editdoctor" element={<ProtectedRoute/>}>
                <Route path="" element={<EditDoctor/>}>

                </Route>
            </Route>

            <Route path="/patient" element={<ProtectedRoute />}>
                <Route path="" element={<Patient />}>
                    <Route path="" element={<PatientProfile />} />
                    <Route path="profile" element={<PatientProfile />} />
                    <Route path="appointment" element={<PatientAppointment />} />
                    <Route path="prescription" element={<PatientPrescription />} />
                    <Route path="bill" element={<PatientBill />} />
                    <Route path="billGeneration" element={<Billgeneration/>}/>
                </Route>
            </Route>
            <Route path="/payment" element={<ProtectedRoute/>}>
                <Route path="" element={<Payment/>}/>
            </Route>
            <Route path="/prescriptiondetails" element={<ProtectedRoute/>}>
                <Route path="" element={<Prescriptiondetails/>}/>
            </Route>
            <Route path="/receptionist" element={<ProtectedRoute />}>
                <Route path="" element={<Receptionist/>}>
                    <Route path="bill" element={<ReceptionistBill />} />
                    <Route path="appointment" element={<ReceptionistAppointment />} />
                </Route>
            </Route>
        </Routes>
        <Footer></Footer>
    </div>
}

export default App;
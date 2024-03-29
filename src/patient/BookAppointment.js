import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import book from "../images/book.png";
function BookAppointment() {

    var [details, setDetails] = useState({ p_id: "", d_id: "", specialization: "", appoint: "" })
    var [appointdate,setAppointdate]=useState("");
    var [departments, setDepartments] = useState([]);
    var [doctors, setDoctors] = useState([]);
    var [message, setMessage] = useState("");
    const nav = useNavigate();
    useEffect(() => {
        setDetails({ ...details, p_id: sessionStorage.getItem("id") })
        axios.get("http://localhost:8080/appointment/getdept", {

        }).then((response) => {
            setDepartments([...response.data]);
        })
    }, [])

    var handleChange = (args) => {
        debugger;
        if (args.target.name == "appoint") {
            setAppointdate(args.target.value);
            var date = "";
            date = args.target.value;
            var newdate = date.substring(0, 10) +" "+date.substring(11, 16)
            var newDetails={...details}
            newDetails[args.target.name]=newdate
            setDetails(newDetails);
        }
        else {
            var newDetails = { ...details };
            newDetails[args.target.name] = args.target.value
            setDetails(newDetails);
            if (args.target.name == "specialization" && args.target.value != "default") {
                axios.get(`http://localhost:8080/doctor/doctors/${args.target.value}`, {

                }).then((response) => {
                    setDoctors(response.data);
                })


            }

        }

    }


    var handleSubmit = () => {
        axios({
            method: 'post',
            url: 'http://localhost:8080/appointment/book',
            data: details
        })
            .then(function (response) {
                console.log(response.data);
                if(response.data=="Appointment Booked"){
                    setMessage(" Appointment Booked!!! Redirecting to profile shortly...");
                    window.setTimeout(()=>{
                        nav("/patient/profile")
                    },4000);
                }

            })
            .catch(function (error) {
                console.log(error);
            })

    }

    return <div className="container-fluid" style={{ backgroundColor: "lightblue" }}>
        <div className="row justify-content-center">
            <div className="col-sm-6" style={{ marginTop: "40px" }}>
                <div className="card ">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="card-body">
                                <div className="card-title">
                                    <h5>Book An Appointment</h5>
                                </div>
                                <br></br>
                                <div className="row">
                                    <div className="col-sm-10">
                                        <div className="form-group">
                                            <p className="form-label">Department</p>
                                            <select className="form-select" aria-label="Default select example" name="specialization" value={details.specialization} onChange={handleChange}>
                                                <option value={"default"}>
                                                    Select Department
                                                </option>
                                                {

                                                    departments.map(dept => {
                                                        return <option value={dept.id} key={dept.id}>
                                                            {dept.department}
                                                        </option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <br></br>
                                <div className="row">
                                    <div className="col-sm-10">
                                        <div className="form-group">
                                            <p className="form-label">Doctor</p>
                                            <select className="form-select" aria-label="Default select example" name="d_id" value={details.d_id} onChange={handleChange}>
                                                <option value={"default"}>
                                                    Select Doctor
                                                </option>
                                                {
                                                    doctors.map(doctor => {
                                                        return <option value={doctor.id} key={doctor.id}>
                                                            {doctor.name}
                                                        </option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <br></br>
                                <div className="row">
                                    <div className="col-sm-10">
                                        <div className="form-group">
                                            <p className="form-label">Appointment Date</p>
                                            <input type={"datetime-local"} name={"appoint"} value={appointdate} onChange={handleChange} className={"input-group date"} />
                                        </div>
                                    </div>
                                </div>
                                <br></br>
                                <div className="row justify-content-center">
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <input type={"button"} value={"Book"} onClick={handleSubmit} className={"btn btn-primary"} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-4">
                                       <p>{message}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <img src={book} style={{ height: "100%", width: "100%" }}></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br></br>
    </div>
}

export default BookAppointment;
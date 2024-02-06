import axios from 'axios'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function DoctorAppointment() {
    var [appointments, setAppointments] = useState([]);
    var [status,setStatus] = useState("");
    var navigate = useNavigate()
    useEffect(() => {
        fetchData();
    }, [])

    var fetchData = () => {
        console.log(1);
        axios.get(`http://localhost:8080/doctor/appointments/${sessionStorage.getItem("id")}`, {
        }).then((response) => {
            console.log(response)
            setAppointments(response.data);
        })
    }

    var confirm = (id)=>{
        axios.put(`http://localhost:8080/appointment/confirm/${id}`).then((response)=>{
            if(response.data=="Appointment Confirmed")
            fetchData();
        })
    }

    var attended = (id)=>{
        axios.put(`http://localhost:8080/appointment/attended/${id}`).then((response)=>{
            if(response.data=="Appointment Status Done")
            fetchData();
        })
    }

    var cancel = (id)=>{
        axios.put(`http://localhost:8080/appointment/cancel/${id}`).then((response)=>{
            if(response.data=="Appointment Cancelled")
            fetchData();
        })
    }

    var createprescription = (pid,a_id)=>{
        sessionStorage.setItem("patientid",pid);
        sessionStorage.setItem("appointmentid",a_id);
        navigate("/doctor/addprescription");

    }

    return <div className="container">
        <div className="card" style={{ boxShadow: "0px 0px 5px grey" }}>

            <div className="card-body">
                <h4 className="card-title">
                    Appointments
                </h4>
                <div>
                    <br></br>
                    {console.log(appointments)}
                    <div className="table table-table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <td>
                                       Appt Id
                                    </td>
                                    <td>
                                        Patient
                                    </td>
                                    <td>
                                        Appointment Date
                                    </td>
                                    <td>
                                        Status
                                    </td>
                                    <td>
                                        Action
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    appointments.map((appointment) => {
                                        return <tr key={appointment.id}>
                                            <td>
                                                {appointment.id}
                                            </td>
                                            <td>
                                                {appointment.patientname}
                                            </td>
                                            <td>
                                                {appointment.appoint.substring(0, 10) + ' ' + appointment.appoint.substring(11, 16)}
                                            </td>
                                            <td>
                                                {appointment.status}
                                            </td>
                                            <td>
                                            
                                                {
                                                    appointment.status=="ATTENDED" || appointment.status=="CANCELLED" || appointment.status=="CONFIRMED" || appointment.status=="ATTENDED_AND_BILL_GENERATED" || appointment.status=="ATTENDED_AND_PRESCRIP"?"-" :<input type={"button"} value={"Confirm"} className='btn btn-primary' onClick={()=>{
                                                        confirm(appointment.id)
                                                    }}></input>
                                                }
                                                {"  "}
                                                {
                                                    appointment.status=="CONFIRMED"?<input type={"button"} value={"Attended"} className='btn btn-primary' onClick={()=>{
                                                        attended(appointment.id)
                                                    }}></input>:"-"
                                                }
                                                {"  "}
                                                {
                                                    appointment.status=="ATTENDED" || appointment.status=="CANCELLED" || appointment.status=="ATTENDED_AND_BILL_GENERATED" || appointment.status=="ATTENDED_AND_PRESCRIP" ?"-" :<input type={"button"} value={"Cancel"} className='btn btn-danger' onClick={()=>{
                                                        cancel(appointment.id)
                                                    }}></input>
                                                }
                                                {"  "}
                                                {
                                                    appointment.status=="ATTENDED" ?<input type={"button"} value={"Create"} className='btn btn-danger' onClick={()=>{
                                                        createprescription(appointment.pid,appointment.id)
                                                    }}></input> : '-'
                                                }
                                            </td>
                                        </tr>


                                    })}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    </div>
}

export default DoctorAppointment;
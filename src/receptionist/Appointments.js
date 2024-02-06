import axios from 'axios'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ReceptionistAppointment() {
    var [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetchData();
    }, [])

    var fetchData = () => {
        console.log(1);
        axios.get(`http://localhost:8080/appointment/getAttended`, {
        }).then((response) => {
            console.log(response)
            setAppointments(response.data);
        })
    }

    var generate = (pid,id)=>{
        sessionStorage.setItem("apptid",id)
        sessionStorage.setItem("patientid",pid);
        navigate("/receptionist/bill");
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
                                       Doctor
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
                                                {appointment.doctorname}
                                            </td>
                                            <td>
                                                {appointment.status}
                                            </td>
                                            <td>
                                            
                                                <input type={"button"} value={"Generate Bill"} className='btn btn-primary' onClick={()=>{
                                                        generate(appointment.pid,appointment.id)
                                                    }}></input>
                                                
                
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

export default ReceptionistAppointment;
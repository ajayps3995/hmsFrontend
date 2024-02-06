import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
function ShowDoctor() {
    var [doctors, setDoctors] = useState([]);
    var navigate = useNavigate();
    useEffect(() => {
        fetchData();
    }, [])

    var fetchData=()=>{
        axios.get("http://localhost:8080/doctor/showall").then((response) => {
            setDoctors(response.data)
        })
    }

    var editDoctor = (args) => {
        sessionStorage.setItem("docid",args)
        navigate("/editdoctor")
    }

    var deleteDoctor = (args) => {
        axios.delete("http://localhost:8080/user/delete",{
            params:{
                id : args
            }
        }).then((response)=>{
            if(response.data=="User Deleted"){
                fetchData();
            }
        })
    }

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-sm-8">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title"><h5>Doctors</h5></div>
                            <div className="table table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <td className="col-sm-4">Doctor Id</td>
                                            <td className="col-sm-4">Doctor Name</td>
                                            <td className="col-sm-4">Action</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            doctors.map(doctor => {
                                                return <tr key={doctor.id}>
                                                    <td>{doctor.id}</td>
                                                    <td>{doctor.name}</td>
                                                    <td><input type={"button"} onClick={() => {
                                                        editDoctor(doctor.id)
                                                    }} className="btn btn-warning" value={"Edit"}></input>{"  "}
                                                        <input type={"button"} onClick={() => {
                                                            deleteDoctor(doctor.user_id)
                                                        }} className="btn btn-danger" value={"Delete"}></input></td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
        </div>
    )
}

export default ShowDoctor;
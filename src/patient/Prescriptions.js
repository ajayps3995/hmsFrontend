import { useState, useEffect, axios } from "react";
import'../../node_modules/bootstrap/dist/css/bootstrap.css';
import { useNavigate } from "react-router-dom";


function PatientPrescription()
{
    //var [userId, setUserId] =useState();
    var [prescriptions, setPrescriptions]=useState([]);
    //var [details, setDetails]=useState({id:0,m_name:"",dosage:"",duration:"",quantity:""})
    //debugger;
    var navigate=useNavigate();


    useEffect(()=>{
        fetchData();
    },[])
    
    var fetchData=()=>{
        fetch(`http://localhost:8080/prescription/show/${sessionStorage.getItem("id")}`)
        .then((data)=>{return data.json()})
        .then((result)=>{
            console.log(result);           
            setPrescriptions(result);
        })
    }

    var show = (id)=>{
        console.log(id);
        sessionStorage.setItem("prescriptionId",id)
        navigate('/prescriptiondetails')
    }

    
    return  <div>
    <div className='card' style={{ boxShadow: "0px 0px 5px grey" }}>
        <div className='card-body'>
            <div className='row'>
                <div className='col'>
                    <h3 className='card-title'>Prescription Details</h3>
                </div>
            </div>
            <hr></hr>
            <div className="table table-table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <td>
                                        Id
                                    </td>
                                    <td>
                                        Doctor
                                    </td>
                                    <td>
                                        Date
                                    </td>
                                    <td>
                                        Show
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    prescriptions.map((p) => {
                                        return <tr key={p.id}>
                                            <td>
                                                {p.id}
                                            </td>
                                            <td>
                                                {p.d_name}
                                            </td>
                                            <td>
                                                {p.date}
                                            </td>
                                            <td>
                                            <input type={"button"} value={"Show"} className='btn btn-primary' onClick={()=>{
                                                        show(p.id)
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





}

export default PatientPrescription;

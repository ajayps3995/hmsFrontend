import { useState, useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function AddPrescription() {
    var [medicines, setMedicines] = useState([])
    var [medicine, setMedicine] = useState({ m_id: 0, dosage: "", duration: "", qtantiy: 0 })
    var [displaydetails,setDisplaydetails] = useState([])
    var [message,setMessage]=useState("");
    var [details,setDetails]=useState({doc_id:0,p_id:0,prescriptiondetails:[]})

    const navigate = useNavigate();
    var handleChange = (args) => {
        var newmedicine = { ...medicine };
        newmedicine[args.target.name] = args.target.value
        setMedicine({ ...newmedicine });
    }

    useEffect(() => {
        setDetails({...details,doc_id:sessionStorage.getItem("id"),p_id:sessionStorage.getItem("patientid")});
        axios.get("http://localhost:8080/prescription/getmedicines").then((response) => {
            console.log(response.data);
            setMedicines(response.data);
        })
    }, [])

    var add = () => {
        var medname=""
        medicines.map((med)=>{
            
            if(med.id==medicine.m_id)
                medname=med.name;
        })
        var newMeddetails = [...details.prescriptiondetails];
        var newDisplayDetails = [...displaydetails];
        newDisplayDetails.push({...medicine,name:medname});
        newMeddetails.push(medicine);
        setDetails({...details,prescriptiondetails:newMeddetails});
        setDisplaydetails(newDisplayDetails);
        setMedicine({...medicine,m_id: 0, dosage: "", duration: "", qtantiy: 0})
    }

var remove=(args)=>{
    var meddetails = [...details.prescriptiondetails];
    var filteredMedetails = meddetails.filter((med)=>{
        return med.m_id!=args;
    })
    var filteredDisplaydetails = displaydetails.filter((med)=>{
        return med.m_id!=args;
    })

    setDetails({...details,prescriptiondetails:filteredDisplaydetails});
    setDisplaydetails(filteredDisplaydetails);
}

var create = ()=>{
    axios("http://localhost:8080/prescription/add",{
        method:"POST",
        params:{
            apptid:parseInt(sessionStorage.getItem("appointmentid"))
        },
        data:details
    }).then((response)=>{
        setMessage("Prescription Created.... Redirecting to appointments ")
        setTimeout(()=>{
            navigate("/doctor/appointment")
        },3000)
    })
}

    return (<div className="container-fluid" style={{ backgroundColor: "lightgray" }}>
        <br></br>
        <div className="row justify-content-center">
            <div className="col-sm-10">
                <div className="card">
                    <div className="card-body">
                        <table className='table table-hover' >
                            <thead >

                                <tr>
                                    <td>
                                        Medicine
                                        <select name="m_id" className="form-select" value={medicine.m_id} onChange={handleChange} >
                                            <option >--Select Medicine--</option>

                                            {
                                                medicines.map((m) => (
                                                    <option key={m.id} value={m.id}> {m.name}</option>
                                                ))
                                            }
                                        </select>
                                    </td>
                                    <td>
                                        Dosage
                                        <input type="text" value={medicine.dosage} name="dosage" className="form-control" onChange={handleChange}></input>
                                    </td>
                                    <td>
                                        Duration
                                        <input type="text" value={medicine.duration} name="duration" onChange={handleChange} className="form-control"></input>
                                    </td>
                                    <td>
                                        Quantity
                                        <input type="text" value={medicine.qtantiy} name="qtantiy" className="form-control" onChange={handleChange}></input>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                        <div className="row justify-content-center">
                            <div className="col-sm-3">
                                <button className='btn btn-primary' onClick={add}>
                                    Add Medicine
                                </button>

                            </div>
                        </div>
                    </div>
                    
                </div>



            </div>
        </div>
        <br></br>
        <div className="row justify-content-center">
            <div className="col-sm-10">
                <div className="card">
                    <div className="card-body">
                        <table className='table table-hover' >
                            <thead >
                                <tr>
                                    <td>
                                        Medicine
                                       
                                    </td>
                                    <td>
                                        Dosage
                                      
                                    </td>
                                    <td>
                                        Duration
                                        
                                    </td>
                                    <td>
                                        Quantity
                                    </td>
                                    <td>
                                        Action
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {displaydetails.map((med)=>{
                                    return <tr key={med.m_id}>
                                        <td>
                                            {med.name}
                                        </td>
                                        <td>
                                            {med.dosage}
                                        </td>
                                        <td>
                                            {med.duration}
                                        </td>
                                        <td>
                                            {med.qtantiy}
                                        </td>
                                        <td>
                                            <input type={"button"} value={"Remove"} onClick={()=>{
                                                remove(med.m_id)
                                            }} className="btn btn-danger"></input>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                        <div className="row justify-content-center">
                        <div className="col-sm-4">
                        <p>{message}</p>
                        </div>
                    </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-sm-4">
                        <input type={"button"} value={"Create Prescription"} onClick={create} className="btn btn-primary"></input>
                        </div>
                    </div>
                    
                </div>
        
        <br></br>
    </div>)
}

export default AddPrescription;
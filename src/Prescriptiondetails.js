import { useState, useEffect } from "react";
//import'../../node_modules/bootstrap/dist/css/bootstrap.css';
import { useNavigate } from "react-router-dom";

function Prescriptiondetails() {
    var [prescriptionValues, setPrescriptionValues] = useState({ id: 0, d_name: "", p_name: "", date: "", pdetails: [] });
    //var [details, setDetails]=useState({id:0,m_name:"",dosage:"",duration:"",quantity:""})
    //debugger;
    var nav = useNavigate();



    useEffect(() => {
        console.log(sessionStorage.getItem("prescriptionId"))
        // axios.get(`http://localhost:8080/prescription/details/${prescripId}`)        
        // .then((result)=>{
        //     console.log(result);           
        //     setPrescriptionValues({ ...result });    


        // })
        fetch(`http://localhost:8080/prescription/details/${sessionStorage.getItem("prescriptionId")}`)
            .then((data) => { return data.json() })
            .then((result) => {
                console.log(result);
                setPrescriptionValues({ ...result });
            })
    }, [])


    return <div className="row justify-content-center"  >
        <div className="col-sm-10">
            <div className='card' style={{ boxShadow: "0px 0px 5px grey" }}>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col'>
                            <h3 className='card-title'>Prescription Details</h3>
                        </div>
                    </div>
                    <hr></hr>
                    <div className='row'>
                        <div className='col-sm-4'>
                            <h5>Doctor Name</h5>
                            <p className='text-muted'>{prescriptionValues.d_name}</p>
                        </div>
                        <div className='col-sm-4'>
                            <h5>Patient Name </h5>
                            <p className='text-muted'>{prescriptionValues.p_name}</p>
                        </div>
                        <div className='col-sm-4'>
                            <h5>Date</h5>
                            <p className='text-muted'>{prescriptionValues.date}</p>
                        </div>
                    </div>
                    <hr></hr>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Prescription Id</th>
                                <th scope="col">Medicine Name</th>
                                <th scope="col">Dosage</th>
                                <th scope="col">Duration</th>
                                <th scope="col">Quantity</th>
                            </tr>
                        </thead>
                        <tbody>{
                            prescriptionValues.pdetails.map((pr) => {
                                return (<tr key={pr.id}>
                                    <td>{pr.id}</td>
                                    <td>{pr.m_name}</td>
                                    <td>{pr.dosage}</td>
                                    <td>{pr.duration}</td>
                                    <td>{pr.quantity}</td>
                                </tr>)
                            })}

                        </tbody>

                    </table>




                </div>
            </div>
            <br></br>
        </div>
        <div className="row justify-content-center">
            <div className="col-sm-2">
                <input type={"button"} value={"Back"} className='btn btn-primary'
                    onClick={() => {
                        sessionStorage.removeItem("prescriptionId")
                        nav(-1)
                    }}></input>
                    <br></br>
            </div>

            
        </div>
        

        <br></br>
    </div>






}

export default Prescriptiondetails;

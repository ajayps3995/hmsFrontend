import React, { Route, Routes, useEffect, useState } from 'react';
import axios from 'axios'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import Billgeneration from './BillGeneration';



export default function ReceptionistBill() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" }
  const [services, setservices] = useState([])//whole data is stored in service
  //const[billservice,setBillService]=useState([])
  var service;
  var counter = 1
  var [bill, setBill] = useState({ billService: [] })
  var navigate = useNavigate();


  // <Routes>
  //                 <Route path="../BillGeneration" element={<Billgeneration/>}/>
  //  </Routes>

  var handleChange = (args) => {
    services.forEach((s) => {
      if (s.description == args.target.value) {
        service = s;
      }
    })
  }


  var Add = () => {
    var flag = true
    var copyofbill = { ...bill };
    copyofbill["billService"].forEach((s) => {
      if (s.id == service.id) {
        alert("service is already added")
        flag = false
      }
    })
    if (flag) {
      copyofbill["billService"].push(service);
    }
    setBill({ ...copyofbill });
    console.log(copyofbill)
  }


  var Remove = (no) => {
    // console.log("U asked to remove " + no);
    var filteredServices = bill["billService"].filter((s) => {
      return (s.id != no);
    });
    setBill({ billService: filteredServices });
  }


  useEffect(() => {
    fetch("http://localhost:8080/hospitalservice/showAll")
      .then(res => res.json())
      .then((result) => {
        setservices(result);
      }
      )
  }, [])

  var counterAdd = () => {
    counter = counter + 1;

  }

  var generateBill = async () => {
    var unpaid = "unpaid"
    var id;
    var total = 0;
    var bill_data
    var patient_id = sessionStorage.getItem("patientid");
    var service_id = [];
    bill["billService"].map((s) => {
      service_id.push(s.id)
      total = total + parseInt(s.charges);
    })

    bill_data = {
      "p_id": patient_id,
      "services": service_id,

    }

    try {
      const res = await axios.post(`http://localhost:8080/bill/add/${sessionStorage.getItem("apptid")}`, bill_data)
      console.log(res.data)
      id = res.data;
      sessionStorage.setItem("bill_id", id)
    } catch (e) {
      alert(e)
    }

    navigate("/receptionist", {
      state: {
        "billService": bill["billService"],
        "total": total, "bill_id": id, "status": { unpaid }
      }
    });

  }


  return (<div className='table-responsive'>

    <center>

      <Table className='table table-bordered content' >

        <tbody >

          <tr>
            <td>
              <select name="service" className="form-select" onChange={handleChange} >
                <option  >--Select Service--</option>

                {
                  services.map((s) => (
                    <option key={s.id} value={s.description}> {s.description}</option>
                  ))
                }
              </select>
            </td>
            <td>
              <button className='btn btn-primary' onClick={Add}>
                Add Service
              </button>
            </td>

          </tr>
        </tbody>
      </Table>


      <Table striped="rows">
        <thead>
          <tr>
            <th>No</th>
            <th>Description</th>
            <th>Charges</th>
          </tr>
        </thead>
        <tbody>
          {

            bill["billService"].map((s) => {


              return (

                <tr key={s.id} >
                  <td>
                    {counter}
                  </td>
                  <td>
                    {s.description}
                  </td>
                  <td>
                    {s.charges}
                  </td>
                  <td>
                    <button className='btn btn-danger'
                      onClick=
                      {
                        () => {
                          Remove(s.id)
                        }
                      }>
                      Delete
                    </button>
                  </td>
                  {
                    counterAdd()
                  }

                </tr>

              )

            }


            )
          }
          <tr>
            <td className="text-center" colSpan={4}>
              <Button as="input" type="submit" value="Generate Bill"
                onClick={generateBill}
              />
            </td>
          </tr>
        </tbody>
      </Table>

    </center>
  </div>);
}


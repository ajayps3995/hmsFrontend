import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function PatientBill() {
    var navigate = useNavigate();
    var start = 1000;
    var [bills, setBills] = useState([]);
    var counter = 1
    useEffect(() => {
        fetch(`http://localhost:8080/bill/bills/${sessionStorage.getItem("id")}`)
            .then(res => res.json())
            .then((result) => {
                setBills(result);
            }
            )
    }, [])

    var counterAdd = () => {
        counter = counter + 1;

    }
    var showBill = async (bill_id) => {
        var service;
        var billTotal;
        console.log("ajay")



        try {

            const res = await axios.get(`http://localhost:8080/bill/services/${bill_id}`, {
            }).then((response) => {
                service = response
                console.log(service.data)
            })
        } catch (e) {

        }

        try {

            const res = await axios.get(`http://localhost:8080/bill/total/${bill_id}`, {
            }).then((response) => {
                billTotal = response.data
            })
        } catch (e) {

        }

        navigate("../BillGeneration", {
            state: {
                "billService": service.data,
                "total": billTotal.total, "bill_id": bill_id, "status": billTotal.status
            }
        });

    }

    return <div>
        <div>
            <div className='card' style={{ boxShadow: "0px 0px 5px grey" }}>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col'>
                            <h3 className='card-title'>Bills</h3>
                        </div>
                    </div>
                    <br></br>
                    <Table className='table table-hover' >
                        <thead>
                            <tr>
                                <td>Sr. No</td>
                                <td>Bill No</td>
                                <td>Date</td>
                                <td>Total_Amount</td>
                                <td>Status</td>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                bills.map((s) => {


                                    return (

                                        <tr key={s.id} >
                                            <td>
                                                {counter}
                                            </td>
                                            <td>
                                                B{start + s.id}
                                            </td>
                                            <td>
                                                {s.generatedDate}
                                            </td>
                                            <td>
                                                {s.total}
                                            </td>
                                            <td>
                                                {s.status}
                                            </td>
                                            <td className="text-center">
                                                <Button as="input" type="submit" value="Show Bill"
                                                    onClick=
                                                    {
                                                        () => {
                                                            showBill(s.id, s.status)
                                                        }
                                                    }
                                                />
                                            </td>
                                            {
                                                counterAdd()
                                            }

                                        </tr>

                                    )

                                }


                                )
                            }

                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    </div>
}

export default PatientBill;
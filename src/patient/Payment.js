import { useState, useEffect } from "react"
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import book from "../images/payment.png";


export default function Payment() {
    var navigate = useNavigate();
    var billTotal = 0;
    const location = useLocation();
    var bill_id = location.state["bill_id"]
    var [amount, setAmount] = useState(0);

    useEffect(() => {
        var total = Math.floor(location.state["total"] * 1.18)
        setAmount(total)
    }, [])


    var onSubmit = async () => {
        try {

            const res = await axios.get(`http://localhost:8080/bill/total/${bill_id}`, {
            }).then((response) => {
                billTotal = Math.floor(response.data.total * 1.18)
                console.log(billTotal)
            })
        } catch (e) {

        }
        if (billTotal == amount) {
            console.log("payment_matched")

            try {

                const res = await axios.post(`http://localhost:8080/bill/paid/${bill_id}`, {
                }).then((response) => {
                    console.log("payment is done")


                    navigate("/success")


                })
            } catch (e) {

            }


        }
        else {
            navigate("/failure")

        }


    }

    return (
        <div className="container-fluid" style={{ backgroundColor: "lightblue" }}>
            <div className="row justify-content-center">
                <div className="col-sm-5">
                </div>
            </div>



            <div className="container-fluid" >
                <div className="row justify-content-center">
                    <div className="col-sm-6" style={{ marginTop: "40px" }}>
                        <div className="card ">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="card-body">
                                        <div className="card-title">
                                            <h3>Payment Gateway</h3>
                                            <h5>Enter the details for payment</h5>
                                        </div>
                                        <br></br>
                                        <div className="row">
                                            <div className="col-sm-10">
                                                <div className="form-group">
                                                    <p className="form-label">Amount</p>
                                                    <input type="number" value={amount} disabled={"disabled"}></input>

                                                </div>
                                            </div>
                                        </div>
                                        <br></br>
                                        <div className="row">
                                            <div className="col-sm-10">
                                                <div className="form-group">
                                                    <p className="form-label">Enter the Card No</p>
                                                    <input type="number"></input>

                                                </div>
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-sm-10">
                                                <div className="form-group">
                                                    <p className="form-label">Enter Pin</p>
                                                    <input type="password"></input>

                                                </div>
                                            </div>

                                        </div>
                                        <br></br>
                                        <div className="row">
                                            <div className="col-sm-10">
                                                <div className="form-group">
                                                    <p className="form-label">Expiry Date</p>
                                                    <input type={"date"} name={"expiry Date"} required className={"input-group date"} />
                                                </div>
                                            </div>
                                        </div>
                                        <br></br>
                                        <div className="row justify-content-center">
                                            <div className="col-sm-4">

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
                <div className="text-center mb-3">
                    <input type={"button"} value="Make Payment" className="btn btn-primary" onClick={onSubmit} />
                </div>
                <br></br>
            </div>






        </div>
    )

}
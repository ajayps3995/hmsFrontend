import "../node_modules/bootstrap/dist/css/bootstrap.css"
import { useState } from "react";
import loginImage from "./images/loginImage.jpg"
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
function Login() {

    var [loginDetails, setLoginDetails] = useState({ username: "", password: "" });
    var navigate = useNavigate();
    var onSubmit = () => {
        axios("http://localhost:8080/user/signin", {
            method: 'post',
            data:loginDetails
        }).then(response => {
            debugger;
            var result=response.data;
            if (result.role == "PATIENT") {
                sessionStorage.setItem("id", result.id);
                sessionStorage.setItem("username", result.username);
                sessionStorage.setItem("name", result.name);
                sessionStorage.setItem("type", result.type);
                sessionStorage.setItem("gender", result.gender);
                sessionStorage.setItem("address", result.address);
                sessionStorage.setItem("dob", result.dob);
                sessionStorage.setItem("state", result.state);
                sessionStorage.setItem("city", result.city);
                sessionStorage.setItem("pincode", result.pincode);
                sessionStorage.setItem("mobileno", result.mobileNo);
                sessionStorage.setItem("emailid", result.emailid);
                sessionStorage.setItem("isLoggedIn", "true");
                sessionStorage.setItem("role",result.role);
                console.log(result)
                navigate("/patient/profile")
            }
            else if(result.role == "DOCTOR"){
                sessionStorage.setItem("id", result.id);
                sessionStorage.setItem("username", result.username);
                sessionStorage.setItem("name", result.name);
                sessionStorage.setItem("specialization", result.specialization);
                sessionStorage.setItem("gender", result.gender);
                sessionStorage.setItem("joinDate", result.joinDate);
                sessionStorage.setItem("dob", result.dob);
                sessionStorage.setItem("mobileno", result.mobileNo);
                sessionStorage.setItem("emailid", result.emailid);
                sessionStorage.setItem("role",result.role);
                sessionStorage.setItem("isLoggedIn", "true");
                console.log(result)
                navigate("/doctor/profile")
            }
            else if(result.role == "ADMIN"){
                sessionStorage.setItem("username",result.name);
                sessionStorage.setItem("role",result.role);
                sessionStorage.setItem("isLoggedIn", "true");
                navigate("/admin")
            }
            else{
                sessionStorage.setItem("username",result.name);
                sessionStorage.setItem("role",result.role);
                sessionStorage.setItem("isLoggedIn","true");
                navigate("/receptionist")
            }

        });
    }

    var handleChange = (args) => {
        var updatedDetails = { ...loginDetails };
        updatedDetails[args.target.name] = args.target.value;
        setLoginDetails({ ...updatedDetails })
    }

    return <div style={{ backgroundImage: `url(${loginImage})`, height: "600px", backgroundSize: "cover" }}>
        <br>
        </br>
        <br>
        </br>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-4">
                    <div className="card" style={{ borderRadius: "0.2rem", boxShadow: "0px 0px 5x grey", marginTop: "100px" }}>
                        <div className="card-body">
                            <div className="text-center mb-3">
                                <p>Sign in with:</p>
                            </div>
                            <div className="tab-content">

                                <div className="text-center mb-3">
                                </div>
                                <div className="form-outline mb-4">
                                    Username
                                    <input type={"text"} name="username" value={loginDetails.username} placeholder="Enter Your Username" onChange={handleChange} className="form-control"></input>
                                </div>

                                <div className="form-outline mb-4">
                                    Password
                                    <input type={"password"} name="password" value={loginDetails.password} placeholder="Enter Your password" onChange={handleChange} className="form-control"></input>

                                </div>
                            </div>
                            <div className="text-center mb-3">
                                <input type={"button"} value="Sign-In" className="btn btn-primary" onClick={onSubmit} />
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        </div>
    </div>
}

export default Login;

import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
// import './comman.css';
// import registerimage from './images/registration.jpg';






function NewDoctor() {

    var [specificuser, setSpecificuser] = useState({ name: "", dob: "", gender: "", joinDate: "", specialization: "", dept:{id:0},mobileNo: "", emailid: "", user: { username: "", password: "" } })
    var [departments, setDepartments] = useState([]);
    var [message,setMessage] = useState("");
    var nav = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080/appointment/getdept", {

        }).then((response) => {
            setDepartments([...response.data]);
        })
    },[])

    // {
    //     "name":"Swaroop Ronimath",
    //     "dob":"22-11-2000",
    //     "gender":"M",
    //     "joinDate":"03-07-2020",
    //     "mobileNo":"1234567890",
    //     "emailid":"swaroopr@gmail.com",
    //     "user":{
    //         "username":"swaroopr22",
    //         "password":"swaroopr22"
    //     }
    // }
    // axios({
    //     method: 'post',
    //     url: 'http://172.18.5.0:8080/patient/signup',
    //     data: body
    // })
    // .then(function (response) {
    //     console.log(response.data);
    // })
    // .catch(function (error) {
    //     console.log(error);
    // });

    var HandleChange = (args) => {
        //debugger;
        var collecteduser = { ...specificuser };

        collecteduser[args.target.name] = args.target.value;
        setSpecificuser({ ...collecteduser });
        //console.log(specificuser);
    }

    var userhandler = (args) => {
        var newuser = { ...specificuser.user };
        newuser[args.target.name] = args.target.value;
        setSpecificuser({ ...specificuser, user: { ...newuser } })
    }

    var Reset = () => {
        setSpecificuser({ name: "", dob: "", gender: "", joinDate: "", specialization: "", dept:{id:0},mobileNo: "", emailid: "", user: { username: "", password: "" } });
    }

    var Submit = () => {

        axios({
            method: 'post',
            url: 'http://localhost:8080/doctor/add',
            data: specificuser
        })
            .then(function (response) {
                //console.log(response.data);
                setMessage("Doctor Added");
                setTimeout(()=>{
                    nav("/admin")
                },4000)

            })
            .catch(function (error) {
                console.log(error);
                console.log(specificuser);
            })

    }

    var handleDpt=(args)=>{
        var newDpt={...specificuser.dept};
        newDpt[args.target.name]=args.target.value;
        departments.forEach((d)=>{
            if(d.id == args.target.value){
                setSpecificuser({...specificuser,specialization:d.department})
            }
                
        })
        setSpecificuser({...specificuser,dept:newDpt})
    }

    return (<section className="container-fluid" style={{ backgroundColor: "lightblue" }}>
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-sm-6">
                    <div className="card">
                        <div className="row ">
                            <div className="col-sm-1">
                                {/* <img src={registerimage}
              alt='Sample photo' className="img-fluname"
              style={{width: "100%",height: "100%"}} /> */}
                            </div>
                            <div className="col-sm-10">
                                <div className="card-body p-md-5 text-black">
                                    <h3 className="mb-5 text-uppercase">Doctor registration form</h3>

                                    <div className="row">
                                        <div className="col">
                                            <div className="form-outline">
                                                <input type={"text"} name="name" value={specificuser.name} onChange={HandleChange} className="form-control form-control-lg" />
                                                <label className="form-label" >Full name</label>
                                            </div>
                                        </div>




                                        <div className="d-md-flex justify-content-start align-items-center mb-4 py-2">

                                            <h6 className="mb-0 me-4">Gender </h6>

                                            <div className="form-check form-check-inline mb-0 me-4">
                                                <input className="form-check-input" type="radio" name="gender"
                                                    onChange={HandleChange} value={"F"} />
                                                <label className="form-check-label" >Female</label>
                                            </div>

                                            <div className="form-check form-check-inline mb-0 me-4">
                                                <input className="form-check-input" type="radio" name="gender"
                                                    onChange={HandleChange} value={"M"} />
                                                <label className="form-check-label" >Male</label>
                                            </div>

                                            <div className="form-check form-check-inline mb-0">
                                                <input className="form-check-input" type="radio" name="gender"
                                                    onChange={HandleChange} value={"O"} />
                                                <label className="form-check-label" >Other</label>
                                            </div>

                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type={"date"} name="dob" value={specificuser.dob} onChange={HandleChange} className="form-control form-control-lg" />
                                            <label className="form-label" >DOB</label>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type={"text"} name="joinDate" value={specificuser.joinDate} onChange={HandleChange} className="form-control form-control-lg" />
                                            <label className="form-label" >Join Date</label>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="number" name="mobileNo" value={specificuser.mobileNo} onChange={HandleChange} className="form-control form-control-lg" />
                                            <label className="form-label" >Mobile Number</label>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <select className="form-select" aria-label="Default select example" name="id" value={specificuser.dept.id} onChange={handleDpt}>
                                                <option value={"default"}>
                                                    Select Department
                                                </option>
                                                {

                                                    departments.map(dept => {
                                                        return <option value={dept.id} key={dept.id}>
                                                            {dept.department}
                                                        </option>
                                                    })
                                                }
                                            </select>
                                        </div>


                                        <div className="form-outline mb-4">
                                            <input type={"text"} name="emailid" value={specificuser.emailid} onChange={HandleChange} className="form-control form-control-lg" />
                                            <label className="form-label" >Email Id</label>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type={"text"} name="username" value={specificuser.user.username} onChange={userhandler} className="form-control form-control-lg" />
                                            <label className="form-label" >User Name</label>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="password" name="password" value={specificuser.user.password} onChange={userhandler} className="form-control form-control-lg" />
                                            <label className="form-label" >Password</label>
                                        </div>

                                        <div className="d-flex justify-content-end pt-3">
                                            <button className="btn btn-dark" onClick={Reset}>Reset all</button>
                                            <button className="btn btn-warning btn-lg ms-2" onClick={Submit}>Submit form</button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>)


}

export default NewDoctor;




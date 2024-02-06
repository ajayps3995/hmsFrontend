import { useState,useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
function EditDoctor() {
    var navigate = useNavigate();
    var [user, setUser] = useState({ id:0,name: "", specialization: "", gender: "", emailid: "", dob: "", mobileNo: "",joinDate:"",user_id:""});
    var handleChange = (args) => {
        var copyOfUser = { ...user };
        copyOfUser[args.target.name] = args.target.value;
        setUser(copyOfUser);
    }

    useEffect(()=>{
        axios.get(`http://localhost:8080/doctor/show/${sessionStorage.getItem("docid")}`).then((response)=>{
            setUser({...response.data})
        });
    },[])

    var update=()=>{
        axios(`http://localhost:8080/doctor/edit`,{
            method:"put",
            data:user
        }).then(response=>{
            sessionStorage.removeItem("docid")
            navigate("/admin/showdoctors");
        })
        
    }

    return <div className="container py-5 h-100">
        <div className='card' style={{ boxShadow: "0px 0px 5px grey" }}>
            <div className='card-body'>
                <div className='row'>
                    <div className='col'>
                        <h3 className='card-title'>Information</h3>
                    </div>
                </div>
                <hr></hr>
                <div className='row'>
                    <div className='col-sm-4'>
                        <h5>Full Name</h5>
                        <p className='text-muted'> <input type={'text'} className='form-control' name='name' value={user.name} onChange={handleChange}></input></p>
                    </div>
                    <div className='col-sm-4'>
                        <h5>Gender</h5>
                        <p className='text-muted'><input type={'text'} className='form-control' name='gender' value={user.gender} onChange={handleChange}></input></p>
                    </div>
                    <div className='col-sm-4'>
                        <h5>Specialization</h5>
                        <p className='text-muted'><input type={'text'} className='form-control' name='specialization' value={user.specialization} onChange={handleChange}></input></p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-4'>
                        <h5>Mobile No</h5>
                        <p className='text-muted'><input type={'text'} className='form-control' name='mobileNo' value={user.mobileNo} onChange={handleChange}></input></p>
                    </div>
                    <div className='col-sm-4'>
                        <h5>Email Id</h5>
                        <p className='text-muted'><input type={'text'} className='form-control' name='emailid' value={user.emailid} onChange={handleChange}></input></p>
                    </div>
                    <div className='col-sm-4'>
                        <h5>DOB</h5>
                        <p className='text-muted'><input type={'text'} className='form-control' name='dob' value={user.dob} onChange={handleChange}></input></p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <h5>
                            Join Date
                        </h5>
                        <p>
                        <p className='text-muted'><input type={'text'} className='form-control' name='joinDate' value={user.joinDate} onChange={handleChange}></input></p>
                        </p>
                    </div>
                </div>
                <br>
                </br>
                <div className='row justify-content-center'>
                    <div className='col-sm-2'>
                       <input type={'button'} className={"btn btn-primary"} value={"Update Profile"} onClick={update}></input>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default EditDoctor;
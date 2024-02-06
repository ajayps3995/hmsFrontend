
import {  useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
// import './comman.css';
import registerimage from './images/registration.jpeg';






function Register(){
    
    var [ specificuser,setSpecificuser ] =useState({name:"",dob:"",gender:"",type:"",state:"",city:"",address:"",pincode:"",mobileNo:"",emailid:"", user:{username:"",password:""}})
    var nav=useNavigate();
  
//     var body = {
//     "name":"prasad dete",
//     "dob":"04-10-2000",
//     "gender":"M",
//     "type":"B_PLUS",
//     "state":"Maharashtra",
//     "city":"latur",
//     "address":"latur City",
//     "pincode":411006,
//     "mobileNo":"1234567890",
//     "emailnid":"pd@gmail.com",
//     "user":{
//     "username":"pd123",
//     "password":"pd123"
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

var HandleChange=(args)=>{
    //debugger;
    var collecteduser={ ...specificuser};
    
    collecteduser[args.target.name]=args.target.value;
    setSpecificuser({ ...collecteduser });
    //console.log(specificuser);
}

var userhandler=(args)=>{
  var newuser={ ...specificuser.user };
  newuser[args.target.name]=args.target.value;
  setSpecificuser({...specificuser,user:{...newuser}})
}

var Reset=()=>{
  setSpecificuser({ name:"",dob:"",gender:"",type:"",state:"",city:"",address:"",pincode:"",mobileNo:"",emailid:"", user:{username:"",password:"" }});
}

var Submit=()=>{

    axios({
    method: 'post',
    url: 'http://localhost:8080/patient/signup',
    data: specificuser
})
.then(function (response) {
    //console.log(response.data);
    nav("/login");
    
})
.catch(function (error) {
    console.log(error);
    console.log(specificuser);
})

}

return(<section className="container-fluid" style={{backgroundColor:"lightblue"}}>
<div className="container py-5 h-100">
  <div className="row d-flex justify-content-center align-items-center h-100">
    <div className="col">
      <div className="card card-registration my-4">
        <div className="row g-0">
          <div className="col-xl-6 d-none d-xl-block">
            <img src={registerimage}
              alt='Sample photo' className="img-fluname"
              style={{width: "100%",height: "100%"}} />
          </div>
          <div className="col-xl-6">
            <div className="card-body p-md-5 text-black">
              <h3 className="mb-5 text-uppercase">Patient registration form</h3>

              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="form-outline">
                    <input type={"text"} name="name" value={specificuser.name} onChange={HandleChange} className="form-control form-control-lg"  />
                    <label className="form-label" >Full name</label>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                    
                  <select className="form-select" aria-label="Default select example" name="type" onChange={HandleChange}>
                  <option  value={"A_PLUS"}>Blood Type</option>
                    <option  value={"A_PLUS"}>A(+ve)</option>
                    <option  value={"A_MINUS"} >A(-ve)</option>
                    <option  value={"B_MINUS"} >B(-ve)</option>
                    <option  value={"B_PLUS"} >B(+ve)</option>
                    <option  value={"O_PLUS"} >O(+ve)</option>
                    <option  value={"O_MINUS"} >O(-ve)</option>
                    <option  value={"AB_PLUS"} >AB(+ve)</option>
                    <option  value={"AB_MINUS"} >AB(-ve)</option>
                  </select>
                  
                </div>
                {/* <div className="col-md-6 mb-4">
                  <div className="form-outline">
                    <input type={"text"} name="type" onChange={HandleChange} value={specificuser.type} className="form-control form-control-lg" />
                    <label className="form-label" >Blood type</label>
                  </div>
                </div>
              </div>                      */}

              <div className="form-outline mb-4">
                <input type={"text"} name="address" value={specificuser.address} onChange={HandleChange} className="form-control form-control-lg" />
                <label className="form-label" >Address</label>
              </div>

              <div className="d-md-flex justify-content-start align-items-center mb-4 py-2">

                <h6 className="mb-0 me-4">Gender </h6>

                <div className="form-check form-check-inline mb-0 me-4">
                  <input className="form-check-input" type="radio"  name="gender"
                  onChange={HandleChange} value={"F"} />
                  <label className="form-check-label" >Female</label>
                </div>

                <div className="form-check form-check-inline mb-0 me-4">
                  <input className="form-check-input" type="radio" name="gender"
                  onChange={HandleChange} value={"M"}  />
                  <label className="form-check-label" >Male</label>
                </div>

                <div className="form-check form-check-inline mb-0">
                  <input className="form-check-input" type="radio"  name="gender"
                    onChange={HandleChange} value={"O"} />
                  <label className="form-check-label" >Other</label>
                </div>

              </div>

              <div className="row">
                <div className="col-md-6 mb-4">

                  <select className="form-select" aria-label="Default select example" name="state" onChange={HandleChange}>
                    <option  value={"State"}  >State</option>
                    <option  value={"Maharastra"} >Maharastra</option>
                    <option  value={"Punjab"}  >Punjab</option>
                    <option  value={"chennai"}  >chennai</option>
                  </select>

                </div>
                <div className="col-md-6 mb-4">

                  <select className="form-select" aria-label="Default select example" name="city" onChange={HandleChange}>
                    <option  value={"City"}>City</option>
                    <option  value={"Pune"} >Pune</option>
                    <option  value={"Mumbai"} >Mumbai</option>
                    <option  value={"Latur"} >Latur</option>
                  </select>

                </div>
              </div>

              <div className="form-outline mb-4">
                <input type={"text"} name="dob" value={specificuser.dob} onChange={HandleChange} className="form-control form-control-lg" />
                <label className="form-label" >DOB</label>
              </div>

              <div className="form-outline mb-4">
                <input type={"text"} name="pincode" value={specificuser.pincode} onChange={HandleChange} className="form-control form-control-lg" />
                <label className="form-label" >Pincode</label>
              </div>

              <div className="form-outline mb-4">
                <input type="number" name="mobileNo" value={specificuser.mobileNo} onChange={HandleChange} className="form-control form-control-lg" />
                <label className="form-label" >Mobile Number</label>
              </div>

              <div className="form-outline mb-4">
                <input type={"text"} name="emailid" value={specificuser.emailid} onChange={HandleChange} className="form-control form-control-lg" />
                <label className="form-label" >Email Id</label>
              </div>

              <div className="form-outline mb-4">
                <input type={"text"} name="username" value={specificuser.user.username}  onChange={userhandler} className="form-control form-control-lg" />
                <label className="form-label" >User Name</label>
              </div>

              <div className="form-outline mb-4">
                <input type="password" name="password" value={specificuser.user.password} onChange={userhandler} className="form-control form-control-lg" />
                <label className="form-label" >Password</label>
              </div>              

              <div className="d-flex justify-content-end pt-3">
                <button  className="btn btn-dark" onClick={Reset}>Reset all</button>
                <button  className="btn btn-warning btn-lg ms-2" onClick={Submit}>Submit form</button>
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

export default Register;




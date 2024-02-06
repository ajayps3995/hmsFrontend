import { useLocation } from 'react-router-dom'
import React from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBTypography,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";



function Billgeneration() {

  <head>
    <title>Invoice Template Design</title>
    <link rel="stylesheet" type="text/css" href="styles.css" />
  </head>

  const location = useLocation()
  var counter = 1
  var t = 212131;
  var three = [1, 2, 3];

  var navigate = useNavigate();




  useEffect(() => {
    location.state["billService"].map((s) => {
      console.log(location.state["status"])
      t = t + parseInt(s.charges)

    }



    )
    { console.log(t) }
  }, [])



  var counterAdd = () => {
    counter = counter + 1;

  }

  var payment = (() => {
    navigate("/payment", {
      state: {
        "bill_id": location.state["bill_id"],
        "total": location.state["total"]
      }
    });
  }

  )


  return <div>




    <MDBContainer className="py-5">
      <MDBCard className="p-4">
        <MDBCardBody>
          <MDBContainer className="mb-2 mt-3">
            <MDBRow className="d-flex align-items-baseline">
              <MDBCol xl="9">
                <p style={{ color: "#7e8d9f", fontSize: "20px" }}>
                  Bill No : {location.state["bill_id"]}
                </p>
              </MDBCol>
              <MDBCol xl="3" className="float-end">

              </MDBCol>
            </MDBRow>
          </MDBContainer>

          <div class="table-responsive p-2">
            <table class="table table-borderless">
              <tbody>
                <tr>
                  <div className="text-left">
                    <td>To
                      <br />{sessionStorage.getItem("name")} <br />{sessionStorage.getItem("address")}<br />{sessionStorage.getItem("state")}</td>
                  </div>
                  <td>
                    <div className="text-right">
                      <td>From</td>
                      <td><br />{"                         "}Medicare Hospital<br /> Pune <br /> Maharashtra</td>
                    </div>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>


          <MDBRow className="my-2 mx-1 justify-content-center">
            <MDBTable striped borderless>
              <MDBTableHead
                className="text-white , text-center"
                style={{ backgroundColor: "#84B0CA" }}
              >
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Description</th>
                  <th scope="col">Amount</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody className="text-center">
                {
                  location.state["billService"].map((s) => {
                    return (
                      <tr key={s.id} >
                        <td>
                          {counter}
                        </td>
                        <td>
                          {s.description}
                        </td>
                        <td>
                          {s.charges} ₹


                        </td>
                        {
                          counterAdd()
                        }
                      </tr>
                    )
                  })}

              </MDBTableBody>
            </MDBTable>


          </MDBRow>
          <MDBRow>
            <MDBCol xl="8">
              <p className="ms-3">

              </p>
            </MDBCol>
            <MDBCol xl="3">
              <MDBTypography listUnStyled >
                <li className="text-muted ms-3 text-left">
                  <span class="text-black me-4">SubTotal</span> {location.state["total"]}
                </li>
                <li className="text-muted ms-3 mt-2 text-left">
                  <span class="text-black me-4">Tax(18%)</span>{Math.floor(location.state["total"] * 0.18)}
                </li>
                <p className="text-black float-start text-left">
                  <span className="text-black me-3"> Total Amount</span>
                  <span style={{ fontSize: "20px" }}> {Math.floor(location.state["total"] * 1.18)}</span>
                </p>
              </MDBTypography>

            </MDBCol>
          </MDBRow>
          <hr />
          <MDBRow>
            <MDBCol xl="10">
              <p>Authorise Signed</p>
            </MDBCol>
            <MDBCol xl="2">


{location.state["status"]=="Paid"?<MDBBtn
                className="text-capitalize"
                style={{ backgroundColor: "#60bdf3" }}
                onClick={()=>{
                  navigate(-1);
                }}
              >
                Back
              </MDBBtn>: <MDBBtn
                className="text-capitalize"
                style={{ backgroundColor: "#60bdf3" }}
                onClick={payment}
              >
                Pay Now
              </MDBBtn>}

             






            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  </div>

}

export default Billgeneration;
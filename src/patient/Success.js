import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

function Success() {
    const navigate = useNavigate()
    useEffect(()=>{
        setTimeout(()=>{
            navigate("/patient/bill");
        },4000)
    },[])
return(
    <h1>
        Payment is Successful<br></br>
        thank you !
    </h1>
)

}

export default Success;

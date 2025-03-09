import {useNavigate} from "react-router-dom";
export const Navbar  =()=>{
    const navigate = useNavigate();
    return(
<><nav className="nav d-flex flex-row gap-2 bg-primary p-2 w-100 position-fixed">
           <p onClick={()=> navigate('/')}style={{marginRight:"20px",cursor:"pointer"}}>Home</p>
           <p onClick={()=> navigate('/report')} style={{cursor:"pointer"}}>Report</p>
        </nav></>
    )
}
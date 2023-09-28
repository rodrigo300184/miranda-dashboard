import { Navigate } from "react-router-dom";

export const PrivateRoute = (props) =>{
    if(props.authenticated!=='false'){
        return props.children;
    }else{
        return <Navigate to='/login'/>
    }

}
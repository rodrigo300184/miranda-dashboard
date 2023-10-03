import { Navigate } from "react-router-dom";
import { GeneralContext } from "../App";
import { useContext } from "react";

export const PrivateRoute = (props) =>{
    const {loginState} = useContext(GeneralContext);
    if(loginState.authenticated===true){
        return props.children;
    }else{
        return <Navigate to='/login'/>
    }

}
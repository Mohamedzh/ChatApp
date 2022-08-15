import { verifySignIn } from "./api"
import { NavigateFunction} from 'react-router-dom'
import { Dispatch } from "@reduxjs/toolkit"
import jwt_decode from 'jwt-decode'
import { decodedJWT } from "../types"


export const VerifyUser = (navigate: NavigateFunction, dispatch: Dispatch) => {
    const token = localStorage.getItem('token') || ""
    console.log(token)
    const decoded: decodedJWT = jwt_decode(token)
    if (decoded.exp < Date.now() / 1000){
        localStorage.removeItem('token')}
    else if (!token) {
        navigate("/login", { replace: true });
    }
    verifySignIn({token}, dispatch)
}
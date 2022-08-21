import { sendMessage, verifySignIn } from "../api"
import { NavigateFunction} from 'react-router-dom'
import { Dispatch } from "@reduxjs/toolkit"
import jwt_decode from 'jwt-decode'
import { decodedJWT } from "../types"
import { Socket } from "socket.io-client"


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

export const signOut =(navigate: NavigateFunction)=>{
    localStorage.removeItem('token')
    navigate("/login", { replace: true });
}

export const sendHandler = ( id: number, socket:Socket, message:string) => {
    socket?.emit('newMessage', { body: message, id });
    const messageData = {
      body: message,
      id: id,
    };
    sendMessage(messageData);
  };
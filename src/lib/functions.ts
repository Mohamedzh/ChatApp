import { sendChatMessage, sendMessage, verifySignIn } from "./api"
import { NavigateFunction } from 'react-router-dom'
import { Dispatch } from "@reduxjs/toolkit"
import jwt_decode from 'jwt-decode'
import { decodedJWT } from "../types"
import { Socket } from "socket.io-client"

export const VerifyUser = (navigate: NavigateFunction, dispatch: Dispatch) => {
  const token = localStorage.getItem('token') || ""
  console.log(token)
  const decoded: decodedJWT = jwt_decode(token)
  if (decoded.exp < Date.now() / 1000) {
    localStorage.removeItem('token')
  }
  else if (!token) {
    navigate("/login", { replace: true });
  }
  verifySignIn({ token }, dispatch)
}

export const signOut = (navigate: NavigateFunction) => {
  localStorage.removeItem('token')
  navigate("/login", { replace: true });
}

export const chatSendHandler = (id: number, socket: Socket, message: string, conversation: number, userIds: number[], firstName: string) => {
  socket?.emit('aMessage', { body: message, userIds, firstName });
  const messageData = {
    body: message,
    id,
    conversation
  };
  sendChatMessage(messageData);
};

export const sendHandler = (messageBody: string, id: number, conversation: number, socket: Socket) => {
  socket?.emit('newMessage', { body: messageBody, id });
  const messageData = {
    body: messageBody,
    id,
    conversation
  };
  console.log(messageData)
  sendMessage(messageData);
};

// async function signInWithEmail() {
//   const { user, error } = await supabase.auth.signIn({
//     email: 'example@email.com',
//     password: 'example-password',
//   })
// }
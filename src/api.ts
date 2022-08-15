import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { Dispatch } from "redux";
import { logIn } from "./redux/features/loggedIn-slice";
import { changeTheProtectionValue } from "./redux/features/ProtectSlice";
import { decodedJWT, User } from "./types";
import jwt_decode from 'jwt-decode'

export const userSignIn = async (navigate: NavigateFunction, data: { email: string, password: string }, dispatch: Dispatch
) => {
  await axios.post("http://localhost:5000/user/signin", data).then(res => {
    console.log(res.data)
    const token = res.data.token
    localStorage.setItem("token", token)
    dispatch(changeTheProtectionValue(true))
    navigate("/chat")
  })
}


export const userSignInWithToken = async (token: { token: string }, navigate: NavigateFunction, dispatch: Dispatch) => {
  const decoded: decodedJWT = jwt_decode(token.token)
  if (decoded.exp < Date.now() / 1000) {
    localStorage.removeItem('token')
  }
  await axios.post("http://localhost:5000/user/signinwithtoken", token).then((res) => {
    //Another way to validate the token
    // if (res.data.currentUser) {
      dispatch(changeTheProtectionValue(true))
      navigate("/chat")
    // }
  })
}


export const signUp = async (user: User) => {
  await axios.post('http://localhost:5000/user/signup', user)
    .then((response) => {
      console.log(response.data.token);
      localStorage.setItem('token', response.data.token);
    })
}

export const verifySignIn = async (token: { token: string }, dispatch: Dispatch) => {
  await axios.post('http://localhost:5000/user/details', token)
    .then(response => {
      if (response.data.currentUser) {
        console.log(response.data);
        dispatch(logIn(true))
      }
    });
}
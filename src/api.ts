import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { Dispatch } from "redux";
import { messages } from "./redux/features/messages-slice";
import { changeTheUserState } from "./redux/features/UserSlice";
import { User } from "./types";

export const userSignIn = async (navigate: NavigateFunction, data: { email: string, password: string }, dispatch: Dispatch
) => {
  await axios.post("http://localhost:5000/user/signin", data).then(res => {
    console.log(res.data)
    if (res.data.token) {
      const token = res.data.token
      localStorage.setItem("token", token)
      dispatch(changeTheUserState({ loggedIn: true, name: res.data.firstName }))
      navigate("/chat")
    } else {
      alert(res.data)
    }
  })
}


export const userSignInWithToken = async (token: { token: string }, navigate: NavigateFunction, dispatch: Dispatch) => {
  // const decoded: decodedJWT = jwt_decode(token.token)
  // if (decoded.exp < Date.now() / 1000) {
  //   localStorage.removeItem('token')
  // }
  await axios.post("http://localhost:5000/user/signinwithtoken", token).then((res) => {
    //Another way to validate the token
    // if (res.data.currentUser) {
    dispatch(changeTheUserState({ loggedIn: true, name: res.data.firstName }))
    navigate("/chat")
    // }
  })
}


export const signUp = async (user: User, navigate: NavigateFunction, dispatch: Dispatch) => {
  await axios.post('http://localhost:5000/user/signup', user)
    .then((response) => {
      console.log(response.data.token);
      localStorage.setItem('token', response.data.token);
      dispatch(changeTheUserState({ loggedIn: true, name: response.data.firstName }))
      navigate("/chat")
    })
}

export const verifySignIn = async (token: { token: string }, dispatch: Dispatch) => {
  await axios.post('http://localhost:5000/user/details', token)
    .then(response => {
      if (response.data.currentUser) {
        console.log(response.data);
        dispatch(changeTheUserState({ loggedIn: true, name: response.data.firstName }))
      }
    });
}



export const sendMessage = async (data: {
  body: string;
  userName: string;
}) => await axios.post('http://localhost:5000/messages/', data)




export const getMessages = async (dispatch: Dispatch) => {
  await axios.get("http://localhost:5000/messages/all").then(res =>dispatch(messages(res.data)) 
  )

}
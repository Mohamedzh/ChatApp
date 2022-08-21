import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { Dispatch } from "redux";
import { messages } from "./redux/features/messages-slice";
import { changeTheUserState } from "./redux/features/UserSlice";
import { Conversation, decodedJWT, User, User2 } from "./types";
import jwt_decode from "jwt-decode"
import { getChat } from "./redux/features/conversation-slice";
import { getAllUsers } from "./redux/features/allUsersSlice";
import { Socket } from "socket.io-client";
import { addConversations, addUserIds } from "./redux/features/chatUsersSlice";

export const userSignIn = async (navigate: NavigateFunction, data: { email: string, password: string }, dispatch: Dispatch
) => {
  await axios.post("http://localhost:5000/user/signin", data).then(res => {
    console.log(res.data)

    if (res.data.token) {
      const token = res.data.token
      localStorage.setItem("token", token)
      console.log(res.data)
      dispatch(changeTheUserState({ loggedIn: true, id: res.data.user.id }))
      navigate("/conversations")
    } else {
      alert(res.data)
    }
  })
}


export const userSignInWithToken = async (token: string, navigate: NavigateFunction, dispatch: Dispatch, socket:Socket, user:{loggedIn:Boolean, id:number}) => {
  const decoded: decodedJWT = jwt_decode(token)
  if (decoded.exp < Date.now() / 1000) {
    localStorage.removeItem('token')
  }
  await axios.get("http://localhost:5000/user/signinwithtoken", { headers: { token } }).then((res) => {
    //Another way to validate the token
    // if (res.data.currentUser) {
    dispatch(changeTheUserState({ loggedIn: true, id: res.data.id }))
    dispatch(addConversations(res.data.conversations))
    navigate("/conversations")
    // }
  })
  socket?.emit('join', (user.id));

}


export const signUp = async (user: User, navigate: NavigateFunction, dispatch: Dispatch) => {
  await axios.post('http://localhost:5000/user/signup', user)
    .then((response) => {
      console.log(response.data.token);
      localStorage.setItem('token', response.data.token);
      dispatch(changeTheUserState({ loggedIn: true, id: response.data.id }))
      navigate("/conversations")
    })
}

export const verifySignIn = async (token: { token: string }, dispatch: Dispatch) => {
  await axios.post('http://localhost:5000/user/details', token)
    .then(response => {
      if (response.data.currentUser) {
        console.log(response.data);
        dispatch(changeTheUserState({ loggedIn: true, id: response.data.id }))
      }
    });
}



export const sendMessage = async (data: {
  body: string;
  id: number
}) => {
  await axios.post('http://localhost:5000/messages/', data)
}


export const getMessages = async (dispatch: Dispatch) => {
  await axios.get("http://localhost:5000/messages/all").then(res => { dispatch(messages(res.data)) })
}


export const getUserConversations = async (dispatch: Dispatch) => {
  await axios.get("http://localhost:5000/conversations").then(res => { dispatch(getChat(res.data)) })
}

export const getUsers = async (dispatch: Dispatch) => {
  await axios.get('http://localhost:5000/user').then(res => { dispatch(getAllUsers(res.data)) })
}

export const newConversation = async (token: string, data: {
  userIds: number[],
  title: string,
  id: number
}) => {
  await axios.post('http://localhost:5000/conversations', data, { headers: { token } })
}

export const getChatDetails = (id: string, dispatch: Dispatch) => {
  axios.get(`http://localhost:5000/conversations/${id}`).then(res => {dispatch(addUserIds(res.data.users.map((user:User)=>user.id))) ;console.log(res.data.users)} )
}


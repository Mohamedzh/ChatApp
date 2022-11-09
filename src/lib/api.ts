import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { Dispatch } from "redux";
import { chatMessages, messages } from "../redux/features/messages-slice";
import { changeTheUserState } from "../redux/features/UserSlice";
import { decodedJWT, User } from "../types";
import jwt_decode from "jwt-decode"
import { getAllUsers } from "../redux/features/allUsersSlice";
import { addConversations, addUserIds } from "../redux/features/chatUsersSlice";

export const userSignIn = async (navigate: NavigateFunction, data: { email: string, password: string }, dispatch: Dispatch
) => {
  await axios.post(`${process.env.REACT_APP_BASE_URL}/user/signin`, data).then(res => {
    // console.log(res.data)
    if (res.data.token) {
      const token = res.data.token
      localStorage.setItem("token", token)
      // console.log(res.data)
      dispatch(changeTheUserState({ loggedIn: true, id: res.data.user.id, firstName: res.data.user.firstName }))
      navigate("/conversations")
    } else {
      alert(res.data)
    }
  })
}


export const userSignInWithToken = async (token: string, navigate: NavigateFunction, dispatch: Dispatch, user: { loggedIn: Boolean, id: number }) => {
  const decoded: decodedJWT = jwt_decode(token)
  if (decoded.exp < Date.now() / 1000) {
    localStorage.removeItem('token')
  }
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/signinwithtoken`, { headers: { token } })
    // console.log(res);

    //Another way to validate the token
    // if (res.data.currentUser) {
    dispatch(changeTheUserState({ loggedIn: true, id: res.data.id, firstName: res.data.firstName }))
    dispatch(addConversations(res.data.conversations))
    navigate("/conversations")
  } catch (error) {
    console.log(error)
  }
}
// }
// })

// }


export const signUp = async (user: User, navigate: NavigateFunction, dispatch: Dispatch) => {
  await axios.post(`${process.env.REACT_APP_BASE_URL}/user/signup`, user)
    .then((response) => {
      // console.log(response.data);
      localStorage.setItem('token', response.data.token);
      dispatch(changeTheUserState({ loggedIn: true, id: response.data.id, firstName: response.data.firstName }))
      navigate("/conversations")
    })
}

export const verifySignIn = async (token: { token: string }, dispatch: Dispatch) => {
  await axios.post(`${process.env.REACT_APP_BASE_URL}/user/details`, token)
    .then(response => {
      if (response.data.currentUser) {
        // console.log(response.data);
        dispatch(changeTheUserState({ loggedIn: true, id: response.data.id, firstName: response.data.firstName }))
      }
    });
}



export const sendMessage = async (data: {
  body: string,
  id: number,
  conversation: number
}) => {
  await axios.post(`${process.env.REACT_APP_BASE_URL}/messages/`, data)
}

export const sendChatMessage = async (data: {
  body: string,
  id: number,
  conversation: number
}) => {
  await axios.post(`${process.env.REACT_APP_BASE_URL}/messages`, data)
}


export const getMessages = async (dispatch: Dispatch) => {
  await axios.get(`${process.env.REACT_APP_BASE_URL}/messages/all`).then(res => { dispatch(messages(res.data)) })
}


// export const getUserConversations = async (dispatch: Dispatch) => {
//   await axios.get("http://localhost:5000/conversations").then(res => { dispatch(getChat(res.data)) })
// }

export const getUsers = async (dispatch: Dispatch, id: number) => {
  const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/user`)
  const users = res.data.filter((user: User) => user.id !== id)
  dispatch(getAllUsers(users))
}

export const newConversation = async (token: string, data: {
  userIds: number[],
  title: string,
  id: number
}) => {
  await axios.post(`${process.env.REACT_APP_BASE_URL}/conversations`, data, { headers: { token } })
}

export const getChatDetails = async (id: string, dispatch: Dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/conversations/${id}`)
    dispatch(addUserIds(res.data.users.map((user: User) => user.id)));
    dispatch(chatMessages(res.data.messages))
  } catch (error) {
    console.log(error)
  }
}


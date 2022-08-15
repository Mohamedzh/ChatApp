import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { Dispatch } from "redux";
import { changeTheProtectionValue } from "./redux/features/ProtectSlice";

export const userSignIn = async (  data:{ email: string, password: string }
) => {
  await axios.post("http://localhost:1111/user/signin", data).then(res => {
    console.log(res.data)
    localStorage.setItem("token", res.data.token)
    // dispatch(changeTheProtectionValue(true))
    // navigate("/chat")
  })


}


export const userSignInWithToken = async (token: { token: string }, navigate: NavigateFunction, dispatch: Dispatch) => {
  await axios.post("http://localhost:1111/user/signinwithtoken", token).then((res) => {
    dispatch(changeTheProtectionValue(true))
    navigate("/chat")
  })


}

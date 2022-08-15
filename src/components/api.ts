import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios'
import { logIn } from '../redux/loggedIn-slice';
import { User, loginUser } from '../types'


export const signUp = async (user: User) => {
    await axios.post('http://localhost:5000/user/signup', user)
        .then((response) => {
            console.log(response.data.token);
            localStorage.setItem('token', response.data.token);
        })
}

export const signIn = async (loginUser: loginUser) => {
    await axios.post('http://localhost:5000/user/login', loginUser)
        .then((response) => {
            console.log(response.data.token);
            localStorage.setItem('token', response.data.token);
        })
}

export const verifySignIn = async (token: {token:string}, dispatch: Dispatch) => {
    await axios.post('http://localhost:5000/user/details', token)
    .then(response => {
        if (response.data.currentUser){
        console.log(response.data);
        dispatch(logIn(true))
        }
    });
}
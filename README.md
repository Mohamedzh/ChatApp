# Chat App for Tawwr coding school

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Screenshots](#screenshots)

## General info
A chat app using socket.io and react which enables general chat between all signed-in users and individual conversations between 2 or more users

## Technologies
* react: 18.2.0
* react-icons: 4.4.0
* react-router-dom: 6.3.0
* react-bootstrap version: 2.4.0
* react-live-clock: 6.0.6
* jsonwebtoken version: 8.5.1
* jwt-decode": 3.1.2
* moment version: 2.29.4
* socket.io-client version: 4.5.1
* typescript version : 4.7.4
* reduxjs/toolkit: 1.8.3
* formik: 2.2.9
* yup: 0.32.11
* axios: 0.27.2

## Functionalities
* User signup and login with authentication using jwt tokens.
* General chat between all signed-in users, with chat history retrieved from the database.
* Individual chat rooms between 2 or more signed-in users, with chat history for each room retrieved from the database.
* Notification for users when a new user joins the conversation or when a user is writing a message.
* Users' data and chat history are stored on a postgresql database and gets called through an [API]"https://github.com/Mohamedzh/Chat-App-backend"

## Setup
To run this project, install it locally using npm:
```
npm install
npm start
```

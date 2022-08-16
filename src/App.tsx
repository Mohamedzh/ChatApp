import React, { useEffect } from 'react';
import './App.css';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Conversationlistpage from './components/Conversationlistpage';
import Chatpage from './components/Chatpage';
import Header from './components/Header';
import ProtectedRoutes from './pages/ProtectedRoutes';
import { userSignInWithToken } from './api';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';


function App() {

  const socket = io(`ws://localhost:3131`);
  socket.on('connect', () => {
    console.log('connected');
  });

  socket.on('sendMessage', (args)=>
  console.log('received a new message from server')
  )

  useEffect(() => { socket.emit('newMessage', 'a message was sent') }, [])



  const dispatch = useDispatch();
  const currentUserToken = localStorage.getItem('token') || '';
  const navigate = useNavigate();

  // if (!currentUserToken) {
  //   <Navigate to="/login" />;
  // }
  useEffect(() => {
    userSignInWithToken({ token: currentUserToken }, navigate, dispatch);
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/conversations" element={<Conversationlistpage />} />
          <Route path="/chat" element={<Chatpage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

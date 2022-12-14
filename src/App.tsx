import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ConversationListPage from './components/conversationListPage';
import ChatPage from './components/chatPage';
import Header from './components/header';
import ProtectedRoutes from './pages/ProtectedRoutes';
import { userSignInWithToken } from './lib/api';
import { useDispatch, useSelector } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import ChatDetails from './pages/ChatDetails';
import { useAppSelector } from './redux/hooks';


function App() {
  const dispatch = useDispatch();
  const user = useAppSelector(state => state.user);

  const currentUserToken = localStorage.getItem('token') || '';

  const navigate = useNavigate();

  const [socket, setSocket] = useState<Socket>()

  const getUser = async () => {
    const currentUser = await userSignInWithToken(currentUserToken, navigate, dispatch, user)
  }


  useEffect(() => {
    setSocket(io(`${process.env.REACT_APP_SOCKET_ID}`));
    getUser()
    console.log(process.env.REACT_APP_SOCKET_ID);
    
    // userSignInWithToken(currentUserToken, navigate, dispatch, socket!, user);
  }, []);

  socket?.on('connect', () => {
    console.log('connected socket');
  })

  return (
    <div className="App">
      <Header socket={socket!} />
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/conversations" element={<ConversationListPage socket={socket!} />} />
          <Route path="/conversations/:id" element={<ChatDetails socket={socket!} />} />
          <Route path="/chat" element={<ChatPage socket={socket!} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

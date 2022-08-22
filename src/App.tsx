import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ConversationListPage from './components/ConversationListPage';
import ChatPage from './components/ChatPage';
import Header from './components/Header';
import ProtectedRoutes from './pages/ProtectedRoutes';
import { getUserConversations, userSignInWithToken } from './api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { io, Socket } from 'socket.io-client';
import ChatDetails from './pages/ChatDetails';
import { socketMessages } from './redux/features/messages-slice';
import { useAppSelector } from './redux/hooks';


function App() {
  const dispatch = useDispatch();
  const user = useAppSelector(state => state.user);

  const currentUserToken = localStorage.getItem('token') || '';

  const navigate = useNavigate();

  const data = useSelector((state: RootState) => state.user);
  console.log(data);

  const [socket, setSocket] = useState<Socket>()

  const getUser = async () => {
    const currentUser = await userSignInWithToken(currentUserToken, navigate, dispatch, socket!, user)
  }


  useEffect(() => {
    setSocket(io('ws://localhost:3131'));
    getUser()
    // userSignInWithToken(currentUserToken, navigate, dispatch, socket!, user);
  }, []);

  // socket?.on('connect', () => {
  //   socket?.emit('join', user.id);
  // })

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

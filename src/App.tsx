import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Conversationlistpage from './components/Conversationlistpage';
import Chatpage from './components/Chatpage';
import Header from './components/Header';
import ProtectedRoutes from './pages/ProtectedRoutes';
import { userSignInWithToken } from './api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';


function App() {
  const dispatch = useDispatch();
  const currentUserToken = localStorage.getItem('token') || '';
  const navigate = useNavigate();

  const data = useSelector((state: RootState) => state.user);
  console.log(data);

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

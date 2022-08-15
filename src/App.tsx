import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Conversationlistpage from './components/Conversationlistpage';
import Chatpage from './components/Chatpage';
import Header from './components/Header';
import { useAppDispatch, useAppSelector } from './App/hooks';
import { VerifyUser } from './components/functions';

function App() {
  
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const loggedIn = useAppSelector(state => state.loggedIn)

  useEffect(() => { VerifyUser(navigate, dispatch) }, [])
  
  console.log(loggedIn)


  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/conversations" element={<Conversationlistpage />} />
        <Route path="/chat" element={<Chatpage />} />
      </Routes>
    </div>
  );
}

export default App;

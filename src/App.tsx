import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Conversationlistpage from './components/Conversationlistpage';
import  Chatpage from './components/Chatpage'


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/conversations" element={<Conversationlistpage/>}/>
        <Route path="/chat" element={<Chatpage/>}/>
      </Routes>
    </div>
  );
}

export default App;

import React from 'react';
import { Container } from 'react-bootstrap';
import Chatbox from './Chatbox';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { sendMessage } from '../api';

type Props = {};
const Chatpage = (props: Props) => {
  const name = useSelector((state: RootState) => state.user.name);

  const socket = io('ws://localhost:3131');

  const [message, setMessage] = useState('');
  // const loggedIn = useAppSelector(state => state.loggedIn)

  const messageHandler = (event: any) => {
    setMessage(event.target.value);
  };

  socket.on('userMessage', (arg) => {
    console.log(arg);
  });

  // messageBody:is the massage which we are sending as prams from the funcation in chatbox comp

  const sendHandler = (messageBody: string, name: string) => {
    socket.emit('newMessage', { body: messageBody, userName: name });
    const messageData = {
      body: message,
      userName: name,
    };

    sendMessage(messageData);
    
  };


  return (
    <div>
      <>
        <div id="hero">
          <Container className="p-3">
            <Chatbox
              messageHandler={messageHandler}
              message={message}
              sendHandler={sendHandler}
            />
          </Container>
        </div>
      </>
    </div>
  );
};

export default Chatpage;

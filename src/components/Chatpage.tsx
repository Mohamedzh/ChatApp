import React from 'react';
import { Container } from 'react-bootstrap';
import Chatbox from './Chatbox';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { getMessages, sendMessage } from '../api';
import { socketMessages } from '../redux/features/messages-slice';

type Props = {};
const Chatpage = (props: Props) => {
  const dispatch = useDispatch()
  const id = useSelector((state: RootState) => state.user.id);

  const socket = io('ws://localhost:3131');

  // useEffect(()=>{
  //   socket.on('sendMessage', (socket) => { dispatch(socketMessages(socket)); console.log(socket) })
  // },[socket])

  socket.on('sendMessage', (socket) => { 
    dispatch(socketMessages(socket)); console.log(socket)
   })
  //  socket.off('sendMessage')


  const [message, setMessage] = useState('');


  const messageHandler = (event: any) => {
    setMessage(event.target.value);
  };

  // messageBody:is the massage which we are sending as prams from the funcation in chatbox comp

  const sendHandler = (messageBody: string, id: number) => {
    socket.emit('newMessage', { body: messageBody, id });
    const messageData = {
      body: message,
      id: id,
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

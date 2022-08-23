import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Chatbox from './Chatbox';
import io, { Socket } from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage } from '../api';
import { socketMessages } from '../redux/features/messages-slice';
import { useAppSelector } from '../redux/hooks';

type Props = {
  socket: Socket
};

const ChatPage = ({ socket }: Props) => {
  const dispatch = useDispatch();
  const user = useAppSelector(state => state.user);
  const [text, setText] = useState<string>()


  useEffect(() => {
    socket?.on('sendMessage', (message) => { dispatch(socketMessages(message)); console.log(message) })
    socket?.on('typing', (text) => {
      setText(text)
      setTimeout(() => {
        setText('')
      }, 3000)

    })

  }, [socket])

  // socket?.on('connect', () => {
  //   console.log(`joining room ${user.id}`)
  //   socket?.emit('join', (user.id));
  // });


  const [message, setMessage] = useState<string>('');

  const messageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };


  const sendHandler = (messageBody: string, id: number, conversation: number) => {
    socket?.emit('newMessage', { body: messageBody, id });
    const messageData = {
      body: message,
      id,
      conversation
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
              socket={socket}
              text={text!}
            />
          </Container>
        </div>
      </>
    </div>
  );
};

export default ChatPage;

import React, { useEffect } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getMessages } from '../api';
import moment from 'moment';

type Props = {
  message: string;
  messageHandler: Function;
  sendHandler: Function;
};

const Chatbox = ({ message, messageHandler, sendHandler }: Props) => {
  
  const dispatch = useDispatch();
  const id = useSelector((state: RootState) => state.user.id);
  const allMessages = useSelector((state: RootState) => state.message.allMessages);

  
  useEffect(() => {
    getMessages(dispatch);
  }, []);

  return (
    <div>
      <div
      className="chatPageDiv"
      >
        {allMessages.map((msg, idx) => (
          <div
          className='chatBoxMessages'
            key={idx}
            // className={msg.name === 'Me' ? 'myCard' : 'usersCard'}
          >
            <b>{msg.user?.firstName}</b>
            <br />
            <p>{msg.body}</p>
            <p
              style={{
                alignSelf: 'flex-end',
                color: '#00000070',
              }}
            >
              {moment(msg.createdAt).format('MMMM Do YYYY, h:mm a')}
            </p>
          </div>
        ))}
        <div style={{ marginTop: '150px', display: 'flex' }}>
          <InputGroup className="mb-3">
            <Form.Control
              style={{ height: '60px' }}
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              onChange={(e) => {
                messageHandler(e);
              }}
              value={message}
            />
            <Button
              onClick={(e) => sendHandler(message, id)}
              variant="secondary"
              id="button-addon2"
            >
              Send
            </Button>
          </InputGroup>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;

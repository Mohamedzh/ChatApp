import React, { useEffect } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getMessages } from '../api';
import moment from 'moment';
import { sendHandler } from './functions'
import { Socket } from 'socket.io-client';
import { useFormik } from 'formik';
import * as Yup from 'yup';


type Props = {
  message: string;
  messageHandler: Function;
  socket: Socket
};

const Chatbox = ({ message, messageHandler, socket }: Props) => {

  const dispatch = useDispatch();
  const id = useSelector((state: RootState) => state.user.id);
  const allMessages = useSelector((state: RootState) => state.message.allMessages);


  useEffect(() => {
    getMessages(dispatch);
  }, []);

  const formik = useFormik({
    initialValues: {
      message: ''
    },
    onSubmit: (values) => {
      sendHandler(values.message, id, 0, socket)
      // chatSendHandler(userId, socket, values.message, chatId, currentUserIds, firstName)
      // console.log(currentUserIds);
      // scrollToBottom()
      window.scrollTo(0, 0);
      formik.resetForm();
    },
    validationSchema: Yup.object({
      message: Yup.string().required('Please enter your message'),
    }),
  });

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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
              name="message"
              // onChange={(e) => {
              //   messageHandler(e);
              // }}
              // value={message}
            />
            <Button
              onClick={() => formik.handleSubmit()}
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

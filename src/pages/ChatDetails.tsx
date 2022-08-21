import React, { useEffect } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getChatDetails } from '../api';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppSelector } from '../redux/hooks';
import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';



type Props = {
    socket: Socket
}

function ChatDetails({ socket }: Props) {
    const { id } = useParams();

    const dispatch = useDispatch();
    const userId = useAppSelector(state => state.user.id);

    const currentUserIds = useAppSelector(state => state.chatUsers.currentUserIds)
    const allMessages = useAppSelector(state => state.message);

    const sendToUserSocket = (message: string, userIds: number[]) => {
        socket?.emit('aMessage', {
            body: message,
            userIds
        })
    }

    useEffect(() => {
        socket?.on('aMessage', args => console.log(args))
        // return ()=> {
        //     socket?.off('aMessage')
        // }
    }, []);


    useEffect(() => {
        getChatDetails(id!, dispatch);
    }, []);

    const formik = useFormik({
        initialValues: {
            message: ''
        },
        onSubmit: (values) => {
            sendToUserSocket(values.message, currentUserIds)
            console.log(currentUserIds);
            formik.resetForm();
        },
        validationSchema: Yup.object({
            message: Yup.string().required('Please enter a title'),
        }),
    });
    return (
        <div>
            <div
                style={{
                    minHeight: '80vh',
                    backgroundColor: '#eeeeee',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '5px',
                    padding: '20px',
                    paddingBottom: '40px',
                }}
            >
                {allMessages.map((msg, idx) => (
                    <div
                        key={idx}
                        // className={msg.name === 'Me' ? 'myCard' : 'usersCard'}
                        style={{
                            width: '65%',
                            backgroundColor: 'white',
                            borderRadius: '5px',
                            padding: '25px',
                            marginTop: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
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
                        />
                        {formik.touched.message && formik.errors.message ? (
                            <span className="errorText">{formik.errors.message}</span>
                        ) : null}
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
    )
}
export default ChatDetails
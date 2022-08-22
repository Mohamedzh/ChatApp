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
    const allMessages = useAppSelector(state => state.message.chatMessages);

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
                        className="chatBoxMessages"
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
                        />
                        <Button
                            type="submit"
                            onClick={() => formik.handleSubmit()}
                            variant="secondary"
                            id="button-addon2"
                        >
                            Send
                        </Button>

                    </InputGroup>

                </div>
                <div>
                    {formik.touched.message && formik.errors.message ? (
                        <p className="errorText">{formik.errors.message}</p>
                    ) : null}
                </div>
            </div>
        </div>
    )
}
export default ChatDetails
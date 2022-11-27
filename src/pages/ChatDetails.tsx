import React, { useEffect, useState } from 'react';
import { Button, Container, Form, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getChatDetails } from '../lib/api';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppSelector } from '../redux/hooks';
import { useParams } from 'react-router-dom';
import { chatSendHandler } from '../lib/functions';
import { chatSocketMessages } from '../redux/features/messages-slice';
import ScrollToBottom, { useScrollToBottom } from 'react-scroll-to-bottom';
import { AppProps } from '../types';


function ChatDetails({ socket }: AppProps) {
    const { id } = useParams()
    const chatId = +id!
    const scrollToBottom = useScrollToBottom()
    const dispatch = useDispatch();
    const userId = useAppSelector(state => state.user.id);
    const firstName = useAppSelector(state => state.user.firstName);

    const currentUserIds = useAppSelector(state => state.chatUsers.currentUserIds)
    const allMessages = useAppSelector(state => state.message.chatMessages);

    const [joinMsg, setJoinMsg] = useState<string>()

    useEffect(() => {
        socket?.on('aMessage', args => {
            dispatch(chatSocketMessages(args))
        })
        // return ()=> {
        //     socket?.off('aMessage')
        // }
        socket?.on('joinMsg', text => { setJoinMsg(text) })
    }, []);


    useEffect(() => {
        getChatDetails(id!, dispatch);
        scrollToBottom()
    }, []);

    const formik = useFormik({
        initialValues: {
            message: ''
        },
        onSubmit: (values) => {
            chatSendHandler(userId, socket!, values.message, chatId, currentUserIds, firstName)
            scrollToBottom()
            window.scrollTo(0, 0);
            formik.resetForm();
        },
        validationSchema: Yup.object({
            message: Yup.string().required('Please enter your message'),
        }),
    });
    return (
        <div>
            <>
                <div id="hero">
                    <Container className="p-3">

                        <div>
                            <ScrollToBottom>
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
                                    <h4
                                    // style={{
                                    //     color: '#00000070',}}
                                    >{joinMsg}</h4>
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
                            </ScrollToBottom>

                        </div>
                    </Container>
                </div>
            </>
        </div >
    )
}
export default ChatDetails
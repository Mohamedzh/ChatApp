import React, { useEffect } from 'react';
import { Card, Image } from 'react-bootstrap';
import useImg from '../assets/img/32.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { useAppSelector } from '../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { AppProps } from '../types';

const Cards = ({ socket }: AppProps) => {
  const user = useAppSelector(state => state.user);
  const userChats = useAppSelector((state) => state.chatUsers.currentChat);

  const navigate = useNavigate()

  const dispatch = useDispatch();
  
  const sendJoin = (chatId: number, id: number) => {
    const chat = userChats.find(chat => chat.id === chatId)
    const userIds = chat!.users.map((user) => user.id)
    const otherIds = userIds.filter(id=>id!==user.id)
    socket?.emit('userJoin',
      { data: `user ${user.id} joined the conversation`, ids: otherIds })
    navigate(`/conversations/${chat?.id}`)
  }

  return (
    <div>
      {userChats.map((chat) => (
        <Card
          className="conversationCard"
          onClick={() =>
            sendJoin(chat.id, user.id)
          }
          key={chat.id}
        >
          <Card.Body>
            <div className="d-flex">
              <div className="flex-shrink-0">
                <Image
                  roundedCircle
                  style={{
                    width: '50px',
                    height: '50px',
                  }}
                  src={useImg}
                  alt="userImg"
                />
              </div>
              <div className="flex-grow-1 ms-3">
                <div>
                  <b>
                    {chat.title}
                  </b>
                </div>
                <div>
                  <p style={{ color: '#00000070' }}>
                    {/* with {chat.users[1].firstName} */}
                  </p>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Cards;

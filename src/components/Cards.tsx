import React, { useEffect } from 'react';
import { Card, Image } from 'react-bootstrap';
import useImg from '../assets/img/32.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { getUserConversations } from '../api';
import { useAppSelector } from '../redux/hooks';
import { useNavigate } from 'react-router-dom';

const Cards = () => {
  const user = useAppSelector(state => state.user);
  const userChats = useAppSelector((state) => state.chatUsers.currentChat);

  const navigate = useNavigate()

  const dispatch = useDispatch();
  useEffect(() => {
    getUserConversations(dispatch);
  }, []);
  
  return (
    <div>
      {userChats.map((chat) => (
        <Card
        className="conversationCard"
          onClick={() => navigate(`/conversations/${chat.id}`)}
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

import React, { useEffect } from 'react';
import { Card, Image } from 'react-bootstrap';
import useImg from '../assets/img/32.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { getUserConversations } from '../api';
import { useAppSelector } from '../redux/hooks';
import { useNavigate } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

type Props = {};
const Cards = (props: Props) => {
  const user = useAppSelector(state => state.user);
  const userChats = useAppSelector((state) => state.chatUsers.current);
  console.log(userChats)

  console.log(user.id)
  const navigate = useNavigate()

  const dispatch = useDispatch();
  useEffect(() => {
    getUserConversations(dispatch);
  }, []);
  
  return (
    <div>
      {userChats.map((chat) => (
        <Card
          onClick={() => navigate(`/conversations/${chat.id}`)}
          key={chat.id}
          style={{
            width: '22rem',
            height: '6rem',
            marginTop: '20px',
            backgroundColor: '#F8F5F5',
            cursor: 'pointer',
          }}
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

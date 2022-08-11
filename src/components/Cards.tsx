import React from 'react';
import { Card, Image } from 'react-bootstrap';
import { User } from '../types';
import useImg from '../assets/img/32.jpg';

type Props = {};

const Cards = (props: Props) => {
  const fakeData = [
    {
      id: 1,
      userName: 'iisenor0',
      body: 'Hello!',
      img: useImg,
    },
    {
      id: 2,
      userName: 'jmccue1',
      body: 'Hello!',
      img: useImg,
    },
    {
      id: 3,
      userName: 'odimmock2',
      body: 'Hello!',
      img: useImg,
    },
    {
      id: 4,
      userName: 'vbeverley3',
      body: 'Hello!',
      img: useImg,
    },
    {
      id: 5,
      userName: 'kletixier4',
      body: 'Hello!',
      img: useImg,
    },
    {
      id: 6,
      userName: 'kgiffkins5',
      body: 'Hello!',
      img: useImg,
    },
  ];

  return (
    <div>
      {fakeData.map((user: User) => (
        <Card
          key={user.id}
          style={{
            width: '22rem',
            height: '6rem',
            marginTop: '20px',
            backgroundColor: '#F8F5F5',
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
                  src={user.img}
                  alt="userImg"
                />
              </div>
              <div className="flex-grow-1 ms-3">
                <div>
                  <b>
                    {user.userName}
                    test
                  </b>
                </div>
                <div>
                  <p style={{ color: '#00000070' }}>{user.body}</p>
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

import React from 'react';
import { Button, Card, Container, Form, InputGroup } from 'react-bootstrap';

type Props = {};

const Chatbox = (props: Props) => {
  const fakeData = [
    { name: 'user1', text: 'Hello!' },
    { name: 'Me', text: 'Hello!' },
    { name: 'user2', text: 'Hello!' },
  ];

  // const fakeMeData = [
  //   { name: 'user1', text: 'Hello!' },
  //   { name: 'user2', text: 'Hello!' },
  //   { name: 'user3', text: 'Hello!' },
  // ];

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
        {fakeData.map((msg) => (
          <div
            className={msg.name === 'Me' ? 'myCard' : 'usersCard'}
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
            <b>{msg.name}</b>
            <br />
            <p>{msg.text}</p>
            <p
              style={{
                alignSelf: 'flex-end',
                // paddingTop: '50px',
                color: '#00000070',
              }}
            >
              7:21pm
            </p>
          </div>
        ))}
        <div style={{ marginTop: '150px', display: 'flex' }}>
          <InputGroup className="mb-3">
            <Form.Control
              style={{ height: '60px' }}
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <Button variant="secondary" id="button-addon2">
              Send
            </Button>
          </InputGroup>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;

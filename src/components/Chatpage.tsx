import React from 'react';
import { Container } from 'react-bootstrap';
import Chatbox from './Chatbox';
import Header from './Header';

type Props = {};

const Chatpage = (props: Props) => {
  return (
    <>
      <Header />
      <div id="hero">
        <Container className="p-3" >
          <Chatbox />
        </Container>
      </div>
    </>
  );
};

export default Chatpage;

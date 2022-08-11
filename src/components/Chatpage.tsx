import React from 'react';
import { Container } from 'react-bootstrap';
import Chatbox from './Chatbox';

type Props = {};

const Chatpage = (props: Props) => {
  return (
    <div>
      {' '}
      <>
        <div id="hero">
          <Container className="p-3">
            <Chatbox />
          </Container>
        </div>
      </>
    </div>
  );
};

export default Chatpage;

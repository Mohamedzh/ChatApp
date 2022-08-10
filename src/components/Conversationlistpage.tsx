import React from 'react';
import Header from './Header';
// import Hero from '../utilities/img/pg.jpg';
import Cards from './Cards';
import { Container } from 'react-bootstrap';
type Props = {};

const Conversationlistpage = (props: Props) => {
  return (
    <>
      <Header />
      <div id="hero">
        <Container className="pt-5 pb-5 ">
          <Cards />
          
        </Container>
      </div>
    </>
  );
};

export default Conversationlistpage;

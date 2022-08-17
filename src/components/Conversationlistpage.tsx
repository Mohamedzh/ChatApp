import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useAppSelector } from '../redux/hooks';
import  Cards  from './Cards';

type Props = {};

const Conversationlistpage = (props: Props) => {
  return (
    <>
      <div id="hero">
        <Container className="pt-5 pb-5 ">
          <Cards />
        </Container>
      </div>
    </>
  );
};

export default Conversationlistpage;

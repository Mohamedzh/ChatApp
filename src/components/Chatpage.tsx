import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../App/hooks';
import Chatbox from './Chatbox';
import { VerifyUser } from './functions';

type Props = {};

const Chatpage = (props: Props) => {
  // const navigate = useNavigate()
  // const dispatch = useAppDispatch()
  const loggedIn = useAppSelector(state => state.loggedIn)

  // useEffect(() => { VerifyUser(navigate, dispatch) }, [])
  // console.log(loggedIn)

  return (

    <div>
      {loggedIn === true &&
      <>
        <div id="hero">
          <Container className="p-3">
            <Chatbox />
          </Container>
        </div>
      </>}
    </div>
  );
};

export default Chatpage;

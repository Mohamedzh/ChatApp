import React from 'react';
import { Row, Col } from 'react-bootstrap';
import SignUpForm from '../components/signUpForm';

const SignUp = () => {
  return (
    <div>
      <Row className="signRow">
        <Col id="signup"></Col>
        <Col className="formColumn d-flex justify-content-center">
          <SignUpForm />
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;

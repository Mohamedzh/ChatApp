import React from 'react';
import { Row, Col,} from 'react-bootstrap';
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <div>
      <Row className="mx-0">
        <Col id="login"></Col>
        <Col className="formColumn d-flex justify-content-center">
          <LoginForm />
        </Col>
      </Row>
    </div>
  );
};

export default Login;

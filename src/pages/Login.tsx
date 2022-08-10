import React from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { Link} from 'react-router-dom'
import LoginForm from '../components/LoginForm'

const Login = () => {
    return (
        <div>
            <Row clasName="mx-0">
                <Col id="login">

                </Col>
                <Col className="formColumn d-flex justify-content-center">
                    <LoginForm/>
                </Col>
            </Row>
        </div>
    )
}

export default Login
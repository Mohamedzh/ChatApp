import React from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import SignUpForm from '../components/SignUpForm'

const SignUp = () => {
    return (
        <div>
            <Row className="signRow">
                <Col id="signup">

                </Col>
                <Col className="formColumn d-flex justify-content-center">
                    
                    <SignUpForm/>
                    
                </Col>
                
            </Row>
        </div>
    )
}

export default SignUp
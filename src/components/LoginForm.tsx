import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { signIn } from './api'



const LoginForm = () => {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: (values) => {
            console.log(values)
            signIn(values);
            formik.resetForm();
        },
        validationSchema:
            Yup.object({
                email: Yup.string().required("Please enter your email"),
                password: Yup.string().required("Please enter your password"),
            }),
    })

    return (


        <div className='d-flex flex-column w-72 justify-content-center my-5'>
            <Form>
                
                <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    name="email" />
                    {formik.touched.email && formik.errors.email ? (
            <span className="errorText">{formik.errors.email}</span>
          ) : null}
                </Form.Group>

                <Form.Group className="mb-3 text-start" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    name="password" />
                    {formik.touched.password && formik.errors.password ? (
            <span className="errorText">{formik.errors.password}</span>
          ) : null}
                </Form.Group>
            </Form>
            <Button variant="secondary" type="submit" className="mt-5" onClick={()=>formik.handleSubmit()}>
                Login
            </Button>
            <p className='text-center	'>Don't have an account? <Link to='/'>SignUp</Link></p>
        </div>
    )
}

export default LoginForm
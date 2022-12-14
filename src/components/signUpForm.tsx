import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../lib/api';
import { useDispatch } from 'react-redux';
import { User } from '../types';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      signUp(values as User, navigate, dispatch);
      formik.resetForm();
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Please enter your first name'),
      lastName: Yup.string().required('Please enter your last name'),
      email: Yup.string().required('Please enter your email'),
      password: Yup.string().required('Please enter your password'),
    }),
  });

  return (
    <div className="d-flex flex-column w-72 justify-content-center my-5">
      <Form>
        <Form.Group className="mb-3 text-start" controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            name="firstName"
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <span className="errorText">{formik.errors.firstName}</span>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3 text-start" controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            name="lastName"
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <span className="errorText">{formik.errors.lastName}</span>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            name="email"
          />
          {formik.touched.email && formik.errors.email ? (
            <span className="errorText">{formik.errors.email}</span>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3 text-start" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            name="password"
          />
          {formik.touched.password && formik.errors.password ? (
            <span className="errorText">{formik.errors.password}</span>
          ) : null}
        </Form.Group>
      </Form>
      <Button
        variant="outline-secondary"
        type="submit"
        className="mt-5"
        onClick={() => formik.handleSubmit()}
      >
        SignUp
      </Button>
      <p className="text-center	">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default SignUpForm;

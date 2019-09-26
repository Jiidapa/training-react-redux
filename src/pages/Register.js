import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js'

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Name is Required'),
    password: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Password is Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Email is Required'),
});


export default class Register extends Component {
    register = async (values) => {
        try {
            const apiUrl ='https://shop-backendapi.herokuapp.com/api/user/register';
            const response = await axios.post(apiUrl, values)
            if(response.status === 201){
                Swal.fire('ลงทะเบียนสำเร็จ','', 'success')
            }
        } catch (error) {
            Swal.fire('Oops...', error, 'error')
        }
    }
    render() {
        return (
            <>
                <div className="container my-5">
                    <div className="row justify-content-center">
                        <div className="col-md-7">
                            <h1>ลงทะเบียน</h1>

                            <Formik
                                initialValues={{
                                    name: '',
                                    email: '',
                                    password: '',
                                }}
                                validationSchema={SignupSchema}
                                onSubmit={values => {
                                    this.register(values)
                                }}
                            >
                                {({ errors, touched }) => (
                                    <Form noValidate>
                                        <div className="form-group">
                                            <label>Fullname</label>
                                            <Field name="name"
                                                className={`form-control ${touched.name ? errors.name ? 'is-invalid' : 'is-valid' : ''}`}
                                                placeholder="Fullname" />
                                            <ErrorMessage name="name" className="invalid-feedback" component="div" />
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <Field name="email"
                                                className={`form-control ${touched.email ? errors.email ? 'is-invalid' : 'is-valid' : ''}`}
                                                placeholder="Email" />
                                            <ErrorMessage name="email" className="invalid-feedback" component="div" />
                                        </div>
                                        <div className="form-group">
                                            <label>Password</label>
                                            <Field name="password"
                                                type="password"
                                                className={`form-control ${touched.password ? errors.password ? 'is-invalid' : 'is-valid' : ''}`}
                                                placeholder="Password" />
                                            <ErrorMessage name="password" className="invalid-feedback" component="div" />
                                        </div>
                                        <button className="btn btn-info" type="submit">Submit</button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

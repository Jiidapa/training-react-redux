import React, { Component } from 'react'

import { Formik, Form, Field } from "formik";
import axios from 'axios';

export default class Login extends Component {

    state = {
        profile: null,
        isLogin: false
    }

    login = async (values) => {
        try {
            let apiUrl = 'https://shop-backendapi.herokuapp.com/api/user/login';
            let response = await axios.post(apiUrl, values)

            localStorage.setItem('token', JSON.stringify(response.data))
            const token = JSON.parse(localStorage.getItem('token'))
            apiUrl = 'https://shop-backendapi.herokuapp.com/api/user/me';
            response = await axios.get(apiUrl, {
                headers: {
                    Authorization: 'Bearer ' + token.access_token
                }
            })

            localStorage.setItem('profile', JSON.stringify(response.data.user))
            this.setState({
                profile: response.data.user,
                isLogin: true
            })
        } catch (error) {
            this.setState({
                isLogin: false
            })
        }
    }
    logout = () => {
        localStorage.removeItem('token') //ลบข้อมูลของ token ออกจาก localStorage
        localStorage.removeItem('profile') //ลบข้อมูลของ profile ออกจาก localStorage

        //set state ให้กลายเป็นค่า default
        this.setState({
            isLogin: false,
            profile: null
        })
    }

    componentDidMount() {
        const profile = JSON.parse(localStorage.getItem('profile'));
        if (profile) {
            this.setState({
                profile: profile,
                isLogin: true
            })
        }
        else {
            this.logout()
        }
    }

    render() {
        return (
            <>
                {
                    this.state.isLogin ? (
                        <span className="navbar-text" style={{fontSize: '1.2rem', color:'#fff'}}>
                            ยินดีต้อนรับ คุณ {this.state.profile.name}
                            <button className="btn btn-danger ml-2 btn-sm" onClick={this.logout}>Logout</button>
                        </span>
                    ) : (
                            <Formik
                                onSubmit={(values, { setSubmitting }) => {

                                    this.login(values)

                                    setSubmitting(false);

                                }}
                                initialValues={{
                                    email: '',
                                    password: '',
                                }}
                            >
                                {

                                    ({
                                        handleSubmit,
                                        handleChange,
                                        isSubmitting
                                    }) => (
                                            <Form className="form-inline">


                                                <div className="form-group">
                                                    <Field
                                                        type="email"
                                                        name="email"
                                                        placeholder="Email"
                                                        autoComplete="username"
                                                        className="form-control mr-sm-2"
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <Field
                                                        type="password"
                                                        name="password"
                                                        placeholder="Password"
                                                        autoComplete="new-password"
                                                        className="form-control mr-sm-2"
                                                    />
                                                </div>

                                                <button
                                                    type="submit"
                                                    className="btn btn-success my-2 my-sm-0"
                                                    disabled={isSubmitting}
                                                >
                                                    Log In
                                                </button>


                                            </Form>
                                        )

                                }
                            </Formik>
                        )
                }
            </>
        )
    }
}

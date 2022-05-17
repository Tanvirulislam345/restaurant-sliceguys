import React from 'react';

import { Alert, Container, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './SignUp.css';
import initializaAuthentication from './firebase/firebase.init';
import useAuth from '../../Context/useAuth';

initializaAuthentication();

const SignUp = () => {
    const { registerUser, allerrors } = useAuth();

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = data => {
        const newData = {
            ...data,
            "role": "user",
        }
        registerUser(newData);
        reset();
    };

    return (
        <Paper className="signUpCover">
            <Container className="signUpContainer">
                <div className='signupHeading'>
                    <h1>Sign Up</h1>
                    <h2>Create an account</h2>
                    <small className="smallText">signUp a new account in one mimute</small>
                </div>
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                    <input
                        className="inputField"
                        type="text"
                        {...register("username")}
                        placeholder="Enter FullName"
                        required
                    /><br />
                    <input
                        className="inputField"
                        type="email"
                        {...register("email")}
                        placeholder="Enter email"
                        required
                    /><br />
                    <input
                        className="inputField"
                        type="password"
                        {...register("password")}
                        placeholder="Enter password"
                        required
                    /><br />

                    <input type="submit" value="Register" className="inputField btn-regular" />

                    {allerrors && <Alert severity="error" style={{ marginTop: '20px' }}>
                        {allerrors}
                    </Alert>}
                </form>
                <p className="txt mt-2">
                    <small className="smallText">are you already registered?</small>
                    <Link to='/signin' className="regTolog">Login</Link>
                </p>
            </Container>
        </Paper>
    );
};

export default SignUp;
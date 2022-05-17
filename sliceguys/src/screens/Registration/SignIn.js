import { Alert, Container, Paper } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../Context/useAuth';
import ForgetPassword from './ForgetPassword';
import './SignUp.css';

const SignIn = () => {

    const {userSignIn, allerrors} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        console.log(data);
        userSignIn(data, navigate, location);
    };

    return (
        <Paper className="signUpCover">
            <Container className="signUpContainer">
                <div className='signupHeading'>
                    <h1>Welcome Back</h1>
                </div>
                <form className="form" onSubmit={handleSubmit(onSubmit)}>

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

                    <input type="submit" value="Login" className="inputField btn-regular" />
          {allerrors && <Alert severity="error" style={{ marginTop: '20px' }}>
                    {allerrors}
                    </Alert>}
                </form>
                <ForgetPassword></ForgetPassword>
                <p className="txt mt-2">
                    <small className="smallText">are you new user?</small>
                    <Link to='/signup' className="regTolog">Register</Link>
                </p>
              
            </Container>
        </Paper>
    );
};

export default SignIn;
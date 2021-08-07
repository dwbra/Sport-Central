import React, {useState} from 'react'
import GoogleLogin from 'react-google-login';
import {Container, Paper, Typography, Avatar, Button, Grid } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input.js'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {signin, signup} from '../../actions/auth.js'
import Icon from './icon';
import { AUTH } from '../../constants/actionTypes';
import CONFIG from '../config.json'

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setisSignup] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = (e) => {



        e.preventDefault()

        if(isSignup) {
            console.log("sign up");
            try {
                
                dispatch(signup(formData, history))
            } catch (error) {
                console.log("auth",error);
            }
        } else {
            try {
                dispatch(signin(formData, history))
            } catch (error) {
                console.log("auth",error);
            }
        }
    }

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value.trim()})
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
    
        try {
          dispatch({ type: AUTH, data: { result, token } });
    
          history.push('/home');
        } catch (error) {
          console.log(error);
        }
      };
    
      const googleError = (error) => {
        console.log(error)
      }

    const switchMode = () => {
        setisSignup((previsSignup) => !previsSignup)
        handleShowPassword(false)
    }

    return (
        <div>
            <Container component="main" maxWidth="xs">
                
                <Paper elevation={3}>
                    <Avatar>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {
                                isSignup && (
                                    <>
                                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half textValue={formData.firstName}/>
                                        <Input name="lastName" label="Last Name" handleChange={handleChange} half textValue={formData.lastName}/>
                                    </>
                                )}
                                <Input  name="email" label="Email Address" type="email" handleChange={handleChange} textValue={formData.email} />
                                <Input  name="password" label="Password" handleChange={handleChange}  type="password" textValue={formData.password} />
                                { isSignup && <Input  name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" textValue={formData.confirmPassword} /> }
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            {isSignup ? 'Sign Up' : 'Sign In'}
                        </Button>
                        <GoogleLogin
                            clientId={CONFIG.GOOGLE_CLIENT_ID}
                            render={(renderProps) => (
                            <Button 
                            color="primary" 
                            fullWidth 
                            onClick={renderProps.onClick} 
                            disabled={renderProps.disabled} 
                            startIcon={<Icon />} 
                            variant="contained">
                                Google Sign In
                            </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleError}
                            cookiePolicy="single_host_origin"
                        />
                        <Grid container justify="flex-end">
                            <Grid item>
                                    <Button onClick={switchMode}>
                                        {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                                    </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </div>
    )
}

export default Auth

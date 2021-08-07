import React, {useState} from 'react'
import GoogleLogin from 'react-google-login';
import {Container, Paper, Typography, Avatar, Button, Grid} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input.js'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {signin, signup} from '../../actions/auth.js'
import Icon from './icon';
import { AUTH } from '../../constants/actionTypes';
import CONFIG from '../config.json'

// Sets the initial state of the user model fields
const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const Auth = () => {
    // Sets the initial state of showing your password to false
    const [showPassword, setShowPassword] = useState(false)
    // Sets the initial state of the login form to be false, i.e. in the log in screen and not the sign up screen
    const [isSignup, setisSignup] = useState(false)
    // Sets the initial state of the form data 
    const [formData, setFormData] = useState(initialState)
    // Calls the useHistory and useDispatch function from redux
    const dispatch = useDispatch()
    const history = useHistory()

    // handlesubmit function that checks whether the user is in the sign up or sign in page. 
    // Depending on which page they are on, the user send a post request of the formdata to the server
    // History is called in the function so that once the user is signed up or logged in, they will be pushed to the root path
    const handleSubmit = (e) => {
        e.preventDefault()

        if(isSignup) {
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))
        }
    }

    // Function to display the password if clicked
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    // handlechange for the form fields, assigning the values to the appropriate names
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    // Function to return the profile object with the google users details
    // A token is also generated from the google user successfully signing in
    // The result and token is sent to the server as a post request
    // Once the user is authenticated, they will be sent to the /home path
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
    
    //   If there is an error on google auth, the error will display
      const googleError = (error) => {
        console.log(error)
      }

    //   Button handler on whether the user is trying to sign up or log in
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
                                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                        <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                    </>
                                )}
                                <Input name="email" label="Email Address" type="email" handleChange={handleChange} />
                                <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                                { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
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
            <h1>Auth</h1>
        </div>
    )
}

export default Auth

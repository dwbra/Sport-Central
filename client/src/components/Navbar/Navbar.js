import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {AppBar, Typography, Avatar, Button, Toolbar} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'
import { useHistory, useLocation } from 'react-router-dom'
import { LOGOUT } from '../../constants/actionTypes';

const Navbar = () => {
    // Sets the initial state of the user to be localstorage user profile
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    // Initialises the redux and router-dom functions
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    // Logout function that dispatches the LOGOUT action type
    // History will then push the user to the root path and set the user state to be null
    const logout = () => {
        dispatch({type: LOGOUT})

        history.push('/')

        setUser(null)
    }

    // useEffect to set the token as the signed in users token upon authentication
    // Token is set to expire in 1 hour
    useEffect(() => {
        const token = user?.token

        // JWT
        if(token) {
            const decodedToken = decode(token)

            if(decodedToken.exp * 1000 < new Date().getTime()) logout()
        }


        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    // Navbar renders buttons that link to the various paths and components once clicked.
    // The top typography will also link to either the home or root path depending on whether the user is signed in
    return (
        <AppBar position="static" color="inherit">
            <div>
                <Typography component={Link} to={user ? '/home' : '/'} variant="h2" align="center">Sport Central</Typography>
            </div>
            <Toolbar>
                {user ? (
                    <div>
                       <Avatar alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                       <Typography variant="h6">{user.result.name}</Typography>
                       <Button component={Link} to="/home" variant="contained" color="secondary">Home</Button>
                       <Button component={Link} to="/games" variant="contained" color="secondary">Games</Button>
                       <Button component={Link} to="/create" variant="contained" color="secondary">Create</Button>
                       <Button component={Link} to="/explore" variant="contained" color="secondary">Explore</Button>
                       <Button component={Link} to="/message" variant="contained" color="primary">Message</Button>
                       <Button component={Link} to="/inbox" variant="contained" color="secondary">Inbox</Button>
                       <Button component={Link} to="/find" variant="contained" color="secondary">Find</Button>
                       <Button component={Link} to="/message2" variant="contained" color="secondary">Message2</Button>
                       <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
                    </div>                                   
                ) : (
                    <div>
                        {/* <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button> */}
                        {/* <Button component={Link} to="/create" variant="contained" color="primary">Create</Button>
                        <Button component={Link} to="/explore" variant="contained" color="primary">Explore</Button> */}
                    </div>
                )}
            </Toolbar>
        </AppBar> 
    )
}

export default Navbar

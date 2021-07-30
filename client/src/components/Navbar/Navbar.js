import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {AppBar, Typography, Avatar, Button, Toolbar} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'
import { useHistory, useLocation } from 'react-router-dom'
import { LOGOUT } from '../../constants/actionTypes';

const Navbar = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    const logout = () => {
        dispatch({type: LOGOUT})

        history.push('/')

        setUser(null)
    }

    useEffect(() => {
        const token = user?.token

        // JWT
        if(token) {
            const decodedToken = decode(token)

            if(decodedToken.exp * 1000 < new Date().getTime()) logout()
        }


        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    return (
        <AppBar position="static" color="inherit">
            <div>
                <Typography component={Link} to="/" variant="h2" align="center">Sport Central</Typography>
            </div>
            <Toolbar>
                {user ? (
                    <div>
                       <Avatar alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                       <Typography variant="h6">{user.result.name}</Typography>
                       <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
                       <Button component={Link} to="/create" variant="contained" color="secondary">Create</Button>
                       <Button component={Link} to="/explore" variant="contained" color="secondary">Explore</Button>
                    </div>                     
                ) : (
                    <div>
                        <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                        <Button component={Link} to="/create" variant="contained" color="primary">Create</Button>
                        <Button component={Link} to="/explore" variant="contained" color="primary">Explore</Button>
                        <Button component={Link} to="/message" variant="contained" color="primary">Message</Button>
                    </div>
                )}
            </Toolbar>
        </AppBar> 
    )
}

export default Navbar

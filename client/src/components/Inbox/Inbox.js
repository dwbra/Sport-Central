import React, {useState, useEffect} from 'react'
import {Button, Typography, Paper} from '@material-ui/core'
import {Link} from 'react-router-dom'
import {getMessages} from '../../api/index'

const Inbox = () => {
    const [contacts, setContacts] = useState([])
    const user = JSON.parse(localStorage.getItem("profile"));

    useEffect(() => {
        const userEmail = user.result.email;
        getMessages()
        .then((messageData) => {
            const newContacts = [];
            messageData.data.forEach(({ from, to }) => {
            // console.log(from);
            // console.log(to);
            if (userEmail === from && userEmail !== to) {
                newContacts.push({ ...newContacts, to });
            } else if (userEmail !== from && userEmail === to) {
                newContacts.push({ ...newContacts, from });
            } else {
                return
            }
            });
            setContacts(newContacts);
            // console.log(newContacts)

            for(var key in newContacts) {
                var value = newContacts[key];
                console.log(value.to)
                console.log(value.from)
                let d = document.getElementById('inboxMessages')
                d.insertAdjacentHTML('afterbegin', `<button value=${value.to || value.from}>Send a Message</button>`)
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);



    
    

    if(!user) {
        return(
            <Paper>
                <Typography variant="h2" align="center">
                    Please sign in to view your inbox
                </Typography>
                <Button component={Link} to="/auth" variant="contained" color="primary">Sign Up/Log In</Button>
            </Paper>
        )
    } else {
        return (
            <Typography variant="h2">
            <h2>Your Conversations</h2>
            <div id="inboxMessages"></div>
            </Typography>
        )
    }
}

export default Inbox

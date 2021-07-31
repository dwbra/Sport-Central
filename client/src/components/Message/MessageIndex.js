import React, {useEffect} from 'react';
import Dashboard from './Dashboard';
import { ContactsProvider } from './Providers/ContactsProvider';
import { ConversationsProvider } from './Providers/ConversationsProvider';
import {SocketProvider} from './Providers/SocketProvider';

//parent component to handle all of the children
function MessageIndex() {

    //grabbing the logged in users data
    const userData = JSON.parse(localStorage.getItem('profile'))
    console.log(userData);

    const userId = userData.result._id
    const id = userId;
    console.log(userId);

    // //getting the users email and setting it as the id to pass to all children components
    // const userEmail = userData.result.email
    // const id = userEmail

    //creating a variable to store all components and pass id down to their children
    const dashboard = (
        <SocketProvider id={id}>
        <ContactsProvider>
            <ConversationsProvider id={id}>
                <Dashboard id={id} />
            </ConversationsProvider>
        </ContactsProvider>
        </SocketProvider>
    )

    //render out the parent on the messages page
    return (
        dashboard
    )
}

export default MessageIndex;
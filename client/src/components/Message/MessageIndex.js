import React, {useEffect} from 'react';
import Dashboard from './Dashboard';
import { ContactsProvider } from './Providers/ContactsProvider';
import { ConversationsProvider } from './Providers/ConversationsProvider';
import SocketProvider from './Providers/SocketProvider';

function MessageIndex() {

    const userData = JSON.parse(localStorage.getItem('profile'))
    console.log(userData)

    const userEmail = userData.result.email
    console.log(userEmail)

    const id = userEmail

    const dashboard = (
        <SocketProvider id={id}>
        <ContactsProvider>
            <ConversationsProvider id={id}>
                <Dashboard id={id} />
            </ConversationsProvider>
        </ContactsProvider>
        </SocketProvider>
    )

    return (
        dashboard
    )
}

export default MessageIndex;
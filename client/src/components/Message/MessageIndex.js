import React, {useEffect} from 'react';
import Dashboard from './Dashboard';
import { ContactsProvider } from './Providers/ContactsProvider';

function MessageIndex() {

    const userData = JSON.parse(localStorage.getItem('profile'))
    console.log(userData)

    const userEmail = userData.result.email
    console.log(userEmail)

    const id = userEmail

    const dashboard = (
        <ContactsProvider>
            <Dashboard id={id} />
        </ContactsProvider>

    )

    return (
        dashboard
    )
}

export default MessageIndex;
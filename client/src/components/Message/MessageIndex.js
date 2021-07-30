import React, {useEffect} from 'react';
import Dashboard from './Dashboard';

function MessageIndex() {

    const userData = JSON.parse(localStorage.getItem('profile'))
    console.log(userData)

    const userEmail = userData.result.email
    console.log(userEmail)

    const id = userEmail

    const dashboard = (
        <Dashboard id={id} />
    )

    return (
        dashboard
    )
}

export default MessageIndex;
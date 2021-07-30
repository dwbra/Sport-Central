import React, {useEffect} from 'react';
import Dashboard from './Dashboard';
import { getUserEmails } from '../../api';

function MessageIndex() {

    async function userEmails() {
        const {data} = await getUserEmails();
        console.log(data);
        return data;
    }

    useEffect(() => {
        userEmails()
      }, []);

    const dashboard = (
        <Dashboard id={2} />
    )

    return (
        dashboard
    )
}

export default MessageIndex;
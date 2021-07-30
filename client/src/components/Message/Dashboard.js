import React from 'react';
import { getUserEmails } from '../../api';

function Dashboard() {

    const userEmails = getUserEmails()
    console.log(userEmails);

    return (
        <div>
            
        </div>
    )
}

export default Dashboard;
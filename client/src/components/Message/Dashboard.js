import React from 'react';
import OpenConversation from './OpenConversation';
import Sidebar from './Sidebar';
import {useConversations} from './Providers/ConversationsProvider';

//Actual view of the message component. 
function Dashboard({id}) {
    const {selectedConversation} = useConversations();

    return (
        <div className="d-flex" style={{height: '100vh'}}>
            {/* pass id (email) down from parent into sidebar */}
            <Sidebar id={id} />
            {/* if we have selected conversation, render out the conversation */}
            {selectedConversation && <OpenConversation/>}
        </div>
    )
}

export default Dashboard;
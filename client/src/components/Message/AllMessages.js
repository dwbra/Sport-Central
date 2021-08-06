import React, {useState} from 'react';
import Messages from './Messages.js';
import { TextField, Button, Box} from '@material-ui/core'

const AllMessages = () => {
    
    const [state, setState] = useState({
        running: 0,
        otherUsers: [],
        textFieldContent: '',
        currentMessagingUser: '',
    });

    const user = JSON.parse(localStorage.getItem('profile'))

    function updateTextFieldContent(i) {
        setState(state => ({
            ...state,
            textFieldContent: i.target.value,
        }));
    }

    function addUser(i) {
        let array = state.otherUsers
        if(user?.result?.email !== state.textFieldContent){
            array.push(state.textFieldContent)
            setState(state => ({
                ...state,
                otherUsers: array,
                textFieldContent: '',
            }));
        }
    }

    function openMessages(i) {
        setState(state => ({
            ...state,
            currentMessagingUser: i,
        }));
    }


    return (
        <div style={{padding: '10px', maxWidth: '100%', marginTop: '5px'}}>
            <Box borderRadius="borderRadius" border={1}>
                <Box borderRadius="borderRadius" border={1}>
                    <TextField id="message-input" label="Email Address" variant="outlined" onChange={updateTextFieldContent} value={String(state.textFieldContent)}/>
                    <Button onClick={(i) =>addUser(i)} variant="contained" color="secondary">Add to address book</Button>
                </Box>
            </Box>
            <Box borderRadius="borderRadius" border={1}>
                <Box borderRadius="borderRadius" border={1}>
                    {state.otherUsers.map((i)=>(
                        <Button key={"userbutton"+i} onClick={(e) =>openMessages(i)} variant="contained" color="secondary">{i}</Button>
                    ))}
                </Box>
                {(() => {
                    if(state.currentMessagingUser !== ''){
                        console.log("open messaging to ",state.currentMessagingUser )
                        return (
                            <Messages otherUserEmail={state.currentMessagingUser}/>
                        )
                    }
                })()}
            </Box>
        </div>
    );
};

export default AllMessages;
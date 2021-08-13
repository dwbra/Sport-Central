import React, {useState, useEffect} from 'react';
import Messages from './Messages.js';
import {useSelector} from 'react-redux'
import { TextField, Button, Box} from '@material-ui/core'

const AllMessages = ({startingUserEmail}) => {
    
    const {messages} = useSelector((state) => state.messages)

    const startWithUser = () => {
        //console.log("startingUserEmail",startingUserEmail)
        if (startingUserEmail === 'null') {
            return ([])
        } else {
            localStorage.setItem('Messaging user', null)
            return ([startingUserEmail,])
        }
    }

    const [state, setState] = useState({
        allMessage: messages,
        running: 0,
        otherUserEmail: startWithUser(),
        textFieldContent: '',
        currentMessagingUser: '',
    });

    const user = JSON.parse(localStorage.getItem('profile'))
    

    // if messages is diffort to what is in the state update it
    if (messages !== state.allMessage){
        setState(state => ({
            ...state,
            allMessage: messages,
        }));
    }

    // every 2 secs check for new messages to or from user. 
    useEffect(() => {
        const interval = setInterval(() => {
            let array = state.otherUserEmail
            for(var i = 0; i < state.allMessage.length ; i++) {
                if (user?.result?.email === state.allMessage[i].to){
                    if(array.indexOf(state.allMessage[i].from) === -1 ){
                        array.push(state.allMessage[i].from)
                    }
                }
                if (user?.result?.email === state.allMessage[i].from){
                    if(array.indexOf(state.allMessage[i].to) === -1 ){
                        array.push(state.allMessage[i].to)
                    }
                }  
            }
            setState(state => ({
                ...state,
                otherUsers: array,
            }));
        }, 2000);
    }, [state.running, state.allMessage]);

    // start the above setInterval useEffect
    useEffect(() => { 
        setState(setState => ({
            ...state,
            running: state.running + 1
        }));
    }, []);


    //console.log("messages",messages)
    //console.log("state.allMessage",state.allMessage)
    //console.log(state.otherUsers)

    // handle the change of the text field
    function updateTextFieldContent(i) {
        setState(state => ({
            ...state,
            textFieldContent: i.target.value,
        }));
    }

    // adds a user to the otherUsers state array
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

    // opens the massager
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
                    {state.otherUserEmail.map((i)=>(
                        <Button key={"userbutton"+i} onClick={(e) =>openMessages(i)} variant="contained" color="secondary">{i}</Button>
                    ))}
                </Box>
                {(() => {
                    if(state.currentMessagingUser !== ''){
                        return (
                            <div key={state.currentMessagingUser}>
                                <Messages otherUserEmail={state.currentMessagingUser}/>
                            </div>
                        )
                    } else {
                        if (startingUserEmail !== 'null'){
                            return (
                                <div key={state.currentMessagingUser}>
                                    <Messages otherUserEmail={startingUserEmail}/>
                                </div>
                            )
                        }
                    }
                })()}
            </Box>
        </div>
    );
};

export default AllMessages;
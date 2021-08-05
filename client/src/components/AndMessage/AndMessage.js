import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux'
import {createMessage} from '../../actions/messages.js'
import axios from 'axios';
import { TextField, Button, Box, Typography, List} from '@material-ui/core'


const AndMessage = ({otherUserEmail}) => {
    const user = JSON.parse(localStorage.getItem('profile'))
    const dispatch = useDispatch()
  
    const [state, setState] = useState({
        messagesContent: [],
        running: 0,
        textFieldContent: '',
        otherUserEmail: otherUserEmail,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            // get all messages from server
            // Change to get all messages from server with logged in users as ether the to or from. Done server side then passed to client
            axios.get('http://localhost:5000/messages/')
                .then(response => {
                    //console.log(response.data)
                    setState(state => ({
                        ...state,
                        messagesContent: response.data,
                    }));
                })
                .catch((error) => {
                    console.log(error)
                })            
        }, 2000);
    }, [state.running, state.otherUserEmail]);

    useEffect(() => {
        setState(setState => ({
            ...state,
            messages: state.running + 1
        }));
    }, []);

    function updateTextFieldContent(i) {
        setState(state => ({
            ...state,
            textFieldContent: i.target.value,
        }));
    }


    function sendMessage(i) {
        dispatch(createMessage({to: state.otherUserEmail, from: user?.result?.email, content: state.textFieldContent, toHasRead: false }))
        setState(state => ({
            ...state,
            textFieldContent: '',
        }));
    }

    return (
        <div>
            <div style={{ padding: '5px', maxWidth: '70%', margin: 'auto'}}> 
                <Typography variant="h5" display="flex" alignItems="center" >Conversation with: {state.otherUserEmail}</Typography>
                    <List style={{ height: '500px', overflow: 'auto'}} subheader={<li />}>
                        {state.messagesContent.map((i,index)=>(
                            <div key={"content" + index }>
                                {(() => {
                                    if (state.otherUserEmail === i.from || state.otherUserEmail === i.to) {
                                        if (user?.result?.email === i.from || user?.result?.email === i.to) {
                                            let fromOrTo = "flex-start"
                                            let color = "#8bc34a"
                                            if(i.from === user?.result?.email) {
                                                fromOrTo = "flex-end"
                                                color = "#03a9f4"
                                            } 
                                            return (
                                                <Box key={'meesage'+i} display="flex" justifyContent={fromOrTo} >
                                                    <Box bgcolor={color} m={1} style={{borderRadius: '5px', paddingLeft: '10px', paddingRight: '10px'}}>
                                                        <Typography variant="h6" >{i.content}</Typography>
                                                    </Box>  
                                                </Box>
                                            )
                                        }  
                                    }
                                })()}
                            </div>
                        ))}
                    </List>
                <Box borderRadius="borderRadius" border={1} style={{padding: '10px', maxWidth: '100%', marginTop: '5px'}} >
                    <TextField id="message-input" label="Message" variant="outlined" onChange={updateTextFieldContent} value={state.textFieldContent}/>
                    <Button onClick={(i) =>sendMessage(i)} variant="contained" color="secondary">Send</Button>
                </Box>
            </div>
        </div>
    );
};

export default AndMessage;
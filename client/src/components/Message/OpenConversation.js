import React, {useState, useCallback} from 'react';
import {Form, InputGroup, Button} from 'react-bootstrap';
import {useConversations} from './Providers/ConversationsProvider';

function OpenConversation() {
    const [text, setText] = useState();
    const {sendMessage, selectedConversation} = useConversations();
    //fixing the scroll when new messages are sent or received
    const setRef = useCallback(node => {
        if (node) {
            node.scrollIntoView({smooth: true})
        }
    }, []);

    function handleSubmit(e) {
        e.preventDefault()
        // finding the correct recipients to send the state text to.
        sendMessage(selectedConversation.recipients.map(r => r.id), text)
        // once sent clearing out the text to be empty again
        setText('')
    }

    return (
        <div className="d-flex flex-column flex-grow-1">
            <div className="flex-grow-1 overflow-auto">
            <div className="d-flex flex-column align-items-start justify-content-end px-3">
                {selectedConversation.messages.map((message, index) => {
                    //using index position to find the last message 
                    const lastMessage = selectedConversation.messages.length - 1 === index
                    return (
                        <div
                        //organsing the messages and using setRef to fix scroll
                        ref={lastMessage ? setRef : null}
                        key={index}
                        //using ternary operators to style if the message is or isn't from the person to who sent it
                        className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end' : ''}`}>
                            <div 
                            className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border'}`}>
                                {message.text}
                            </div>
                            <div>
                                {message.fromMe ? 'You' : message.senderName}
                            </div>
                        </div>
                    )
                })}
            </div>
            </div>
            <Form onSubmit={handleSubmit}>
                <input type="text" required value={text} onChange={e => setText(e.target.value)} style={{height: '75px', resize: 'none', border: 'black 1px solid', width:  "100%"}}></input>
                <Button type="submit">Send</Button>
            </Form>
        </div>
    )
}

export default OpenConversation;
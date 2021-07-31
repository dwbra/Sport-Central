import React, {useState, useCallback} from 'react';
import {Form, InputGroup, Button} from 'react-bootstrap';
import {useConversations} from './Providers/ConversationsProvider';

function OpenConversation() {
    const [text, setText] = useState();
    const {sendMessage, selectedConversation} = useConversations();
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
                    const lastMessage = selectedConversation.messages.length - 1 === index
                    return (
                        <div
                        ref={lastMessage ? setRef : null}
                        key={index}
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
                <Form.Group className="m-2">
                    <InputGroup>
                        <Form.Control as="text-area"
                        required
                        value={text}
                        onChange={e => setText(e.target.value)}
                        style= {{height: '75px', resize: 'none'}}
                        />
                        <InputGroup.Append>
                            <Button type="submit">Send</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}

export default OpenConversation

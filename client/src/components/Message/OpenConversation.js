import React, {useState} from 'react';
import {Form, InputGroup, Button} from 'react-bootstrap';
import {useConversations} from './Providers/ConversationsProvider';

function OpenConversation() {
    const [text, setText] = useState();
    const {sendMessage, selectedConversation} = useConversations();

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

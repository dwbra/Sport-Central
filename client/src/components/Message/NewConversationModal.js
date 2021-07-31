import React, {useState} from 'react';
import {Form, Modal, Button} from 'react-bootstrap';
import { useContacts } from './Providers/ContactsProvider';
import { useConversations } from './Providers/ConversationsProvider';

//model to create a new conversation
function NewConversationModal({closeModal}) {
    const [selectedContactIds, setSelectedContactIds] = useState([]);
    const {contacts} = useContacts();
    const {createConversation} = useConversations();

    function handleSubmit(e) {
        e.preventDefault()
        //import function to create new conversation
        createConversation(selectedContactIds)
        //once created close the modal
        closeModal()
    }
    
    //handling the selection of your contact
    function handleCheckboxChange(contactId) {
        setSelectedContactIds(prevSelectedContactIds => {
            if (prevSelectedContactIds.includes(contactId)) {
                return prevSelectedContactIds.filter(prevId => {
                    return contactId !== prevId
                })
            } else {
                return [...prevSelectedContactIds, contactId]
            }
        })
    }

    return (
        <div>
            <Modal.Header closeButton>Create Conversation</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {contacts.map(contact => (
                        <Form.Group controlId={contact.id} key={contact.id}>
                            <Form.Check type="checkbox" 
                            value={selectedContactIds.includes(contact.id)}
                            label={contact.name}
                            onChange={() => handleCheckboxChange(contact.id)}
                            >

                            </Form.Check>
                        </Form.Group>

                    ))}
                    <Button type="submit">Create</Button>
                </Form>
            </Modal.Body>
        </div>
    )
}

export default NewConversationModal

import React, {useRef} from 'react';
import {Form, Modal, Button} from 'react-bootstrap';
import { useContacts } from './Providers/ContactsProvider'

//Modal is the popup box to create contact
function NewContactModal({closeModal}) {
    const idRef = useRef();
    const nameRef = useRef();
    //importing creatContact function from provider
    const { createContact } = useContacts();

    function handleSubmit(e) {
        e.preventDefault()
        //creating contact with the idRefs from the input field
        createContact(idRef.current.value, nameRef.current.value)
        closeModal()
    }

    return (
        <div>
            <Modal.Header closeButton>Create Contact</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" ref={idRef} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" ref={nameRef} required />
                    </Form.Group>
                    <Button type="submit">Create</Button>
                </Form>
            </Modal.Body>
        </div>
    )
}

export default NewContactModal

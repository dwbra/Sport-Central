import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useContacts } from './Providers/ContactsProvider';

function Contacts() {
    const {contacts} = useContacts();

    return (
      //iterating out your contacts
        <ListGroup variant="flush">
          {contacts.map(contact => (
            <ListGroup.Item key={contact.id}>
              {contact.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )
}

export default Contacts

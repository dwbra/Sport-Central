import React, {useContext} from 'react';
import useLocalStorage from '../Hooks/useLocalStorage';

//creating a way to handle all contact state and functions
const ContactsContext = React.createContext();

//hook to access all functions in component
export function useContacts() {
    return useContext(ContactsContext)
}

export function ContactsProvider({children}) {
    const [contacts, setContacts] = useLocalStorage('contacts', []);

    function createContact(id, name) {
        setContacts(prevContacts => {
            return [...prevContacts, {id, name}]
        })
    }
    
    return (
        <ContactsContext.Provider value={{contacts, createContact}}>
            {children}
        </ContactsContext.Provider>
    )
};

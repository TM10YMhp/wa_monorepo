import { ReactNode, createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export type Contact = { id: string; name: string };
type ContactsContextType = {
  contacts: Contact[];
  createContact: (contact: Contact) => void;
};
const ContactsContext = createContext<ContactsContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useContacts() {
  const context = useContext(ContactsContext);
  if (context === null) {
    throw new Error("useContacts must be used within a ContactsProvider");
  }
  return context;
}

export function ContactsProvider({ children }: { children: ReactNode }) {
  const [contacts, setContacts] = useLocalStorage<Contact[]>("contacts", []);

  function createContact(contact: Contact) {
    setContacts((x) => x.concat(contact));
  }

  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  );
}

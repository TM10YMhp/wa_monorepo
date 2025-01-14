import { useContacts } from "../contexts/ContactsProvider";

export default function Contacts() {
  const { contacts } = useContacts();

  return (
    <>
      {contacts.map((contact) => (
        <div className="px-3 py-2 border-b" key={contact.id}>
          {contact.name}
        </div>
      ))}
    </>
  );
}

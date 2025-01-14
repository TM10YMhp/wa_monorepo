import { Contact, useContacts } from "@/contexts/ContactsProvider";
import { useConversations } from "@/contexts/ConversationsProvider";
import { useState } from "react";

export default function NewConversationModal({
  closeModal,
}: { closeModal: () => void }) {
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
  const { contacts } = useContacts();
  const { createConversation } = useConversations();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    createConversation(selectedContacts.map((x) => ({ id: x.id })));
    closeModal();
  }

  function handleCheckboxChange(contact: Contact) {
    setSelectedContacts((x) =>
      x.some((y) => y.id === contact.id)
        ? x.filter((z) => z.id !== contact.id)
        : x.concat(contact),
    );
  }

  return (
    <>
      <p className="mb-4 text-lg font-bold">Create Conversation</p>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        {contacts.map((contact) => (
          <label key={contact.id}>
            <input
              type="checkbox"
              checked={selectedContacts.some((x) => x.id === contact.id)}
              onChange={() => handleCheckboxChange(contact)}
            />{" "}
            {contact.name}
          </label>
        ))}
        <button className="btn btn-primary btn-sm mt-4" type="submit">
          Create
        </button>
      </form>
    </>
  );
}

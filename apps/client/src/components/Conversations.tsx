import { useContacts } from "@/contexts/ContactsProvider";
import { cx } from "@/utils/cx";
import { useConversations } from "../contexts/ConversationsProvider";

export default function Conversations() {
  const { contacts } = useContacts();
  const { conversations, selectConversationIndex, selectedConversationIndex } =
    useConversations();

  return (
    <>
      {conversations.map((conversation, index) => (
        <button
          key={index}
          onClick={() => selectConversationIndex(index)}
          className={cx(
            "btn btn-sm w-full",
            index === selectedConversationIndex && "!bg-primary text-black",
          )}
        >
          <span>{conversation.id}: </span>
          <span
            className={
              index === selectedConversationIndex
                ? "text-stone-800"
                : "text-stone-500"
            }
          >
            {conversation.recipients
              .map((x) => contacts.find((y) => y.id === x.id)?.name || x.id)
              .join(", ")}
          </span>
        </button>
      ))}
    </>
  );
}

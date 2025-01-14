import { useContacts } from "@/contexts/ContactsProvider";
import { useConversations } from "@/contexts/ConversationsProvider";
import { cx } from "@/utils/cx";
import { useLayoutEffect, useRef } from "react";

function ChatMessage({
  senderId,
  senderName,
  text,
  fromMe,
  isAContact,
}: {
  senderId: string;
  senderName: string;
  text: string;
  fromMe: boolean;
  isAContact: boolean;
}) {
  return (
    <div
      className={cx(
        "my-1 flex flex-col",
        fromMe ? "self-end items-end" : "items-start",
      )}
    >
      <div
        className={cx(
          "rounded px-2 text-black",
          fromMe ? "bg-primary" : "bg-secondary",
        )}
      >
        {text}
      </div>
      <p className={cx("text-stone-300 text-sm", fromMe && "text-right")}>
        {fromMe ? (
          "You"
        ) : (
          <>
            {senderName}
            {isAContact || <span className="text-stone-500"> ~{senderId}</span>}
          </>
        )}
      </p>
    </div>
  );
}

export default function OpenConversation({ id }: { id: string }) {
  const { contacts } = useContacts();

  const textRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { sendMessage, conversations, selectedConversationIndex } =
    useConversations();
  const selectedConversation = conversations[selectedConversationIndex];

  function scrollToBottom() {
    if (!containerRef.current) return;
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }

  useLayoutEffect(() => {
    scrollToBottom();
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const text = textRef.current?.value;
    if (!text) return;

    sendMessage(selectedConversation.recipients, text, selectedConversation.id);

    textRef.current.value = "";
    scrollToBottom();
  }

  return (
    <div className="flex flex-col flex-grow">
      <div ref={containerRef} className="flex-grow overflow-auto px-3">
        {selectedConversation.messages.map((message, index) => {
          const contact = contacts.find((x) => x.id === message.sender);
          const senderName = contact?.name || message.senderName;

          return (
            <ChatMessage
              key={index}
              senderId={message.sender}
              senderName={senderName}
              text={message.text}
              fromMe={id === message.sender}
              isAContact={contact !== undefined}
            />
          );
        })}
      </div>
      <form onSubmit={handleSubmit} className="p-2 border-t flex flex-row">
        <input
          className="input input-bordered flex-grow"
          type="text"
          placeholder="Type a message..."
          required
          ref={textRef}
        />
        <button className="btn btn-primary" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

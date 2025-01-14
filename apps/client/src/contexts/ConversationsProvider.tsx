import useLocalStorage from "@/hooks/useLocalStorage";
import { Message } from "@/types";
import { randomID } from "@/utils/randomID";
import { Exact, Recipient } from "@repo/model";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSocket } from "./SocketProvider";

type Conversation = {
  id: string;
  messages: Message[];
  recipients: Recipient[];
};

type ConversationContextType = {
  conversations: Conversation[];
  selectedConversationIndex: number;
  sendMessage: (
    recipients: Recipient[],
    text: string,
    conversationId: string,
  ) => void;
  selectConversationIndex: (index: number) => void;
  createConversation: <T>(recipients: Array<Exact<T, Recipient>>) => void;
};

const ConversationsContext = createContext<ConversationContextType | null>(
  null,
);

// eslint-disable-next-line react-refresh/only-export-components
export function useConversations() {
  const context = useContext(ConversationsContext);
  if (context === null) {
    throw new Error(
      "useConversations must be used within a ConversationsProvider",
    );
  }
  return context;
}

export function ConversationsProvider({
  id,
  name,
  children,
}: {
  id: string;
  name: string;
  children: React.ReactNode;
}) {
  const senderId = randomID();
  const [conversations, setConversations] = useLocalStorage<Conversation[]>(
    "conversations",
    [
      {
        id: randomID(),
        recipients: [],
        messages: [
          { sender: senderId, text: "aaaaaaa", senderName: "qwe" },
          { sender: senderId, text: "aaaaaaa", senderName: "qwe" },
          { sender: senderId, text: "aaaaaaa", senderName: "qwe" },
        ],
      },
    ],
  );
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const socket = useSocket();

  function createConversation(recipients: Recipient[]) {
    setConversations((x) =>
      x.concat({ id: randomID(), recipients, messages: [] }),
    );
  }

  const addMessageToConversation = useCallback(
    ({
      recipients,
      conversationId,
      text,
      sender,
      senderName,
    }: {
      recipients: Recipient[];
      conversationId: string;
      text: string;
      sender: string;
      senderName: string;
    }) => {
      setConversations((prevConversations) => {
        // TODO: check
        // console.log("-------------------------");
        // console.log(prevConversations);
        // console.log(recipients);
        // console.log("-------------------------");

        let existsConversation = false;
        const newMessage = { sender, text, senderName };
        const updatedConversations = prevConversations.map((conversation) => {
          if (conversation.id === conversationId) {
            existsConversation = true;
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            };
          }

          return conversation;
        });

        if (existsConversation) {
          console.log("exist conversation");
          return updatedConversations;
        } else {
          console.log("new conversation");
          return [
            ...prevConversations,
            { id: conversationId, recipients, messages: [newMessage] },
          ];
        }
      });
    },
    [setConversations],
  );

  useEffect(() => {
    if (!socket) return;

    socket.on("receive-message", addMessageToConversation);

    return () => void socket.off("receive-message");
  }, [socket, addMessageToConversation]);

  function sendMessage(
    recipients: Recipient[],
    text: string,
    conversationId: string,
  ) {
    if (!socket) return;
    socket.emit("send-message", {
      recipients,
      text,
      conversationId,
      senderName: name,
    });

    addMessageToConversation({
      recipients,
      text,
      sender: id,
      conversationId,
      senderName: name,
    });
  }

  return (
    <ConversationsContext.Provider
      value={{
        conversations,
        selectedConversationIndex,
        sendMessage,
        selectConversationIndex: setSelectedConversationIndex,
        createConversation,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
}

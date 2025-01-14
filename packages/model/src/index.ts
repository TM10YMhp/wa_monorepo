// https://oida.dev/typescript-match-the-exact-object-shape/
export type Exact<T, Struct> = T extends Struct
  ? Exclude<keyof T, keyof Struct> extends never
    ? T
    : never
  : never;

export type Recipient = {
  id: string;
};

export interface ServerToClientEvents {
  "receive-message": ({
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
  }) => void;
}

export interface ClientToServerEvents {
  "send-message": ({
    recipients,
    text,
    conversationId,
    senderName,
  }: {
    recipients: Recipient[];
    text: string;
    conversationId: string;
    senderName: string;
  }) => void;
}

import type { ClientToServerEvents, ServerToClientEvents } from "@repo/model";
import { Server } from "socket.io";

interface InterServerEvents {}

interface SocketData {}

// const url = "http://localhost:5173"
const url = "https://wa-client.onrender.com/";

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(5000, {
  cors: {
    origin: url,
  },
});

console.log("server started");

io.on("connection", (socket) => {
  const { id, name } = socket.handshake.query;

  if (typeof id !== "string" || typeof name !== "string") {
    console.log("invalid handshake");
    return;
  }

  socket.join(id);
  console.log(`connected ::: user: ${name}, room: ${id}`);

  socket.on("disconnect", () => {
    console.log("disconnected ::: user: ", name);
  });

  socket.on(
    "send-message",
    ({ recipients, text, conversationId, senderName }) => {
      console.log("send message: ", text, ", to", recipients);
      recipients.forEach((recipient) => {
        // remover al que recibe el mensaje
        const newRecipients = recipients.filter((x) => x.id !== recipient.id);
        // agregar al que envia el mensaje
        newRecipients.push({ id });
        // enviar mensaje al que recibe
        socket.broadcast.to(recipient.id).emit("receive-message", {
          conversationId,
          recipients: newRecipients,
          sender: id,
          text,
          senderName,
        });
        console.log(newRecipients, id, text);
      });
    },
  );
});

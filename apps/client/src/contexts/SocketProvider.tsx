import { ClientToServerEvents, ServerToClientEvents } from "@repo/model";
import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

type SocketContextType =
  | Socket<ServerToClientEvents, ClientToServerEvents>
  | undefined;
const SocketContext = createContext<SocketContextType>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useSocket() {
  const context = useContext(SocketContext);
  if (context === null) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
}

export function SocketProvider({
  id,
  name,
  children,
}: {
  id: string;
  name: string;
  children: React.ReactNode;
}) {
  const [socket, setSocket] =
    useState<Socket<ServerToClientEvents, ClientToServerEvents>>();
  // const url = "http://localhost:5000"
  const url = "https://wa-server.onrender.com";

  useEffect(() => {
    const newSocket = io(url, {
      query: { id, name },
    });
    setSocket(newSocket);

    return () => void newSocket.close();
  }, [id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

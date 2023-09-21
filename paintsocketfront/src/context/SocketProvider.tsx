/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState, useEffect } from "react";
import io from "socket.io-client";

interface SocketContextProps {
  emit: (event: string, data: any) => void;
}
interface SocketProviderType {
  children: React.ReactNode;
}
export const SocketContext = createContext<SocketContextProps | null>(null);

export default function SocketProvider({ children }: SocketProviderType) {
  const [socket, setSocket] = useState<any>(null);
  //   const socket = io("http://localhost:1111");

  useEffect(() => {
    const newSocket = io("http://localhost:1111");

    newSocket.on("connect", () => {
      console.log("connected");
    });
    newSocket.on("allUsers", (data) => {
      console.log(data);
    });
    newSocket.on("disconnect", () => {
      console.log("disconnected");
    });
    setSocket(newSocket);
    return () => {
      // newSocket.close();
    };
  }, []);

  const emit = (event: string, data: any) => {
    if (!socket.connected) {
      console.log("socket not connected ");
      return;
    }

    console.log("emitting " + event);
    console.log(socket);
    socket.emit(event, data);
  };

  return (
    <SocketContext.Provider
      value={{
        emit,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

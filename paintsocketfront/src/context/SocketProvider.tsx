/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState, useEffect } from "react";
import { socket } from "../model/socketio";

interface SocketContextProps {
  emit: (event: string, data: any) => void;
  newpainted: Painted;
}
interface SocketProviderType {
  children: React.ReactNode;
}
type Painted = {
  color: string;
  shape: string;
  position: {
    x1: number;
    y1: number;
  };
  type: "painted" | "replaced";
};
export const SocketContext = createContext<SocketContextProps | null>(null);

export default function SocketProvider({ children }: SocketProviderType) {
  //   const socket = io("http://localhost:1111");
  const [newpainted, setNewpainted] = useState({} as Painted);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("new", (data) => {
      console.log(data);
    });
    socket.on("userpainted", (data: any) => {
      if (!socket) return;
      if (data.id === socket.id) return;
      setNewpainted(data.data);
    });
    socket.on("userreplaced", (data: any) => {
      if (!socket) return;
      if (data.id === socket.id) return;
      setNewpainted(data.data);
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });
    return () => {
      socket.close();
    };
  }, []);

  const emit = (event: string, data: any) => {
    if (!socket) return;
    console.log(socket);
    if (!socket.connected) {
      console.log("socket not connected ");
      return;
    }

    console.log("emitting " + event);
    socket.emit(event, data);
  };

  return (
    <SocketContext.Provider
      value={{
        emit,
        newpainted,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

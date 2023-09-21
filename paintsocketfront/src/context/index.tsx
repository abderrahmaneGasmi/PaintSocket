import React from "react";
import SocketProvider from "./SocketProvider";

// import { ImageOpenerProvider } from "./ImageOpener";
interface childrenType {
  children: React.ReactNode;
}
export default function ContextProviders({ children }: childrenType) {
  return <SocketProvider>{children}</SocketProvider>;
}

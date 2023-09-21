import { useContext } from "react";
import { SocketContext } from "../context/SocketProvider";

export const useSocket = () => useContext(SocketContext);

import { io } from "socket.io-client";

// Connect to backend Socket.IO server
const socket = io("http://192.168.1.71:7000", {
  transports: ["websocket"],
});

export default socket;

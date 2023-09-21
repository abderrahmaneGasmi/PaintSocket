const socketIO = require("socket.io");
const connectedUsers = require("./ConnectedUsers");
function initializeSocket(server) {
  // Create the socket instance
  const io = socketIO(server, {
    cors: {
      origin: "http://localhost:5173", // Replace with the origin of your React app
      methods: ["GET", "POST", "PUT"],
    },
  });

  // Event handler for new socket connections
  io.on("connection", (socket) => {
    // socket.on("like", async (data) => {
    connectedUsers.push({ id: socket.id });
    // // Emit the event to all connected sockets
    io.emit("new", `new user connected ${socket.id}`);

    socket.on("paint", (data) => {
      console.log("user painted");
      io.emit("userpainted", { data: data, id: socket.id });
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
      connectedUsers.splice(
        connectedUsers.findIndex((user) => user.id === socket.id),
        1
      );
      io.emit("new", `user disconnected ${socket.id}`);
    });
  });

  // Return the io object
  return io;
}
module.exports = initializeSocket;

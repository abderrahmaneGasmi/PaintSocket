const socketIO = require("socket.io");
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
    //   console.log("like event");

    //   let username = data.workername;
    //   let notificationid = data.notificationid;
    //   let tuser = await User.findById(userId);
    //   if (!tuser) return;
    //   console.log("return 1");
    //   let user = await User.findOne({ username: username });
    //   if (!user) return;
    //   console.log("return 2");
    //   let userSocketId = connectedUsers.find(
    //     (users) => users.id == user._id.toString()
    //   );
    //   if (!userSocketId) return;
    //   console.log("return 3");
    //   io.to(userSocketId.socketId).emit("notification", {
    //     avatar: tuser.avatar,
    //     username: tuser.username,
    //     type: "like",
    //     notificationid,
    //   });
    // });

    socket.on("disconnect", () => {
      console.log("user disconnected");
      connectedUsers.splice(
        connectedUsers.findIndex((user) => user.id == userId),
        1
      );
    });
  });

  // Return the io object
  return io;
}
module.exports = initializeSocket;

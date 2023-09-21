// import Librarys
const express = require("express");
const http = require("http");
const cors = require("cors");

// Middlewares
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from all origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow GET and POST requests
    allowedHeaders: ["Content-Type", "Authorization", "auth"], // Allow specified headers
  })
);
const initializeSocket = require("./module/SocketIo");

const server = http.createServer(app);
// const io = socketIO(server, {
//   cors: {
//     origin: "http://localhost:5173", // Replace with the origin of your React app
//     methods: ["GET", "POST"],
//   },
// });

// // Event handler for new socket connections

const io = initializeSocket(server);

// Make the io object accessible globally
global.io = io;

server.listen(1111);

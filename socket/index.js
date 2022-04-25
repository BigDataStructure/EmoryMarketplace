var express = require("express");
var cors = require("cors");
var app = express();

app.use(cors());

const io = require("socket.io")(3005, {
  //WATCH OUT FOR THIS
  cors: {
    origin: "*",
  },
});

//user array
let users = [];

//helper function
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when connect
  console.log("a user connected.");
  //take a userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id); //send all users in array to every client (?)
    io.emit("getUsers", users);
  });

  //send and get messages
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });
  //when disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

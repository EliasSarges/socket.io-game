import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);
const socketio = new Server(server);

const state = {
  players: [],
  screen: {
    width: 500,
    height: 500,
  },
};

app.use(express.static("public"));

const addPlayer = (id) => {
  const player = {
    id,
    velocity: 10,
    pos: {
      x: Math.floor(Math.random() * state.screen.width),
      y: Math.floor(Math.random() * state.screen.height),
    },
  };

  state.players.push(player);
};

const removePlayer = (id) => {
  state.players = state.players.filter((player) => player.id !== id);
};

socketio.on("connection", (socket) => {
  addPlayer(socket.id);

  socket.on("update-server", (data) => {
    // console.clear();
    // console.log(data);
  });

  socket.on("disconnect", () => {
    removePlayer(socket.id);
  });
});

const updateClient = () => {
  socketio.emit("update-client", state);
};

setInterval(updateClient, 1000 / 60);
server.listen(3000, () => console.log("Server running on port 3000"));

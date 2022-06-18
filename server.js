import { Server } from "socket.io";
import express from "express";
import http from "http";
import { createGame } from "./public/js/createGame.js";
import { createPlayer } from "./public/js/createPlayer.js";

const app = express();
app.use(express.static("public"));

const server = http.createServer(app);
const socketio = new Server(server);
const game = createGame();

game.subscribe((data) => {
  socketio.emit(data.type, data);
});

socketio.on("connection", (socket) => {
  socket.on("create-player", (data) => {
    const player = createPlayer(
      socket.id,
      data.name,
      data.charId,
      game.state.screen
    );

    game.addPlayer(player);
    socket.emit("join", game.state);
  });

  socket.on("move-player", (data) => game.updatePosition(data));

  socket.on("disconnect", () => {
    game.removePlayer(socket.id);
  });
});

const port = 3000;
server.listen(port, () => console.log(`Server running on port ${port}`));

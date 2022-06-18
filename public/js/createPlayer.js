import { availablePlayers } from "./constants.js";

const createPosition = (screenDimension, playerDimension) => {
  return Math.floor(Math.random() * (screenDimension - playerDimension * 2));
};

export const createPlayer = (id, name, charId, screen) => {
  const currentPlayer = availablePlayers[charId];

  const player = {
    id,
    charId,
    name,
    velocity: 4,
    pos: {
      x: createPosition(screen.width, currentPlayer.width),
      y: createPosition(screen.height, currentPlayer.height),
    },
    controller: {
      left: false,
      right: false,
      up: false,
      down: false,
    },
  };

  console.clear();
  console.log(player);
  return player;
};

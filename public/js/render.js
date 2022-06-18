import { movePlayer } from "./controller.js";
import { availablePlayers } from "./constants.js";

const spriteSheet = new Image();
spriteSheet.src = "./assets/sprites/player.png";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let start = Date.now();
let currentLoopIndex = 0;

/**
 * animationLoop
 */
export const animate = (player, currentAnimation) => {
  const timer = Math.floor((Date.now() - start) / 60);
  const selectedPlayer = availablePlayers[player.charId];

  // render player area
  // context.fillRect(
  //   player.pos.x,
  //   player.pos.y,
  //   selectedPlayer.width * selectedPlayer.frameScale,
  //   selectedPlayer.height * selectedPlayer.frameScale
  // );

  const animation = selectedPlayer.animations[currentAnimation];

  // render player sprite
  context.drawImage(
    spriteSheet,
    selectedPlayer.width * animation.frames[currentLoopIndex],
    animation.framePositionY,
    selectedPlayer.width,
    selectedPlayer.height,
    player.pos.x,
    player.pos.y,
    selectedPlayer.width * selectedPlayer.frameScale,
    selectedPlayer.height * selectedPlayer.frameScale
  );

  // time between frames
  if (timer > 1) {
    start = Date.now();
    currentLoopIndex++;
  }

  if (currentLoopIndex >= animation.frames.length) currentLoopIndex = 0;
};

/**
 * render all players on game state and update their positions on canvas
 */
export const render = (socket, currentPlayer, game) => {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (const player of game.state.players) {
    const currentAnimation = "idle";
    animate(player, currentAnimation);
  }

  // update current player position
  movePlayer(socket, currentPlayer);
  requestAnimationFrame(() => render(socket, currentPlayer, game));
};

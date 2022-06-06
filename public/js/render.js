const getAnimation = (name) => {};
const createAnimation = (name, startIndex, endIndex) => {};

export const render = (argsRender) => {
  const { socket, context, currentPlayer, game, frameIndex, start } =
    argsRender;

  context.clearRect(0, 0, canvas.width, canvas.height);

  for (const player of game.state.players) {
    const color = currentPlayer.id === player.id ? "#e1ff00" : "#606582";

    context.fillStyle = color;
    context.fillRect(player.pos.x, player.pos.y, 20, 20);
  }

  if (currentPlayer) {
    const { controller } = currentPlayer;

    if (controller.left) {
      currentPlayer.pos.x -= currentPlayer.velocity;
    }
    if (controller.right) {
      currentPlayer.pos.x += currentPlayer.velocity;
    }
    if (controller.up) {
      currentPlayer.pos.y -= currentPlayer.velocity;
    }
    if (controller.down) {
      currentPlayer.pos.y += currentPlayer.velocity;
    }

    if (
      controller.left ||
      controller.right ||
      controller.up ||
      controller.down
    ) {
      const { id, pos } = currentPlayer;

      socket.emit("move-player", {
        id,
        pos,
      });
    }
  }

  requestAnimationFrame(() => render(argsRender));
};

// export const animate = (pos) => {s
//   const timer = Math.floor((Date.now() - start) / 60);

//   if (timer > 1) {
//     start = Date.now();
//     frameIndex++;
//   }

//   context.drawImage(
//     spriteSheet,
//     frameIndex * 100,
//     0,
//     100,
//     100,
//     pos.x,
//     pos.y,
//     100,
//     100
//   );

//   if (frameIndex > 3) {
//     frameIndex = 0;
//   }
// };

export const handleKey = (event, currentPlayer) => {
  const keyStatus = event.type === "keydown";
  const { controller } = currentPlayer;

  switch (event.key) {
    case "a":
      controller.left = keyStatus;
      break;
    case "d":
      controller.right = keyStatus;
      break;
    case "w":
      controller.up = keyStatus;
      break;
    case "s":
      controller.down = keyStatus;
      break;
  }
};

export const movePlayer = (socket, currentPlayer) => {
  if (currentPlayer) {
    const { controller } = currentPlayer;

    if (controller.left) currentPlayer.pos.x -= currentPlayer.velocity;
    if (controller.right) currentPlayer.pos.x += currentPlayer.velocity;
    if (controller.up) currentPlayer.pos.y -= currentPlayer.velocity;
    if (controller.down) currentPlayer.pos.y += currentPlayer.velocity;

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
};

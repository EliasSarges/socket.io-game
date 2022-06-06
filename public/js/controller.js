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

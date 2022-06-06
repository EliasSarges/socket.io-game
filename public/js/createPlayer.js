export const createPlayer = (id, name, screen) => {
  const player = {
    id,
    name,
    velocity: 8,
    pos: {
      x: Math.floor(Math.random() * screen.width),
      y: Math.floor(Math.random() * screen.height),
    },
    controller: {
      left: false,
      right: false,
      up: false,
      down: false,
    },
    size: {
      width: 0,
      height: 0,
    },
    frameIndex: 0,
    animations: {},
  };

  return player;
};

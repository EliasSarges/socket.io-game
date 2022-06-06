export const createGame = () => {
  const state = {
    players: [],
    screen: {
      width: 500,
      height: 500,
    },
  };

  const observers = [];

  const subscribe = (observerFunction) => {
    observers.push(observerFunction);
  };

  const notifyObservers = (data) => {
    for (const observerFunction of observers) {
      observerFunction(data);
    }
  };

  const addPlayer = (player) => {
    state.players.push(player);

    notifyObservers({
      type: "add-player",
      player,
    });
  };

  const removePlayer = (id) => {
    state.players = state.players.filter((player) => player.id !== id);

    notifyObservers({
      type: "remove-player",
      id,
    });
  };

  const movePlayer = (data) => {
    const player = state.players.find((player) => player.id === data.id);

    if (player) {
      player.pos = data.pos;

      notifyObservers({
        type: "update-position",
        id: player.id,
        pos: player.pos,
      });
    }
  };

  const setState = (newState) => {
    Object.assign(state, newState);
  };

  return {
    state,
    observers,
    setState,
    addPlayer,
    removePlayer,
    subscribe,
    notifyObservers,
    movePlayer,
  };
};

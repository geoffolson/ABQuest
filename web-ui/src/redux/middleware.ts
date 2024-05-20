import { saveGame, loadGame, SaveState } from "./gameSlice";
import { Middleware } from "@reduxjs/toolkit";

export const saveGameKey = "savedGameState";
export const saveMiddleware: Middleware = (store) => (next) => (_action) => {
  // TODO: add validation
  const action = _action as { type: string; payload?: any };
  switch (action?.type) {
    case saveGame.type: {
      const { game } = store.getState();
      const savedGameState: SaveState = {
        endpoint: game.endpoint,
        health: game.health,
        position: game.position,
        moves: game.moves,
        seed: game.seed,
      };
      window.localStorage.setItem(saveGameKey, JSON.stringify(savedGameState));
      break;
    }
    case loadGame.type: {
      // don't load from localStorage if saved data is provided in payload
      if (action?.payload) break;

      // TODO: add validation
      const state = JSON.parse(window.localStorage.getItem(saveGameKey));
      if (state) action.payload = state;
      break;
    }
  }
  next(action);
};

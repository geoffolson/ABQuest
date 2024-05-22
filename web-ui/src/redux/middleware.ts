import { saveGame, loadGame, SaveState, saveToken, logOut, saveUser } from "./gameSlice";
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
      const state = JSON.parse(window.localStorage.getItem(saveGameKey) ?? "null");
      if (state) action.payload = state;
      break;
    }
    case saveToken.type: {
      window.localStorage.setItem("token", action.payload);
      break;
    }
    case logOut.type: {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");
      break;
    }
    case saveUser.type: {
      window.localStorage.setItem("user", action.payload);
    }
  }
  next(action);
};

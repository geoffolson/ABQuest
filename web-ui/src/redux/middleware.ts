import { saveGame, loadGame, SaveState, saveToken, logOut } from "./gameSlice";
import { Middleware, isAction } from "@reduxjs/toolkit";
import { RootState } from "./rootReducer";
import { SavedState } from "common";

export const saveGameKey = "savedGameState";
export const tokenKey = "token";
export const saveMiddleware: Middleware<Record<string, unknown>, RootState> =
  (store) => (next) => (action) => {
    if (!isAction(action)) return next(action);
    if (saveGame.match(action)) {
      const { game } = store.getState();
      const savedGameState: SaveState = {
        endpoint: game.endpoint,
        health: game.health,
        position: game.position,
        moves: game.moves,
        seed: game.seed,
      };
      window.localStorage.setItem(saveGameKey, JSON.stringify(savedGameState));
    }
    if (loadGame.match(action)) {
      // don't load from localStorage if saved data is provided in payload
      if (!action?.payload) {
        action.payload = SavedState.parse(
          JSON.parse(window.localStorage.getItem(saveGameKey) ?? "null")
        );
      }
    }
    if (saveToken.match(action)) {
      window.localStorage.setItem(tokenKey, action.payload);
    }
    if (logOut.match(action)) {
      window.localStorage.removeItem(tokenKey);
    }
    next(action);
  };

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Tile, generateMap } from "../generateMap/generateMap";
import { seedScale } from "../generateMap/perlin";
import { eq } from "../utils";

export type vector = {
  x: number;
  y: number;
};

export const gameMapWidth = 50;
export const enum PlayerState {
  Pause,
  Playing,
  Lost,
  Won,
}

export type CharacterState = {
  position: vector;
  endpoint: vector;
  moves: number;
  health: number;
};

export interface SaveState extends CharacterState {
  seed: number;
}

export interface GameState extends SaveState {
  username: null | string;
  savedGameId: number | null;
  gameMap: Tile[][];
  playerState: PlayerState;
  menuScreen: MenuScreen;
}

export const enum PlayerInput {
  Up,
  Down,
  Left,
  Right,
  Pause,
}
export const enum MenuScreen {
  Main,
  Regisration,
  Login,
}

export const initialHealth = 200;
export const initialMoves = 450;
const generateSeed = () => Math.floor(Math.random() * seedScale);
const initialSeed = generateSeed();
const initialState: GameState = {
  username: null,
  savedGameId: null,
  position: { x: 24, y: 24 },
  health: initialHealth,
  moves: initialMoves,
  endpoint: { x: Math.floor(Math.random() * 50), y: Math.floor(Math.random() * 50) },
  seed: initialSeed,
  gameMap: generateMap(initialSeed, gameMapWidth),
  playerState: PlayerState.Pause,
  menuScreen: MenuScreen.Main,
};

export const tileEffectMap: Record<string, { health: number; moves: number }> = {
  B: { health: 0, moves: -1 },
  S: { health: -5, moves: 0 },
  L: { health: -10, moves: -10 },
  M: { health: -10, moves: -5 },
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    move: (state, action: PayloadAction<PlayerInput>) => {
      if (
        state.playerState === PlayerState.Pause ||
        state.playerState === PlayerState.Lost ||
        state.playerState === PlayerState.Won
      ) {
        if (action.payload === PlayerInput.Pause) {
          state.playerState = PlayerState.Playing;
        }
        return;
      }
      switch (action.payload) {
        case PlayerInput.Down: {
          if (state.position.y === gameMapWidth - 1) return;
          ++state.position.y;
          break;
        }
        case PlayerInput.Up: {
          if (state.position.y === 0) return;
          --state.position.y;
          break;
        }
        case PlayerInput.Left: {
          if (state.position.x === 0) return;
          --state.position.x;
          break;
        }
        case PlayerInput.Right: {
          if (state.position.x === gameMapWidth - 1) return;
          ++state.position.x;
          break;
        }
        case PlayerInput.Pause: {
          state.playerState = PlayerState.Pause;
          return;
        }
      }
      const { x, y } = state.position;
      const { health, moves } = tileEffectMap[state.gameMap[y][x]];
      state.moves += moves;
      state.health += health;
      if (eq(state.position, state.endpoint)) state.playerState = PlayerState.Won;
      else if (state.moves <= 0 || state.health <= 0) state.playerState = PlayerState.Lost;
    },
    newGame: (state) => {
      const username = state.username;
      const savedGameId = state.savedGameId;
      state = { ...initialState, username, savedGameId };
      state.seed = generateSeed();
      state.gameMap = generateMap(state.seed, gameMapWidth);
      state.playerState = PlayerState.Playing;
      return state;
    },
    loadGame: (state, action: PayloadAction<SaveState | undefined>) => {
      state = { ...state, ...action.payload };
      state.gameMap = generateMap(state.seed, gameMapWidth);
      state.playerState = PlayerState.Playing;
      return state;
    },
    saveGame: (state) => {
      state.playerState = PlayerState.Playing;
      return state;
    },
    cloudSaveGame: (state) => {
      state.playerState = PlayerState.Playing;
      return state;
    },
    registerScreen: (state) => {
      state.menuScreen = MenuScreen.Regisration;
    },
    loginScreen: (state) => {
      state.menuScreen = MenuScreen.Login;
    },
    cancelRegistration: (state) => {
      state.menuScreen = MenuScreen.Main;
    },
    saveToken: (state, _action: PayloadAction<string>) => {
      state.menuScreen = MenuScreen.Main;
    },
    saveUser: (state, action: PayloadAction<{ username: string; savedGameId: number | null }>) => {
      state.username = action.payload.username;
      state.savedGameId = action.payload.savedGameId;
    },
    logOut: (state) => {
      state.menuScreen = MenuScreen.Main;
      state.username = null;
      state.savedGameId = null;
      state.playerState = PlayerState.Pause;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  move,
  newGame,
  saveGame,
  loadGame,
  registerScreen,
  cancelRegistration,
  saveToken,
  loginScreen,
  logOut,
  saveUser,
} = playerSlice.actions;

export default playerSlice.reducer;

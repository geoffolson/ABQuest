import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Tile, generateMap } from "../generateMap/generateMap";
import { seedScale } from "../generateMap/perlin";

export type vector = [number, number]; // x, y
export const gameMapWidth = 50;
export enum playerState {
  Pause,
  Playing,
}

export interface saveState {
  position: vector;
  health: number;
  moves: number;
  seed: number;
  endpoint: vector;
}

export interface gameState {
  position: vector;
  health: number;
  moves: number;
  gameMap: Tile[][];
  endpoint: vector;
  seed: number;
  playerState: playerState;
}

export enum Direction {
  Up,
  Down,
  Left,
  Right,
}

export const initialHealth = 200;
export const initialMoves = 450;
const generateSeed = () => Math.floor(Math.random() * seedScale);
const initialSeed = generateSeed();
const initialState: gameState = {
  position: [0, 0],
  health: initialHealth,
  moves: initialMoves,
  endpoint: [Math.floor(Math.random() * 50), Math.floor(Math.random() * 50)],
  seed: initialSeed,
  gameMap: generateMap(initialSeed, gameMapWidth),
  playerState: playerState.Playing,
};

const tileEffectMap: Record<string, { health: number; moves: number }> = {
  B: { health: 0, moves: -1 },
  S: { health: -5, moves: 0 },
  L: { health: -10, moves: -10 },
  M: { health: -10, moves: -5 },
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    move: (state, action: PayloadAction<Direction>) => {
      switch (action.payload) {
        case Direction.Down: {
          if (state.position[1] === gameMapWidth - 1) return;
          ++state.position[1];
          break;
        }
        case Direction.Up: {
          if (state.position[1] === 0) return;
          --state.position[1];
          break;
        }
        case Direction.Left: {
          if (state.position[0] === 0) return;
          --state.position[0];
          break;
        }
        case Direction.Right: {
          if (state.position[0] === gameMapWidth - 1) return;
          ++state.position[0];
          break;
        }
      }
      const [x, y] = state.position;
      const { health, moves } = tileEffectMap[state.gameMap[x][y]];
      state.moves += moves;
      state.health += health;
    },
    newGame: (state) => {
      state = { ...initialState };
      state.seed = generateSeed();
      state.gameMap = generateMap(state.seed, gameMapWidth);
      return state;
    },
    loadGame: (state, action: PayloadAction<saveState>) => {
      state = { ...state, ...action.payload };
      state.gameMap = generateMap(state.seed, gameMapWidth);
    },
  },
});

// Action creators are generated for each case reducer function
export const { move, newGame } = playerSlice.actions;

export default playerSlice.reducer;

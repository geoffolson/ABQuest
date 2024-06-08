import { Tile } from "../generateMap/generateMap";
import { Solution } from "../pathfinder/findSolution";
import { PlayerInput } from "../redux/gameSlice";
import { Vector2 } from "../redux/gameSlice";

export type Character = {
  position: Vector2;
  endpoint: Vector2;
  moves: number;
  health: number;
};

type Init = {
  type: "init";
  gameMap: Tile[][];
  character: Character;
};

type CurrentPath = {
  type: "current-path";
  path: PlayerInput[];
};

type CurrentSolution = {
  type: "current-solution";
  path: PlayerInput[];
};

type FinalSolution = {
  type: "solution";
  solution: Solution | null;
};

export type WorkerMessage =
  | CurrentPath
  | CurrentSolution
  | Init
  | FinalSolution;

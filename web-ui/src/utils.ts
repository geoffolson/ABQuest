import { Vector2 } from "./redux/gameSlice";
import { saveGameKey } from "./redux/middleware";

// 2D vector equality
export const eq = (A: Vector2, B: Vector2) => A.x === B.x && A.y === B.y;

export const manhattanDistance = (A: Vector2, B: Vector2) =>
  Math.abs(A.x - B.x) + Math.abs(A.y - B.y);

export const hasLocalSavedGame = () => !!window.localStorage.getItem(saveGameKey);

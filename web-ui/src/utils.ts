import { PlayerInput, Vector2 } from "./redux/gameSlice";
import { saveGameKey } from "./redux/middleware";

// 2D vector equality
export const eq = (A: Vector2, B: Vector2) => A.x === B.x && A.y === B.y;

export const manhattanDistance = (A: Vector2, B: Vector2) =>
  Math.abs(A.x - B.x) + Math.abs(A.y - B.y);

// function assumes path is valid and no bounds checking is done.
export const pathCoordinates = (path: PlayerInput[], position: Vector2): Vector2[] => {
  const character = structuredClone(position);
  const coordinates: Vector2[] = [];
  path.forEach((direction) => {
    switch (direction) {
      case PlayerInput.Down: {
        ++character.y;
        break;
      }
      case PlayerInput.Up: {
        --character.y;
        break;
      }
      case PlayerInput.Left: {
        --character.x;
        break;
      }
      case PlayerInput.Right: {
        ++character.x;
        break;
      }
    }
    coordinates.push(structuredClone(character));
  });
  return coordinates;
};

export const hasLocalSavedGame = () => !!window.localStorage.getItem(saveGameKey);

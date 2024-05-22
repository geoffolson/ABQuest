import { vector } from "./redux/gameSlice";
import { saveGameKey } from "./redux/middleware";

// 2D vector equality
export const eq = (A: vector, B: vector) => A.x === B.x && A.y === B.y;

export const hasLocalSavedGame = () => !!window.localStorage.getItem(saveGameKey);

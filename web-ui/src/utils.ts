import { vector } from "./redux/gameSlice";
import { saveGameKey } from "./redux/middleware";

// 2D vector equality
export const eq = (A: vector, B: vector) => A[0] === B[0] && A[1] === B[1];

export const hasLocalSavedGame = () => !!window.localStorage.getItem(saveGameKey);

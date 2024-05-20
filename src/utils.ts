import { vector } from "./redux/gameSlice";
import { saveGameKey } from "./redux/middleware";

export const eq = (A: vector, B: vector) => A[0] === B[0] && A[1] === B[1];

export const hasSavedGame = () => window.localStorage.getItem(saveGameKey);

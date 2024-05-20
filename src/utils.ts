import { vector } from "./redux/gameSlice";

export const eq = (A: vector, B: vector) => A[0] === B[0] && A[1] === B[1];

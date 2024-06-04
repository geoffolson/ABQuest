import { useSelector } from "react-redux";
import { RootState } from "./redux/rootReducer";
import { initialHealth, initialMoves } from "./redux/gameSlice";

export const Stats = () => {
  const health = useSelector((state: RootState) => state.game.health);
  const moves = useSelector((state: RootState) => state.game.moves);
  return (
    <div className="bg-black p-2 w-[22rem] bg-opacity-40 rounded-md my-2 text-sm">
      <div className="flex flex-row items-center justify-between w-80">
        <div>
          Health: {health}/{initialHealth}
        </div>
        <div>
          <span
            role="progressbar"
            aria-labelledby="ProgressLabel"
            className="w-48 h-4 block rounded-md bg-gray-800"
          >
            <span
              className="block h-4 rounded-md bg-red-700"
              style={{ width: `${(health / initialHealth) * 100}%` }}
            ></span>
          </span>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between w-80">
        <div>
          Moves: {moves}/{initialMoves}
        </div>
        <div>
          <span
            role="progressbar"
            aria-labelledby="ProgressLabel"
            className="w-48 h-4 block rounded-md bg-gray-800"
          >
            <span
              className="block h-4 rounded-md bg-green-600"
              style={{ width: `${(moves / initialMoves) * 100}%` }}
            ></span>
          </span>
        </div>
      </div>
    </div>
  );
};

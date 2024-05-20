import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { initialHealth, initialMoves } from "./redux/gameSlice";

export const Stats = () => {
  const health = useSelector((state: RootState) => state.game.health);
  const moves = useSelector((state: RootState) => state.game.moves);
  return (
    <>
      <div>
        Health: {health}/{initialHealth}
      </div>
      <div>
        Moves: {moves}/{initialMoves}
      </div>
    </>
  );
};

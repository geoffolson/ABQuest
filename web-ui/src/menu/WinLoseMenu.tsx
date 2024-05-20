import { hasSavedGame } from "../utils";
import { Button } from "./Button";
import { loadGame, newGame } from "../redux/gameSlice";
import { useDispatch } from "react-redux";

const WinLost = (props: { message: string }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex gap-4 flex-col">
      {props.message}
      <Button onClick={() => dispatch(newGame())}>New Game</Button>
      <Button disabled={!hasSavedGame()} onClick={() => dispatch(loadGame())}>
        Load Game
      </Button>
    </div>
  );
};

export const Win = () => <WinLost message="You Won!" />;
export const Lost = () => <WinLost message="You Lost!" />;

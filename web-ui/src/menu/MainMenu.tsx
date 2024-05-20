import { hasSavedGame } from "../utils";
import { Button } from "./Button";
import { loadGame, newGame, saveGame } from "../redux/gameSlice";
import { useDispatch } from "react-redux";

export const MainMenu = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex gap-4 flex-col">
      <Button onClick={() => dispatch(newGame())}>New Game</Button>
      <Button disabled={!hasSavedGame()} onClick={() => dispatch(loadGame())}>
        Load Game
      </Button>
      <Button onClick={() => dispatch(saveGame())}>Save Game</Button>
    </div>
  );
};

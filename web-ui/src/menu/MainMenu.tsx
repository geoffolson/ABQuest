import { hasSavedGame } from "../utils";
import { Button } from "./Button";
import { loadGame, newGame, saveGame, registerScreen } from "../redux/gameSlice";
import { useDispatch } from "react-redux";

export const MainMenu = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex gap-4 flex-col">
      <Button onClick={() => dispatch(registerScreen())}>Log In</Button>
      <Button onClick={() => dispatch(newGame())}>New Game</Button>
      <Button hidden={!hasSavedGame()} onClick={() => dispatch(loadGame())}>
        Load Game
      </Button>
      <Button onClick={() => dispatch(saveGame())}>Save Game</Button>
      <Button onClick={() => dispatch(registerScreen())}>Sign Up</Button>
    </div>
  );
};

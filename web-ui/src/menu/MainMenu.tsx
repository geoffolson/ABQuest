import { Button } from "./Button";
import {
  newGame,
  registerScreen,
  loginScreen,
  logOut,
  pathfinding,
} from "../redux/gameSlice";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { Save } from "./Save";
import { Load } from "./Load";

export const MainMenu = () => {
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.game.username);
  return (
    <div className="flex gap-4 flex-col">
      <Button hidden={!!username} onClick={() => dispatch(loginScreen())}>
        Log In
      </Button>
      <Button onClick={() => dispatch(newGame())}>New Game</Button>
      <Button onClick={() => dispatch(pathfinding(true))}>Find Solution</Button>
      <Load />
      <Save />
      <Button hidden={!!username} onClick={() => dispatch(registerScreen())}>
        Sign Up
      </Button>
      <Button hidden={!username} onClick={() => dispatch(logOut())}>
        Log Out
      </Button>
    </div>
  );
};

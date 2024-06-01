import { Button } from "./Button";
import { newGame, registerScreen, loginScreen, logOut, pathfinding } from "../redux/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import { Save } from "./Save";
import { Load } from "./Load";
import { RootState } from "../redux/store";
import { usePathfinder } from "../worker/useWorker";

export const MainMenu = () => {
  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.game.username);
  const pathRef = usePathfinder();
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

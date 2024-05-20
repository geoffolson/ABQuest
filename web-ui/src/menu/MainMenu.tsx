import { Button } from "./Button";
import { newGame, registerScreen, loginScreen, logOut } from "../redux/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import { Save } from "./Save";
import { Load } from "./Load";
import { RootState } from "../redux/store";

export const MainMenu = () => {
  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.game.username);
  return (
    <div className="flex gap-4 flex-col">
      <Button hidden={!!username} onClick={() => dispatch(loginScreen())}>
        Log In
      </Button>
      <Button onClick={() => dispatch(newGame())}>New Game</Button>
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

import { Button } from "./Button";
import { newGame } from "../redux/gameSlice";
import { Load } from "./Load";
import { useAppDispatch } from "../redux/store";

const WinLost = (props: { message: string }) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex gap-4 flex-col">
      {props.message}
      <Button onClick={() => dispatch(newGame())}>New Game</Button>
      <Load />
    </div>
  );
};

export const Win = () => <WinLost message="You Won!" />;
export const Lost = () => <WinLost message="You Lost!" />;

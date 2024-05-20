import { PlayerState, loadGame, newGame, saveGame } from "../redux/gameSlice";
import { RootState } from "../redux/store";
import { hasSavedGame } from "../utils";
import { Button } from "./Button";
import { useDispatch, useSelector } from "react-redux";

export const Modal = () => {
  const dispatch = useDispatch();
  const playerState = useSelector((state: RootState) => state.game.playerState);
  const hideModal = playerState === PlayerState.Playing ? "hidden" : "";
  return (
    <div
      id="modal"
      className={`${hideModal} fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4`}
    >
      <div className="relative top-40 mx-auto shadow-xl bg-white max-w-md">
        <div className="flex justify-between items-center bg-gray-800 text-white text-xl px-4 py-2">
          <h3>Cenith Quest</h3>
        </div>

        <div className="h-96 p-4 bg-gray-500 flex gap-4 flex-col">
          <Button onClick={() => dispatch(newGame())}>New Game</Button>
          <Button disabled={!hasSavedGame()} onClick={() => dispatch(loadGame())}>
            Load Game
          </Button>
          <Button onClick={() => dispatch(saveGame())}>Save Game</Button>
        </div>
      </div>
    </div>
  );
};

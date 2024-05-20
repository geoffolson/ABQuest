import { useState } from "react";
import { Button } from "./Button";
import { SaveState, cancelRegistration, saveGame } from "../redux/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { userAPI } from "../api";

export const Save = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.game.username);
  const gameState: SaveState = useSelector((state: RootState) => {
    return {
      position: state.game.position,
      health: state.game.health,
      moves: state.game.moves,
      seed: state.game.seed,
      endpoint: state.game.endpoint,
    };
  });
  const cloudSave = async () => {
    setIsLoading(true);
    await userAPI.saveGame(gameState);
    setIsLoading(false);
  };
  return (
    <div className="flex gap-4 flex-row">
      <Button onClick={() => dispatch(saveGame())}>Local Save</Button>
      <Button isLoading={isLoading} disabled={!username} onClick={() => cloudSave()}>
        Cloud Save
      </Button>
    </div>
  );
};

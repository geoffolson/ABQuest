import { useState } from "react";
import { Button } from "./Button";
import { saveGame } from "../redux/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { userAPI } from "../api";

export const Save = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.game.username);
  const game = useSelector((state: RootState) => state.game);
  const cloudSave = async () => {
    setIsLoading(true);
    await userAPI.saveGame({
      position: game.position,
      health: game.health,
      moves: game.moves,
      seed: game.seed,
      endpoint: game.endpoint,
    });
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
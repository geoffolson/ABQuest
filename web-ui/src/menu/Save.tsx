import { useState } from "react";
import { Button } from "./Button";
import { saveGame, saveUser } from "../redux/gameSlice";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { userAPI } from "../api";

export const Save = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.game.username);
  const game = useAppSelector((state) => state.game);
  const cloudSave = async () => {
    setIsLoading(true);
    const { username, savedGameId } = await userAPI
      .saveGame({
        position: game.position,
        health: game.health,
        moves: game.moves,
        seed: game.seed,
        endpoint: game.endpoint,
      })
      .then((res) => res.json());
    dispatch(saveUser({ username, savedGameId }));
    setIsLoading(false);
  };
  return (
    <div className="flex gap-4 flex-row">
      <Button onClick={() => dispatch(saveGame())}>Local Save</Button>
      <Button
        isLoading={isLoading}
        disabled={!username}
        onClick={() => cloudSave()}
      >
        Cloud Save
      </Button>
    </div>
  );
};

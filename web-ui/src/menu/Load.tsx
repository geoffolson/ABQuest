import { hasLocalSavedGame } from "../utils";
import { Button } from "./Button";
import { loadGame } from "../redux/gameSlice";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { userAPI } from "../api";
import { useState } from "react";

export const Load = () => {
  const dispatch = useAppDispatch();
  const savedGameId = useAppSelector((state) => state.game.savedGameId);
  const [loading, setIsLoading] = useState(false);
  // TODO Add error handling
  const loadCloudGame = async () => {
    setIsLoading(true);
    const user = await userAPI.getProfile();
    if (user.savedGameId) {
      const savedGame = await userAPI.getSavedGame();
      dispatch(loadGame(savedGame));
    }
    setIsLoading(false);
  };
  return (
    <div className="flex gap-4 flex-row">
      <Button disabled={!hasLocalSavedGame()} onClick={() => dispatch(loadGame())}>
        Load Local Game
      </Button>
      <Button isLoading={loading} disabled={savedGameId === null} onClick={loadCloudGame}>
        Load Cloud Game
      </Button>
    </div>
  );
};

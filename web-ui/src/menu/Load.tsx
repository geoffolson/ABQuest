import { hasLocalSavedGame } from "../utils";
import { Button } from "./Button";
import { loadGame } from "../redux/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { userAPI } from "../api";
import { useState } from "react";

export const Load = () => {
  const dispatch = useDispatch();
  const savedGameId = useSelector((state: RootState) => state.game.savedGameId);
  const [loading, setIsLoading] = useState(false);
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
      <Button disabled={savedGameId === null} onClick={loadCloudGame}>
        Load Cloud Game
      </Button>
    </div>
  );
};
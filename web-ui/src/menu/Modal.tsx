import { MenuScreen, PlayerState } from "../redux/gameSlice";
import { RootState } from "../redux/rootReducer";
import { useSelector } from "react-redux";
import { MainMenu } from "./MainMenu";
import { Win, Lost } from "./WinLoseMenu";
import { Register } from "./Register";
import { Pathfinding } from "./Pathfinding";

export const Modal = () => {
  const playerState = useSelector((state: RootState) => state.game.playerState);
  const menuScreen = useSelector((state: RootState) => state.game.menuScreen);
  const username = useSelector((state: RootState) => state.game.username);
  const hideModal = playerState === PlayerState.Playing ? "hidden" : "";
  return (
    <div
      className={`${hideModal} fixed z-50 inset-0 bg-gray-900 bg-opacity-40 overflow-y-auto h-full w-full px-4`}
    >
      <div className="relative top-40 mx-auto shadow-xl bg-gray-950 bg-opacity-70 max-w-md">
        <div className="flex justify-between items-center bg-gray-800 bg-opacity-50 text-white text-xl px-4 py-2">
          <h3>Cenith Quest</h3>
          <h3 hidden={!username}>{username}</h3>
        </div>

        <div className="h-100 p-4">
          {(() => {
            switch (playerState) {
              case PlayerState.Won:
                return <Win />;
              case PlayerState.Lost:
                return <Lost />;
              case PlayerState.Pathfinding:
                return <Pathfinding />;
            }
            switch (menuScreen) {
              case MenuScreen.Regisration:
                return <Register />;
              case MenuScreen.Login:
                return <Register login />;
            }
            return <MainMenu />;
          })()}
        </div>
      </div>
    </div>
  );
};

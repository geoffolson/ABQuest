import { MenuScreen, PlayerState } from "../redux/gameSlice";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { MainMenu } from "./MainMenu";
import { Win, Lost } from "./WinLoseMenu";
import { Register } from "./Register";

export const Modal = () => {
  const playerState = useSelector((state: RootState) => state.game.playerState);
  const menuScreen = useSelector((state: RootState) => state.game.menuScreen);
  const username = useSelector((state: RootState) => state.game.username);
  const hideModal = playerState === PlayerState.Playing ? "hidden" : "";
  return (
    <div
      className={`${hideModal} fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4`}
    >
      <div className="relative top-40 mx-auto shadow-xl bg-white max-w-md">
        <div className="flex justify-between items-center bg-gray-800 text-white text-xl px-4 py-2">
          <h3>Cenith Quest</h3>
          <h3 hidden={!username}>{username}</h3>
        </div>

        <div className="h-100 p-4 bg-gray-500">
          {(() => {
            if (playerState === PlayerState.Won) return <Win />;
            if (playerState === PlayerState.Lost) return <Lost />;
            if (menuScreen === MenuScreen.Regisration) return <Register />;
            if (menuScreen === MenuScreen.Login) return <Register login />;
            return <MainMenu />;
          })()}
        </div>
      </div>
    </div>
  );
};

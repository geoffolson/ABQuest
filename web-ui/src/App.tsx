import { useAppDispatch } from "./redux/store";
import { PlayerInput, move, saveUser } from "./redux/gameSlice";
import { Stats } from "./Stats";
import { Map } from "./Map";
import { Modal } from "./menu/Modal";
import { World } from "./World";
import { useCallback, useEffect } from "react";
import { userAPI } from "./api";

function App() {
  const dispatch = useAppDispatch();
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.code) {
        case "ArrowUp":
        case "KeyW":
          dispatch(move(PlayerInput.Up));
          break;
        case "ArrowDown":
        case "KeyS":
          dispatch(move(PlayerInput.Down));
          break;
        case "ArrowLeft":
        case "KeyA":
          dispatch(move(PlayerInput.Left));
          break;
        case "ArrowRight":
        case "KeyD":
          dispatch(move(PlayerInput.Right));
          break;
        case "Escape":
        case "Space":
          dispatch(move(PlayerInput.Pause));
          break;
      }
    },
    [dispatch]
  );
  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);
  return (
    <div
      ref={() => {
        userAPI
          .getProfile()
          .then((user) => dispatch(saveUser(user)))
          .catch((_e) => {});
      }}
      className="h-screen bg-sky-900"
    >
      <World />
      <div className="flex flex-col w-full bg-gray-950">
        <div className="flex w-full content-between justify-between bg-blue-500"></div>
        <Modal />
        <div className="fixed z-10 inset-0 bg-transparent px-4">
          <Stats />
          <Map />
        </div>
      </div>
    </div>
  );
}

export default App;

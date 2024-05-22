import { useDispatch } from "react-redux";
import { PlayerInput, move, saveUser } from "./redux/gameSlice";
import { Stats } from "./Stats";
import { Map } from "./Map";
import { Modal } from "./menu/Modal";
import { World } from "./World";
import { useEffect } from "react";
import { userAPI } from "./api";

function App() {
  const dispatch = useDispatch();
  const onKeyDown = (e: KeyboardEvent) => {
    switch (e.code) {
      case "ArrowUp":
        dispatch(move(PlayerInput.Up));
        break;
      case "ArrowDown":
        dispatch(move(PlayerInput.Down));
        break;
      case "ArrowLeft":
        dispatch(move(PlayerInput.Left));
        break;
      case "ArrowRight":
        dispatch(move(PlayerInput.Right));
        break;
      case "Escape":
      case "Space":
        dispatch(move(PlayerInput.Pause));
        break;
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    userAPI.getProfile().then((user) => dispatch(saveUser(user)));
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [dispatch]);
  return (
    <div className="h-screen bg-sky-900" tabIndex={0}>
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

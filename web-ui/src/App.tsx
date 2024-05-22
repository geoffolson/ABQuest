import { useDispatch } from "react-redux";
import { PlayerInput, move } from "./redux/gameSlice";
import { Stats } from "./Stats";
import { Map } from "./Map";
import { Modal } from "./menu/Modal";
import { World } from "./World";
import { useEffect } from "react";

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
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [dispatch]);
  return (
    <div className="h-screen bg-sky-900" tabIndex={0}>
      <World />
      <div className="flex flex-col w-full bg-gray-950">
        <div className="flex w-full content-between justify-between bg-blue-500"></div>
        <Modal />
        <div className="fixed z-10 inset-0 bg-gray-900 bg-transparent overflow-y-auto h-full w-full px-4">
          <Stats />
          <Map />
        </div>
      </div>
    </div>
  );
}

export default App;

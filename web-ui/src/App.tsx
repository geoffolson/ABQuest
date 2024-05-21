import { useDispatch } from "react-redux";
import { PlayerInput, move } from "./redux/gameSlice";
import { Stats } from "./Stats";
import { Map } from "./Map";
import { Modal } from "./menu/Modal";

function App() {
  const dispatch = useDispatch();
  return (
    <div
      className="flex flex-col w-full h-screen"
      tabIndex={0}
      onKeyDown={(e) => {
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
      }}
    >
      <div className="flex w-full content-between justify-between">
        <Stats />
      </div>
      <Map />
      <Modal />
    </div>
  );
}

export default App;

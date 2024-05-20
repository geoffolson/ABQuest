import { useDispatch } from "react-redux";
import { Direction, move } from "./redux/gameSlice";
import { Stats } from "./Stats";
import { Map } from "./Map";

function App() {
  const dispatch = useDispatch();
  return (
    <div
      className="flex flex-col w-full h-full items-center justify-center"
      tabIndex={0}
      onKeyDown={(e) => {
        switch (e.code) {
          case "ArrowUp":
            dispatch(move(Direction.Up));
            break;
          case "ArrowDown":
            dispatch(move(Direction.Down));
            break;
          case "ArrowLeft":
            dispatch(move(Direction.Left));
            break;
          case "ArrowRight":
            dispatch(move(Direction.Right));
            break;
        }
      }}
    >
      <div className="flex w-full content-between justify-between">
        <Stats />
      </div>
      <Map />
    </div>
  );
}

export default App;

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/store";
import { Direction, move } from "./redux/gameSlice";

function App() {
  const gameMap = useSelector((state: RootState) => state.game.gameMap);
  const position = useSelector((state: RootState) => state.game.position);
  const dispatch = useDispatch();
  return (
    <div
      className="flex break-all"
      style={{ width: "520px" }}
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
      {gameMap}
    </div>
  );
}

export default App;

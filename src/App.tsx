import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/store";
import { Direction, move } from "./redux/gameSlice";
import { Tile } from "./Tile";
import { eq } from "./utils";

function App() {
  const gameMap = useSelector((state: RootState) => state.game.gameMap);
  const position = useSelector((state: RootState) => state.game.position);
  const playerState = useSelector((state: RootState) => state.game.playerState);
  const dispatch = useDispatch();
  return (
    <div
      className="flex w-full items-center justify-center"
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
      <div className="flex">
        {gameMap.map((row, x) => (
          <div key={x}>
            {row.map((tile, y) => {
              return (
                <Tile key={`${x}-${y}`} tile={tile}>
                  {eq([x, y], position) ? "@" : null}
                </Tile>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

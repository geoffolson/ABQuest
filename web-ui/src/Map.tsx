import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { Tile } from "./Tile";
import { eq } from "./utils";
import { vector } from "./redux/gameSlice";

export const Map = () => {
  const gameMap = useSelector((state: RootState) => state.game.gameMap);
  const position = useSelector((state: RootState) => state.game.position);
  const endPosition = useSelector((state: RootState) => state.game.endpoint);
  return (
    <div className="flex">
      {gameMap.map((row, x) => (
        <div key={x}>
          {row.map((tile, y) => {
            const currentTile: vector = [x, y];
            if (eq(currentTile, position))
              return (
                <Tile key={`${x}-${y}`} tile={tile}>
                  @
                </Tile>
              );
            else if (eq(currentTile, endPosition))
              return (
                <Tile key={`${x}-${y}`} tile={tile}>
                  %
                </Tile>
              );
            else return <Tile key={`${x}-${y}`} tile={tile} />;
          })}
        </div>
      ))}
    </div>
  );
};

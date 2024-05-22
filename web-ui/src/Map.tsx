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
    <div className="flex w-96 h-96 justify-center">
      <div className="flex flex-col w-screen">
        {gameMap.map((row, y) => (
          <div className="flex flex-row w-full" key={y}>
            {row.map((tile, x) => {
              const currentTile: vector = { y, x };
              if (eq(currentTile, position)) return <Tile key={`${x}-${y}`} tile={tile} isPlayer />;
              else if (eq(currentTile, endPosition))
                return <Tile key={`${x}-${y}`} tile={tile} isEndpoint />;
              else return <Tile key={`${x}-${y}`} tile={tile} />;
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

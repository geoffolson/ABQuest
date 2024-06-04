import { useSelector } from "react-redux";
import { RootState } from "./redux/rootReducer";
import { Tile } from "./Tile";
import { eq, pathCoordinates } from "./utils";
import { Vector2 } from "./redux/gameSlice";
import { useMemo } from "react";

export const Map = () => {
  const gameMap = useSelector((state: RootState) => state.game.gameMap);
  const position = useSelector((state: RootState) => state.game.position);
  const endPosition = useSelector((state: RootState) => state.game.endpoint);

  const path = useSelector((state: RootState) => state.game.path);
  const isPathTile = useMemo(() => {
    let coordinates: Vector2[] = [];
    if (path) coordinates = pathCoordinates(path, position);
    const coordinatesSet = new Set(coordinates.map(({ x, y }) => `${x}-${y}`));
    return ({ x, y }: Vector2) => coordinatesSet.has(`${x}-${y}`);
  }, [path, position]);

  return (
    <div className="flex w-72 h-72 justify-center border-2 border-black opacity-90">
      <div className="flex flex-col w-screen">
        {gameMap.map((row, y) => (
          <div className="flex flex-row w-full" key={y}>
            {row.map((tile, x) => {
              const currentTile: Vector2 = { y, x };
              const isPath = isPathTile(currentTile);
              if (eq(currentTile, position)) return <Tile key={`${x}-${y}`} tile={tile} isPlayer />;
              else if (eq(currentTile, endPosition))
                return <Tile key={`${x}-${y}`} tile={tile} isEndpoint />;
              else return <Tile key={`${x}-${y}`} tile={tile} isPath={isPath} />;
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

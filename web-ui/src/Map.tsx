import { useAppSelector } from "./redux/store";
import { Tile } from "./Tile";
import { eq, pathCoordinates } from "./utils";
import { Vector2 } from "./redux/gameSlice";
import { useMemo } from "react";

export const Map = () => {
  const gameMap = useAppSelector((state) => state.game.gameMap);
  const position = useAppSelector((state) => state.game.position);
  const endPosition = useAppSelector((state) => state.game.endpoint);

  const path = useAppSelector((state) => state.game.path);
  const solution = useAppSelector((state) => state.game.solution);

  const isPathTile = useMemo(() => {
    let coordinates: Vector2[] = [];
    if (path) coordinates = pathCoordinates(path, position);
    const coordinatesSet = new Set(coordinates.map(({ x, y }) => `${x}-${y}`));
    return ({ x, y }: Vector2) => coordinatesSet.has(`${x}-${y}`);
  }, [path, position]);

  const isSolutionTile = useMemo(() => {
    let coordinates: Vector2[] = [];
    if (solution) coordinates = pathCoordinates(solution, position);
    const coordinatesSet = new Set(coordinates.map(({ x, y }) => `${x}-${y}`));
    return ({ x, y }: Vector2) => coordinatesSet.has(`${x}-${y}`);
  }, [solution, position]);

  return (
    <div className="flex w-72 h-72 justify-center border-2 border-black opacity-90">
      <div className="flex flex-col w-screen">
        {gameMap.map((row, y) => (
          <div className="flex flex-row w-full" key={y}>
            {row.map((tile, x) => {
              const currentTile: Vector2 = { y, x };
              const isPath = isPathTile(currentTile);
              const isSolution = isSolutionTile(currentTile);
              if (eq(currentTile, position)) return <Tile key={`${x}-${y}`} tile={tile} isPlayer />;
              else if (eq(currentTile, endPosition))
                return <Tile key={`${x}-${y}`} tile={tile} isEndpoint />;
              else
                return (
                  <Tile key={`${x}-${y}`} tile={tile} isPath={isPath} isSolution={isSolution} />
                );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { Tile } from "./Tile";
import { eq, useOnWindowResize } from "./utils";
import { vector } from "./redux/gameSlice";
import { useState } from "react";

export const Map = () => {
  const [dimension, setDimension] = useState<string | number>(1);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const gameMap = useSelector((state: RootState) => state.game.gameMap);
  const position = useSelector((state: RootState) => state.game.position);
  const endPosition = useSelector((state: RootState) => state.game.endpoint);
  useOnWindowResize(() => {
    const width = ref?.offsetWidth ?? 1;
    const height = ref?.offsetHeight ?? 1;
    setDimension(Math.min(height, width));
  }, [ref]);
  return (
    <div ref={(ref) => setRef(ref)} className="flex w-full h-full justify-center">
      <div className="flex flex-col w-screen" style={{ width: dimension, height: dimension }}>
        {gameMap.map((row, x) => (
          <div className="flex flex-row w-full" key={x}>
            {row.map((tile, y) => {
              const currentTile: vector = [x, y];
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

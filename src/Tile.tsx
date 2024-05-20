import mudURL from "./assets/mud.png";
import asphaltURL from "./assets/asphalt.png";
import lavaURL from "./assets/lava.png";
import sandURL from "./assets/sand.png";
import { Tile as TileType } from "./generateMap/generateMap";
import { useMemo } from "react";

export const Tile = ({ tile, children }: { tile: TileType; children?: any }) => {
  const imgURL = useMemo(() => {
    return {
      B: sandURL,
      S: asphaltURL,
      M: mudURL,
      L: lavaURL,
    }[tile];
  }, [tile]);
  return (
    <div
      className="bg-no-repeat w-6 h-6 bg-cover img-pixelated"
      style={{ backgroundImage: `url("${imgURL}")` }}
    >
      {children}
    </div>
  );
};

import mudURL from "./assets/mud.png";
import asphaltURL from "./assets/asphalt.png";
import lavaURL from "./assets/lava.png";
import sandURL from "./assets/sand.png";
import { Tile as TileType } from "./generateMap/generateMap";
import { useMemo } from "react";
import classNames from "classnames";

export const Tile = ({
  tile,
  isPlayer,
  isEndpoint,
  isPath,
  isSolution,
}: {
  tile: TileType;
  isPlayer?: boolean;
  isEndpoint?: boolean;
  isPath?: boolean;
  isSolution?: boolean;
}) => {
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
      className="bg-no-repeat w-full bg-cover img-pixelated"
      style={{ backgroundImage: `url("${imgURL}")` }}
    >
      <div
        className={classNames(
          "pb-[100%]",
          { "bg-blue-700": isPlayer },
          { "bg-green-700": isEndpoint && !isPlayer },
          { "bg-green-400": isSolution && !isEndpoint && !isPlayer },
          { "bg-purple-700": isPath && !isSolution && !isEndpoint && !isPlayer },
          { "bg-gray-700": isPath && isSolution && !isEndpoint && !isPlayer }
        )}
      />
    </div>
  );
};

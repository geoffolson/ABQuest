import { noise } from "./perlin";
export type Tile = "B" | "S" | "L" | "M";

export const generateMap = (seed: number, width: number): Tile[][] => {
  noise.seed(seed);
  let min = 1;
  let max = 0;
  const tiles = new Array(width * width)
    .fill(1)
    .map((_, idx) => {
      const value = noise.perlin2(
        (idx % width) / width,
        Math.floor(idx / width) / width,
      );
      if (value < min) min = value;
      if (value > max) max = value;
      return value;
    })
    .map((value) => {
      const diff = max - min;
      // mud
      if (value < 0.2 * diff + min) return "M";
      // blank
      if (value < 0.6 * diff + min) return "B";
      // speed
      if (value < 0.8 * diff + min) return "S";
      // lava
      return "L";
    });
  const gameMap: Tile[][] = [];
  for (let i = 0; i < tiles.length; i += width) {
    gameMap.push(tiles.slice(i, i + width));
  }
  return gameMap;
};

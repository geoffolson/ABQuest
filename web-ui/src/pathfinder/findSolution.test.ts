import { expect, test } from "vitest";
import { findSolution } from "./findSolution";
import { Tile, generateMap } from "../generateMap/generateMap";
import { CharacterState } from "../redux/gameSlice";

const map: Tile[][] = [
  ["L", "L", "L", "L", "L"],
  ["L", "L", "L", "L", "L"],
  ["S", "S", "S", "S", "S"],
  ["L", "L", "L", "L", "S"],
  ["L", "L", "L", "L", "S"],
];

test("map to be solvable with player stats", () => {
  const character: CharacterState = {
    position: { x: 0, y: 2 },
    endpoint: { x: 4, y: 4 },
    moves: 1,
    health: 35,
  };
  expect(findSolution(map, character)).toBe(true);
});

test("map to be unsolvable with player stats", () => {
  const character: CharacterState = {
    position: { x: 0, y: 2 },
    endpoint: { x: 4, y: 4 },
    moves: 1,
    health: 2,
  };
  expect(findSolution(map, character)).toBe(false);
});

test("map to be solvable with player stats", () => {
  const character: CharacterState = {
    position: { x: 0, y: 0 },
    endpoint: { x: 15, y: 15 },
    moves: 200,
    health: 450,
  };
  const map = generateMap(123, 25);
  expect(findSolution(map, character)).toBe(true);
});

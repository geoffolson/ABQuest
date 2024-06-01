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
  expect(!!findSolution(map, character)).toBe(true);
});

test("map to be unsolvable with player stats", () => {
  const character: CharacterState = {
    position: { x: 0, y: 2 },
    endpoint: { x: 4, y: 4 },
    moves: 1,
    health: 2,
  };
  expect(!!findSolution(map, character)).toBe(false);
});

test("map to be solvable with player stats", () => {
  const character: CharacterState = {
    position: { x: 24, y: 24 },
    endpoint: { x: 49, y: 0 },
    moves: 200,
    health: 450,
  };
  let map = generateMap(123, 50);
  let solution = findSolution(map, character);
  expect(!!solution).toBe(true);
  map = generateMap(222, 50);
  solution = findSolution(map, character);
  expect(!!solution).toBe(true);
});

test("test player provided map for optimal solution", () => {
  const character: CharacterState = {
    endpoint: { x: 42, y: 16 },
    position: { x: 24, y: 24 },
    moves: 200,
    health: 450,
  };
  let map = generateMap(10582, 50);
  let solution = findSolution(map, character);
  expect((solution?.character?.moves ?? 0) + (solution?.character?.health ?? 0)).toBe(624);
});

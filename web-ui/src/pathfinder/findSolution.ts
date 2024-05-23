import { Tile } from "../generateMap/generateMap";
import { CharacterState, PlayerInput, vector, tileEffectMap } from "../redux/gameSlice";
import { eq } from "../utils";

type Heuristic = { health: number; moves: number };

class VisitedTiles {
  private visitedTilesMap;
  constructor() {
    this.visitedTilesMap = new Map<string, Heuristic[]>();
  }

  getVisited(position: vector) {
    return this.visitedTilesMap.get(`${position.x}-${position.y}`);
  }

  setVisited(character: CharacterState) {
    const visited = this.getVisited(character.position);
    if (visited) visited.push({ health: character.health, moves: character.moves });
    else
      this.visitedTilesMap.set(`${character.position.x}-${character.position.y}`, [
        {
          health: character.health,
          moves: character.moves,
        },
      ]);
  }
}

class GameMap {
  private map;
  private width;
  constructor(map: Tile[][]) {
    this.map = map;
    this.width = this.map.length;
  }
  move(character: CharacterState, direction: PlayerInput) {
    // performing deep copy of character object
    const _character: CharacterState = JSON.parse(JSON.stringify(character));
    switch (direction) {
      case PlayerInput.Down: {
        if (character.position.y === this.width - 1) return null;
        ++_character.position.y;
        break;
      }
      case PlayerInput.Up: {
        if (_character.position.y === 0) return null;
        --_character.position.y;
        break;
      }
      case PlayerInput.Left: {
        if (_character.position.x === 0) return null;
        --_character.position.x;
        break;
      }
      case PlayerInput.Right: {
        if (_character.position.x === this.width - 1) return null;
        ++_character.position.x;
        break;
      }
    }
    const { x, y } = _character.position;
    const { health, moves } = tileEffectMap[this.map[y][x]];
    _character.moves += moves;
    _character.health += health;
    return _character;
  }
}

class FindSolution {
  private gameMap;
  private visitedTiles;

  constructor(gameMap: Tile[][]) {
    this.gameMap = new GameMap(gameMap);
    this.visitedTiles = new VisitedTiles();
  }

  private continueTraversal(character: CharacterState) {
    const visits = this.visitedTiles.getVisited(character.position);
    if (!visits) {
      this.visitedTiles.setVisited(character);
      return true;
    }
    for (const visit of visits) {
      // stop traversing if a prvious path arrived here with objectively better stats
      if (visit.health >= character.health && visit.moves >= character.moves) return false;
    }
    this.visitedTiles.setVisited(character);
    return true;
  }

  isSolvable(character: CharacterState) {
    // base case
    if (character.health < 0 || character.moves < 0) return false;
    // success
    if (eq(character.endpoint, character.position)) return true;

    for (const direction of [
      PlayerInput.Left,
      PlayerInput.Up,
      PlayerInput.Right,
      PlayerInput.Down,
    ]) {
      const nextPosition = this.gameMap.move(character, direction);
      if (nextPosition && this.continueTraversal(nextPosition)) {
        const result = this.isSolvable(nextPosition);
        if (result) return true;
      }
    }
    return false;
  }
}

export const findSolution = (map: Tile[][], character: CharacterState) => {
  const findSolution = new FindSolution(map);
  return findSolution.isSolvable(character);
};
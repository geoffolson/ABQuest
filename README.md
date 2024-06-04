# AB Quest

Simple adventure game with procedurally generated maps using perlin noise, local save system, and cloud saving. The API for managing saved games is built using Typescript, Express, Prisma, and Zod for input validation.

Try the live [demo](http://ec2-35-93-44-36.us-west-2.compute.amazonaws.com/)

# Install

The game is containerized and will run on port 80. Run the following to start up a local instance

```
git clone https://github.com/geoffolson/ABQuest.git
cd ABQuest
docker compose up -d
```

# Exercise

## Assignment 1 - React App

The frontend application is built using Vite, React, Typescript, Tailwind CSS, Redux-toolkit for state management, and react-three-fiber for the 3D graphics.

### Game Map

Each time a new game is created it's procedurally generated using a 2d perlin noise function. Player and game state is managed by redux. This makes sharing common game data accross tha app simple and game logic lives in the reducers which are purely functional making them simple to unit test.

### Player View

The game is 3d-rendered using React three fiber. This tooling was chosen as it allows me to write three.js code in a declarative manner using React components.

### Mini Map

The mini map of the game was the original method of rendering the game. The first iteration the game view used ASCII characters like classic CLI games like Rogue. The view evolved to use divs forming tiles for the map. It has now been shrunken and transformed into a mini-map. This will later on be replaced with a canvas element in a future iteration.

## Assignment 2 - Back End API

The backend API is built using nodejs, Typescript, Prisma, Express, and Zod for input validation.

### Users

Keeping it simple for the scope of this assignment the api uses local auth and JWT tokens. User passwords are hashed before stored in the database.

### Game Data

The API allows users to save their game by saving their current health, moves left, position on the map, where the endpoint is, and a seed value that was used to generate the map. Since the maps are procedurally generated we only need to store a single seed value for the client to regenerate the map the player was on.

## Assignment 3 - Pahtfinder

**Work In Progress**

To currently check if a set of grids are solvable navigate to the web-ui directory and run

```
npm run test
```

Function findSolution will perform a depth first search for the optimal path. When the optimal path is found an object is returned with a path array and character stats after traversing the path.

### Optimizations

#### Traversal Direction

In the implementation of \_findSolution the for loop making the recursive calls was traversing left first on the map, then up, right, then down. In the updated implementation findSolution traverses to the direction that reduces the manhattan distance to the endpoint first. This small optimization lead to a 10x performance boost in some of the auto-generated maps

```typescript
const nextPositions = [PlayerInput.Left, PlayerInput.Up, PlayerInput.Right, PlayerInput.Down]
  .map((direction) => [direction, this.gameMap.move(character, direction)])
  .filter((nextPosition) => !!nextPosition[1]) as [PlayerInput, CharacterState][];
nextPositions.sort(
  (a, b) =>
    manhattanDistance(a[1].position, character.endpoint) -
    manhattanDistance(b[1].position, character.endpoint)
);

for (const [direction, nextPosition] of nextPositions) {
  if (nextPosition && this.continueTraversal(nextPosition))
    this._findSolution(nextPosition, [...path, direction]);
}
return this.solution;
```

#### Traversal Conditions

In the continueTraversal method another minor optimization was added leading to another 10x performance increase. Here, a check if a solution has already been found and whether the stats are better than the current path testing. If so, there's no need to continue and this path can be pruned.

```typescript
// stop traversing if a solution with better stats than current path already exists
if (
  this.solution &&
  character.health + character.moves <
    this.solution.character.health + this.solution.character.moves
)
  return false;

const visits = this.visitedTiles.getVisited(character.position) ?? [];
for (const visit of visits) {
  // stop traversing if a previous path arrived here with objectively better stats
  if (visit.health >= character.health && visit.moves >= character.moves) return false;
}
```

### Implementation

The current implementation is located in `/web-ui/src/pathfinder/findSolution.ts`

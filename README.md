# AB Quest

Simple adventure game with procedurally generated maps using perlin noise, local save system, and cloud saving. The API for managing saved games is built using Typescript, Express, Prisma, and Zod for input validation.

Try the live [demo](http://ec2-34-216-78-119.us-west-2.compute.amazonaws.com/)

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

Function findSolution will perform a depth first search for a possible solution. When one is found the function returns true, otherwise it will return false. More work will be done. Future version will search for and return the optimal path and be integrated into the frontend application.

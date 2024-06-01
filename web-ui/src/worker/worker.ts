import { FindSolution, Solution } from "../pathfinder/findSolution";
import { PlayerInput } from "../redux/gameSlice";
import { Tile } from "../generateMap/generateMap";

class ReduxFindSolution extends FindSolution {
  private onNextPath;
  private onSetSolution;
  constructor(
    gameMap: Tile[][],
    onNextPath: (path: PlayerInput[], currentSolution: Solution | null) => void,
    onSetSolution: (solution: Solution) => void
  ) {
    super(gameMap);
    this.onNextPath = onNextPath;
    this.onSetSolution = onSetSolution;
  }
  public setCurrentPath(path: PlayerInput[]): void {
    this.onNextPath(path, this.solution);
  }
  public setSolution(solution: Solution): void {
    super.setSolution(solution);
    this.onSetSolution(solution);
  }
}

self.onmessage = (event) => {
  let solver: ReduxFindSolution | null = null;
  if (event.data.type === "init") {
    solver = new ReduxFindSolution(
      event.data.gameMap,
      (path, solution) => {
        if (!solution && Math.random() < 0.005) self.postMessage({ type: "current-path", path });
      },
      (solution) => self.postMessage({ type: "current-path", path: solution.path })
    );
    self.postMessage({ type: "current-path", path: [] });
    const solution = solver.findSolution(event.data.character);
    self.postMessage({ type: "solution", solution });
    self.postMessage({ type: "current-path", path: solution?.path });
  }
};

import { FindSolution, Solution } from "../pathfinder/findSolution";
import { PlayerInput } from "../redux/gameSlice";
import { Tile } from "../generateMap/generateMap";
import { WorkerMessage } from "./types";

class ReduxFindSolution extends FindSolution {
  private onNextPath;
  private onSetSolution;
  private updateCounter = 0;
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
    ++this.updateCounter;
    // To avoid excessive message passing slowing down the worker
    if (this.updateCounter > 1000) {
      this.updateCounter = 0;
      this.onNextPath(path, this.solution);
    }
  }
  public setSolution(solution: Solution): void {
    super.setSolution(solution);
    this.onSetSolution(solution);
  }
}

self.onmessage = (event: MessageEvent<WorkerMessage>) => {
  let solver: ReduxFindSolution | null = null;
  if (event.data.type === "init") {
    solver = new ReduxFindSolution(
      event.data.gameMap,
      (path) => {
        self.postMessage({ type: "current-path", path });
      },
      (solution) => {
        self.postMessage({ type: "current-path", path: solution.path });
        self.postMessage({ type: "current-solution", path: solution.path });
      }
    );
    self.postMessage({ type: "current-path", path: [] });
    const solution = solver.findSolution(event.data.character);
    self.postMessage({ type: "solution", solution });
    self.postMessage({ type: "current-path", path: solution?.path });
  }
};

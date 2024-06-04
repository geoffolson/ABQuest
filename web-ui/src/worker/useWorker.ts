import { PlayerInput, PlayerState, pathfinding, updatePath } from "../redux/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useMemo, useRef } from "react";

export const createWorker = () => {
  return new Worker(new URL("./worker.ts", import.meta.url), { type: "module" });
};

export const usePathfinder = () => {
  const dispatch = useDispatch();
  const gameMap = useSelector((state: RootState) => state.game.gameMap);

  const pathRef = useRef<PlayerInput[] | null>(null);

  const position = useSelector((state: RootState) => state.game.position);
  const endpoint = useSelector((state: RootState) => state.game.endpoint);
  const moves = useSelector((state: RootState) => state.game.moves);
  const health = useSelector((state: RootState) => state.game.health);
  const character = useMemo(
    () => ({ position, endpoint, moves, health }),
    [position, endpoint, moves, health]
  );

  const playerState = useSelector((state: RootState) => state.game.playerState);

  useEffect(() => {
    let worker: Worker | null = null;
    let animationFrameHandle = 0;
    if (playerState === PlayerState.Pathfinding && !worker && gameMap) {
      worker = createWorker();
      worker.postMessage({ type: "init", gameMap, character });

      // animation path request callback
      const requestPath = () => {
        dispatch(updatePath(pathRef.current));
        animationFrameHandle = window.requestAnimationFrame(requestPath);
      };
      animationFrameHandle = window.requestAnimationFrame(requestPath);

      worker.onmessage = (event) => {
        switch (event.data?.type) {
          case "current-path": {
            pathRef.current = event.data.path;
            break;
          }
          case "solution": {
            window.cancelAnimationFrame(animationFrameHandle);
            pathRef.current = event.data?.solution?.path;
            dispatch(pathfinding(false));
            dispatch(updatePath(pathRef.current));
            if (pathRef.current) console.log("Optimal Solution Found", event.data.solution);
            else console.log("No solution");
            break;
          }
        }
      };
    }
    return () => {
      window.cancelAnimationFrame(animationFrameHandle);
      worker?.terminate();
    };
  }, [gameMap, character, playerState, dispatch]);
  return pathRef;
};

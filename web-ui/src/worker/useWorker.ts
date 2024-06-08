import {
  PlayerInput,
  PlayerState,
  pathfinding,
  updatePath,
  updateSolution,
} from "../redux/gameSlice";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { useEffect, useMemo, useRef } from "react";
import { WorkerMessage } from "./types";

export const createWorker = () => {
  return new Worker(new URL("./worker.ts", import.meta.url), {
    type: "module",
  });
};

export const usePathfinder = () => {
  const dispatch = useAppDispatch();
  const gameMap = useAppSelector((state) => state.game.gameMap);

  const pathRef = useRef<PlayerInput[] | null>(null);
  const solutionRef = useRef<PlayerInput[] | null>(null);
  const workerRef = useRef<Worker | null>(null);
  const animationFrameHandleRef = useRef<number>(0);

  const position = useAppSelector((state) => state.game.position);
  const endpoint = useAppSelector((state) => state.game.endpoint);
  const moves = useAppSelector((state) => state.game.moves);
  const health = useAppSelector((state) => state.game.health);
  const character = useMemo(
    () => ({ position, endpoint, moves, health }),
    [position, endpoint, moves, health],
  );

  const playerState = useAppSelector((state) => state.game.playerState);

  const terminate = () => {
    window.cancelAnimationFrame(animationFrameHandleRef.current);
    workerRef.current?.terminate();
  };

  useEffect(() => {
    if (
      playerState === PlayerState.Pathfinding &&
      !workerRef.current &&
      gameMap
    ) {
      workerRef.current = createWorker();
      workerRef.current.postMessage({ type: "init", gameMap, character });

      // animation path request callback
      const requestPath = () => {
        dispatch(updatePath(pathRef.current));
        dispatch(updateSolution(solutionRef.current));
        animationFrameHandleRef.current =
          window.requestAnimationFrame(requestPath);
      };
      animationFrameHandleRef.current =
        window.requestAnimationFrame(requestPath);

      workerRef.current.onmessage = (event: MessageEvent<WorkerMessage>) => {
        switch (event.data?.type) {
          case "current-path": {
            pathRef.current = event.data.path;
            break;
          }
          case "current-solution": {
            solutionRef.current = event.data.path;
            break;
          }
          case "solution": {
            window.cancelAnimationFrame(animationFrameHandleRef.current);
            pathRef.current = event.data.solution?.path ?? [];
            dispatch(pathfinding(false));
            dispatch(updatePath(pathRef.current));
            dispatch(updateSolution(pathRef.current));
            if (pathRef.current)
              console.log("Optimal Solution Found", event.data.solution);
            else console.log("No solution");
            break;
          }
        }
      };
    }
    return () => {
      if (playerState !== PlayerState.Pathfinding) {
        terminate();
      }
    };
  }, [gameMap, character, playerState, dispatch]);

  return () => {
    terminate();
    dispatch(pathfinding(false));
    dispatch(updatePath(null));
    dispatch(updateSolution(null));
  };
};

import { PlayerInput, PlayerState, pathfinding, updatePath } from "../redux/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { useEffect, useMemo, useRef } from "react";

export const createWorker = () => {
  return new Worker(new URL("./worker.ts", import.meta.url), { type: "module" });
};

export const usePathfinder = () => {
  const dispatch = useDispatch();
  const gameMap = useSelector((state: RootState) => state.game.gameMap);

  const pathRef = useRef<PlayerInput[] | null>(null);
  const workerRef = useRef<Worker | null>(null);
  const animationFrameHandleRef = useRef<number>(0);

  const position = useSelector((state: RootState) => state.game.position);
  const endpoint = useSelector((state: RootState) => state.game.endpoint);
  const moves = useSelector((state: RootState) => state.game.moves);
  const health = useSelector((state: RootState) => state.game.health);
  const character = useMemo(
    () => ({ position, endpoint, moves, health }),
    [position, endpoint, moves, health]
  );

  const playerState = useSelector((state: RootState) => state.game.playerState);

  const terminate = () => {
    window.cancelAnimationFrame(animationFrameHandleRef.current);
    workerRef.current?.terminate();
  };

  useEffect(() => {
    if (playerState === PlayerState.Pathfinding && !workerRef.current && gameMap) {
      workerRef.current = createWorker();
      workerRef.current.postMessage({ type: "init", gameMap, character });

      // animation path request callback
      const requestPath = () => {
        dispatch(updatePath(pathRef.current));
        animationFrameHandleRef.current = window.requestAnimationFrame(requestPath);
      };
      animationFrameHandleRef.current = window.requestAnimationFrame(requestPath);

      workerRef.current.onmessage = (event) => {
        switch (event.data?.type) {
          case "current-path": {
            pathRef.current = event.data.path;
            break;
          }
          case "solution": {
            window.cancelAnimationFrame(animationFrameHandleRef.current);
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
      if (playerState !== PlayerState.Pathfinding) {
        terminate();
      }
    };
  }, [gameMap, character, playerState, dispatch]);

  return () => {
    terminate();
    dispatch(pathfinding(false));
    dispatch(updatePath(null));
  };
};

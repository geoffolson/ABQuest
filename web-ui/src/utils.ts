import { vector } from "./redux/gameSlice";
import { saveGameKey } from "./redux/middleware";
import { useEffect, useState } from "react";

// 2D vector equality
export const eq = (A: vector, B: vector) => A.x === B.x && A.y === B.y;

export const hasLocalSavedGame = () => !!window.localStorage.getItem(saveGameKey);

export const useOnWindowResize = (callback: Function, deps: any[]) => {
  const [isResized, setIsResized] = useState(false);

  useEffect(() => {
    const onResize = () => {
      setIsResized((s) => !s);
      callback();
    };
    callback();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [callback, ...deps]);

  return isResized;
};

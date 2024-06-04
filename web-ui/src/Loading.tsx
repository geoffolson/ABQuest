import { useEffect, useRef, useState } from "react";

const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

export const Loading = (props: { timeout?: number }) => {
  const intervalRef = useRef(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  useEffect(() => {
    intervalRef.current = window.setInterval(
      () => setCurrentFrame(currentFrame === frames.length - 1 ? 0 : currentFrame + 1),
      props.timeout ?? 100
    );
    return () => clearInterval(intervalRef.current);
  }, [intervalRef, currentFrame]);
  return <>{frames[currentFrame]}</>;
};

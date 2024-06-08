import { useEffect, useRef, useState } from "react";

const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

export const Loading = (props: { timeout?: number }) => {
  const intervalRef = useRef<number>(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  useEffect(() => {
    intervalRef.current = window.setInterval(
      () =>
        setCurrentFrame((currFrame) =>
          currFrame === frames.length - 1 ? 0 : currFrame + 1,
        ),
      props.timeout ?? 100,
    );
    return () => clearInterval(intervalRef.current);
  }, [intervalRef, props.timeout]);
  return <>{frames[currentFrame]}</>;
};

import { Button } from "./Button";
import { usePathfinder } from "../worker/useWorker";
import { Loading } from "../Loading";

export const Pathfinding = () => {
  const cancel = usePathfinder();
  return (
    <div className="flex gap-4 flex-col">
      <div className="flex justify-center text-xl">Searching for optimal solution</div>
      <div className="flex justify-center text-8xl">
        <Loading />
      </div>
      <Button onClick={cancel}>Cancel</Button>
    </div>
  );
};

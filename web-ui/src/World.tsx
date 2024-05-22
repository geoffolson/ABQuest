import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { vector } from "./redux/gameSlice";
import { Tile as TileType } from "./generateMap/generateMap";
import { useRef } from "react";
import { Mesh, Euler, TextureLoader } from "three";
import sandImgURL from "./assets/sand.png";
import lavaImgURL from "./assets/lava.png";
import mudImgURL from "./assets/mud.png";
import asphaltImgURL from "./assets/asphalt.png";

const GameTile = ({ position, tile }: { position: vector; tile: TileType }) => {
  const lava = useLoader(TextureLoader, lavaImgURL);
  const sand = useLoader(TextureLoader, sandImgURL);
  const mud = useLoader(TextureLoader, mudImgURL);
  const asphalt = useLoader(TextureLoader, asphaltImgURL);
  const colorMap = {
    M: mud,
    B: sand,
    S: asphalt,
    L: lava,
  }[tile];
  return (
    <mesh position={[position.x, position.y, 0]}>
      <boxGeometry />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  );
};

const Character = ({ position, color }: { position: vector; color: string }) => {
  const ref = useRef<Mesh>(null);
  useFrame((_state, delta) => {
    if (ref.current) ref.current.rotation.z += delta;
  });
  return (
    <mesh ref={ref} position={[position.x, -position.y, 0.7]}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const _World = () => {
  const position = useSelector((state: RootState) => state.game.position);
  const gameMap = useSelector((state: RootState) => state.game.gameMap);
  const endPosition = useSelector((state: RootState) => state.game.endpoint);
  useFrame((state) => {
    state.camera.position.set(position.x, -(position.y + 3), 3);
  });
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[0, 0, 2]} />
      <Character position={position} color="blue" />
      <Character position={endPosition} color="green" />
      {gameMap.map((row, y) =>
        row.map((tile, x) => {
          return <GameTile key={`${x}-${y}`} position={{ x, y: -y }} tile={tile} />;
        })
      )}
    </>
  );
};

export const World = () => {
  return (
    <Canvas
      camera={{
        rotation: new Euler(Math.PI / 4, 0, 0),
      }}
    >
      <_World />
    </Canvas>
  );
};
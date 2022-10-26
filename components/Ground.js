import React, { useMemo } from "react";
import { usePlane } from "@react-three/cannon";
import {
  TextureLoader,
  RepeatWrapping,
  NearestFilter,
  LinearMipMapLinearFilter,
} from "three";

import graph from "../images/graph.jpg";
import { useStore } from "../hooks/useStore";
export const Ground = (props) => {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI/2, 0, 0], ...props }));
  const texture = useMemo(() => {
    const graphtext = new TextureLoader().load(graph);
    graphtext.wrapS = RepeatWrapping;
    graphtext.wrapT = RepeatWrapping;
    graphtext.repeat.set(100, 100);
    return graphtext;
  }, []);

  const [addCube, activeTexture] = useStore((state) => [
    state.addCube,
    state.texture,
  ]);
  texture.magFilter = NearestFilter;
  texture.minFilter = LinearMipMapLinearFilter;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(100, 100);

  return (
    <mesh
      ref={ref}
      receiveShadow
      onClick={(e) => {
        e.stopPropagation();
        const [x, y, z] = Object.values(e.point).map((coord) =>
          Math.ceil(coord)
        );
        addCube(x, y, z, activeTexture);
      }}
    >
      <planeGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial map={texture} attach="material" />
    </mesh>
  );
};

// export default Ground

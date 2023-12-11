import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Color } from "three";
import { EffectComposer, SSAO } from "@react-three/postprocessing";
import { PointerBall } from "./PointerBall";
import { Scene } from "./Scene";

export default function RapierBalls() {
  return (
    <div className="fixed left-0 top-0 z-0 h-screen w-screen">
      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: true, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
      >
        <Physics gravity={[0, 2, 0]}>
          <Scene />
          <PointerBall />
        </Physics>

        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={4} />
        <directionalLight position={[0, -15, -0]} intensity={4} color="blue" />
        <EffectComposer multisampling={0}>
          <SSAO
            samples={11}
            radius={0.15}
            intensity={20}
            luminanceInfluence={0.6}
            color={new Color("blue")}
            worldDistanceThreshold={0}
            worldDistanceFalloff={0}
            worldProximityThreshold={0}
            worldProximityFalloff={0}
          />
          <SSAO
            samples={21}
            radius={0.03}
            intensity={15}
            luminanceInfluence={0.6}
            color={new Color("blue")}
            worldDistanceThreshold={0}
            worldDistanceFalloff={0}
            worldProximityThreshold={0}
            worldProximityFalloff={0}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

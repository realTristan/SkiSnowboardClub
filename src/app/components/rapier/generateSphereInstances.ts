import { InstancedRigidBodyProps } from "@react-three/rapier";
import { MathUtils, Vector3 } from "three";

export function generateSphereInstances(amount: number) {
  const instances: InstancedRigidBodyProps[] = [];

  for (let i = 0; i < amount; i++) {
    instances.push({
      key: "instance_" + Math.random(),

      // Set sphere positions
      position: new Vector3(
        MathUtils.randFloatSpread(20),
        MathUtils.randFloatSpread(20),
        MathUtils.randFloatSpread(20),
      ),

      // Set sphere rotations
      rotation: [Math.random(), Math.random(), Math.random()],
    });
  }

  return instances;
}

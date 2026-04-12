import { memo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { AdditiveBlending, DoubleSide } from 'three';

function Globe({ radius = 1.6 }) {
  const globeRef = useRef(null);
  const atmosphereRef = useRef(null);

  useFrame((_, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.22;
    }

    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y -= delta * 0.08;
    }
  });

  return (
    <group>
      <mesh ref={atmosphereRef} scale={1.26}>
        <sphereGeometry args={[radius, 48, 48]} />
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.1}
          side={DoubleSide}
          blending={AdditiveBlending}
        />
      </mesh>

      <mesh ref={globeRef} castShadow receiveShadow>
        <sphereGeometry args={[radius, 72, 72]} />
        <meshStandardMaterial
          color="#091327"
          emissive="#163d73"
          emissiveIntensity={0.5}
          metalness={0.22}
          roughness={0.46}
        />
      </mesh>

      <mesh scale={1.01}>
        <sphereGeometry args={[radius, 48, 48]} />
        <meshBasicMaterial color="#93c5fd" wireframe transparent opacity={0.08} />
      </mesh>

      <mesh position={[radius * -0.32, radius * 0.28, radius * 0.88]}>
        <sphereGeometry args={[radius * 0.3, 28, 28]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.14} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius * 1.46, radius * 1.49, 96]} />
        <meshBasicMaterial color="#7da8ff" transparent opacity={0.18} side={DoubleSide} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0.42, 0]}>
        <ringGeometry args={[radius * 1.78, radius * 1.8, 96]} />
        <meshBasicMaterial color="#4c7cf0" transparent opacity={0.12} side={DoubleSide} />
      </mesh>
    </group>
  );
}

export default memo(Globe);

import { memo, useRef } from 'react';
import { OrbitControls, Sparkles } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import Globe from './Globe';
import OrbitingIcons from './OrbitingIcons';

function SceneRig() {
  const rigRef = useRef(null);

  useFrame((state, delta) => {
    if (!rigRef.current) {
      return;
    }

    rigRef.current.rotation.y += delta * 0.16;
    rigRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.22) * 0.06;
  });

  return (
    <group ref={rigRef} position={[0, -0.08, 0]}>
      <Globe radius={1.72} />
      <OrbitingIcons />
    </group>
  );
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={1.1} />
      <directionalLight position={[4.5, 3.4, 5.5]} intensity={1.65} color="#dbeafe" />
      <pointLight position={[-4.5, -2, 5]} intensity={20} color="#2563eb" distance={20} decay={2} />
      <pointLight position={[3.2, 2.8, -3.5]} intensity={10} color="#93c5fd" distance={18} decay={2} />

      <Sparkles
        count={38}
        scale={[13, 8, 12]}
        size={2}
        speed={0.2}
        noise={0.5}
        color="#dbeafe"
      />

      <SceneRig />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.06}
        rotateSpeed={0.6}
        minPolarAngle={Math.PI * 0.28}
        maxPolarAngle={Math.PI * 0.72}
      />
    </>
  );
}

function ContactOrbitalScene() {
  return (
    <div
      className="contact-scene-canvas"
      style={{
        background:
          'radial-gradient(circle at top, color-mix(in srgb, var(--theme-accent) 16%, transparent), transparent 34%), linear-gradient(155deg, #040b18 0%, #071122 46%, #09172f 100%)',
        boxShadow: '0 28px 72px color-mix(in srgb, var(--theme-accent) 12%, transparent)',
      }}
    >
      <div className="pointer-events-none absolute inset-x-[9%] top-0 z-[3] h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent" />
      <div className="pointer-events-none absolute left-6 top-6 z-[3] rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-white/72 backdrop-blur">
        3D Tech Orbit
      </div>
      <div className="pointer-events-none absolute bottom-6 right-6 z-[3] rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-white/60 backdrop-blur">
        Drag to Rotate
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.07),transparent_44%)]" />

      <div className="contact-scene-renderer">
        <Canvas
          className="contact-scene-three"
          camera={{ position: [0, 0.2, 7.6], fov: 34, near: 0.1, far: 100 }}
          frameloop="always"
          dpr={[1.5, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
          style={{ touchAction: 'none' }}
        >
          <SceneContent />
        </Canvas>
      </div>
    </div>
  );
}

export default memo(ContactOrbitalScene);

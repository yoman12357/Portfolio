import { memo, useMemo, useRef } from 'react';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Euler, Quaternion, Vector3 } from 'three';
import { buildShellLayouts, sphericalToVector } from './math';
import { SHELL_CONFIGS, TECHNOLOGIES } from './techData';

const DEFAULT_SCALE = new Vector3(1, 1, 1);

function OrbitIcon({ icon, shell }) {
  const groupRef = useRef(null);
  const basePosition = useMemo(() => icon.basePosition.clone(), [icon.basePosition]);
  const normal = useMemo(() => icon.normal.clone(), [icon.normal]);

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    const elapsedTime = state.clock.getElapsedTime();
    const drift =
      Math.sin(elapsedTime * shell.floatSpeed + icon.phase) * shell.floatAmplitude;

    groupRef.current.position.copy(basePosition).addScaledVector(normal, drift);
    groupRef.current.scale.copy(DEFAULT_SCALE);
  });

  return (
    <group ref={groupRef}>
      <Html transform sprite center distanceFactor={8.8} zIndexRange={[30, 0]}>
        <div className="group relative pointer-events-auto select-none">
          <div
            className="flex items-center justify-center text-[1.45rem] transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 sm:text-[1.65rem]"
            style={{
              color: icon.color,
              filter: `drop-shadow(0 10px 22px color-mix(in srgb, ${icon.color} 18%, transparent))`,
            }}
          >
            <icon.Icon />
          </div>

          <div
            className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 rounded-full border border-white/10 bg-[#07101d]/88 px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-white/85 opacity-0 transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-1 group-hover:opacity-100"
            style={{
              boxShadow: `0 10px 24px color-mix(in srgb, ${icon.color} 18%, transparent)`,
            }}
          >
            {icon.label}
          </div>
        </div>
      </Html>
    </group>
  );
}

function OrbitShell({ shell }) {
  const groupRef = useRef(null);
  const spinQuaternion = useMemo(() => new Quaternion(), []);
  const axisVector = useMemo(
    () => sphericalToVector(1, shell.axisTheta, shell.axisPhi).normalize(),
    [shell.axisPhi, shell.axisTheta]
  );
  const baseQuaternion = useMemo(
    () => new Quaternion().setFromEuler(new Euler(...shell.tilt)),
    [shell.tilt]
  );

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    spinQuaternion.setFromAxisAngle(axisVector, state.clock.getElapsedTime() * shell.speed);
    groupRef.current.quaternion.copy(baseQuaternion).multiply(spinQuaternion);
  });

  return (
    <group ref={groupRef}>
      {shell.icons.map((icon) => (
        <OrbitIcon key={icon.id} icon={icon} shell={shell} />
      ))}
    </group>
  );
}

function OrbitingIcons() {
  const shells = useMemo(
    () =>
      buildShellLayouts({
        technologies: TECHNOLOGIES,
        shells: SHELL_CONFIGS,
      }),
    []
  );

  return (
    <group>
      {shells.map((shell) => (
        <OrbitShell key={shell.id} shell={shell} />
      ))}
    </group>
  );
}

export default memo(OrbitingIcons);

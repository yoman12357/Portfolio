import { MathUtils, Vector3 } from 'three';

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const TWO_PI = Math.PI * 2;

export function sphericalToVector(radius, theta, phi) {
  return new Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

export function angularDistance(left, right) {
  const leftVector = sphericalToVector(1, left.theta, left.phi);
  const rightVector = sphericalToVector(1, right.theta, right.phi);

  return Math.acos(MathUtils.clamp(leftVector.dot(rightVector), -1, 1));
}

export function chordDistanceToAngle(minDistance, radius) {
  return 2 * Math.asin(Math.min(1, minDistance / (2 * radius)));
}

export function generateDistributedSphericalCoords({
  count,
  minAngle,
  thetaOffset = 0,
  candidateMultiplier = 26,
}) {
  const coords = [];
  const candidatePoolSize = Math.max(count * candidateMultiplier, count + 12);

  for (let index = 0; index < candidatePoolSize && coords.length < count; index += 1) {
    const y = 1 - (2 * (index + 0.5)) / candidatePoolSize;
    const phi = Math.acos(MathUtils.clamp(y, -1, 1));
    const theta = (index * GOLDEN_ANGLE + thetaOffset) % TWO_PI;
    const candidate = { theta, phi };

    if (coords.every((existing) => angularDistance(existing, candidate) >= minAngle)) {
      coords.push(candidate);
    }
  }

  if (coords.length < count) {
    throw new Error(`Unable to place ${count} orbital icons with a minimum angle of ${minAngle}.`);
  }

  return coords;
}

export function buildShellLayouts({
  technologies,
  shells,
  minIconSeparation = 1.08,
}) {
  return shells.map((shell) => {
    const shellItems = technologies.filter((technology) => technology.shell === shell.id);
    const minAngle = chordDistanceToAngle(minIconSeparation, shell.radius);
    const sphericalCoords = generateDistributedSphericalCoords({
      count: shellItems.length,
      minAngle,
      thetaOffset: shell.thetaOffset,
    });

    return {
      ...shell,
      icons: shellItems.map((technology, index) => {
        const spherical = sphericalCoords[index];
        const basePosition = sphericalToVector(shell.radius, spherical.theta, spherical.phi);

        return {
          ...technology,
          spherical,
          basePosition,
          normal: basePosition.clone().normalize(),
          phase: shell.thetaOffset + index * 1.137,
        };
      }),
    };
  });
}

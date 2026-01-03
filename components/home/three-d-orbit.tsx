'use client';

import { PointMaterial, Points } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from 'next-themes';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';

function ParticleSphere(props: any) {
  const ref = useRef<THREE.Points>(null!);
  const { theme } = useTheme();

  // Generate points on a sphere
  const sphere = useMemo(() => {
    const count = 5000;
    const radius = 1.2;
    const points = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      points[i * 3] = x;
      points[i * 3 + 1] = y;
      points[i * 3 + 2] = z;
    }
    return points;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  const color = theme === 'dark' ? '#ff0000' : '#800000'; // Red accent

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color={color}
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function ThreeDOrbit() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <ParticleSphere />
        </Suspense>
      </Canvas>
    </div>
  );
}

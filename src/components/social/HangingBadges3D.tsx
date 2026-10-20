// @ts-nocheck
'use client';

import * as THREE from 'three';
import React, { useEffect, useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import { createCleanBadgeCanvasTexture, createCleanBandCanvasTexture } from './badgeTextures';

extend({ MeshLineGeometry, MeshLineMaterial });

if (typeof window !== 'undefined') {
  useGLTF.preload('/models/tag.glb');
}

export interface BadgeCardConfig {
  id: string;
  name: string;
  tagline: string;
  badgeTexture: string;
  bandTexture: string;
  x: number;
  highlightColor: string;
}

interface SingleBadgeProps {
  config: BadgeCardConfig;
  isActive: boolean;
  onSelect: () => void;
  maxSpeed?: number;
  minSpeed?: number;
}

// Wire anchor Y position in world space
const WIRE_Y = 4.2;

function SingleHangingBadge({
  config,
  isActive,
  onSelect,
  maxSpeed = 50,
  minSpeed = 10,
}: SingleBadgeProps) {
  const band = useRef(null);
  const lineGeometry = useRef(null);
  const fixed = useRef(null);
  const j1 = useRef(null);
  const j2 = useRef(null);
  const j3 = useRef(null);
  const card = useRef(null);

  const vec = useMemo(() => new THREE.Vector3(), []);
  const ang = useMemo(() => new THREE.Vector3(), []);
  const rot = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);

  const segmentProps = useMemo(
    () => ({
      type: 'dynamic',
      canSleep: true,
      colliders: false,
      angularDamping: 2.5,
      linearDamping: 2.5,
    }),
    []
  );

  const { nodes, materials } = useGLTF('/models/tag.glb');
  const badgeTex = useMemo(() => createCleanBadgeCanvasTexture(config.id), [config.id]);
  const bandTex = useMemo(() => createCleanBandCanvasTexture(config.id), [config.id]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );

  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1.0]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1.0]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1.0]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 2.06, 0],
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (fixed.current && card.current && j1.current && j2.current && j3.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped) {
          ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        }
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation()))
        );
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });

      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());

      if (lineGeometry.current && lineGeometry.current.setPoints) {
        const points = curve.getPoints(32);
        lineGeometry.current.setPoints(points);
      }

      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';

  return (
    <>
      {/* Vintage brass ring hooked through the clothespin base */}
      <mesh position={[config.x, WIRE_Y, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.09, 0.02, 16, 32]} />
        <meshStandardMaterial
          metalness={0.88}
          roughness={0.25}
          color="#d4af37"
          emissive={isActive ? '#f59e0b' : '#78350f'}
          emissiveIntensity={isActive ? 0.4 : 0.05}
        />
      </mesh>

      {/* Physics chain — positions are in WORLD space */}
      <RigidBody ref={fixed} {...segmentProps} type="fixed" position={[config.x, WIRE_Y, 0]} />
      <RigidBody position={[config.x, WIRE_Y - 0.8, 0]} ref={j1} {...segmentProps}>
        <BallCollider args={[0.06]} />
      </RigidBody>
      <RigidBody position={[config.x, WIRE_Y - 1.6, 0]} ref={j2} {...segmentProps}>
        <BallCollider args={[0.06]} />
      </RigidBody>
      <RigidBody position={[config.x, WIRE_Y - 2.4, 0]} ref={j3} {...segmentProps}>
        <BallCollider args={[0.06]} />
      </RigidBody>

      {/* The interactive badge card — larger size */}
      <RigidBody
        position={[config.x, WIRE_Y - 3.4, 0]}
        ref={card}
        {...segmentProps}
        type={dragged ? 'kinematicPosition' : 'dynamic'}
      >
        <CuboidCollider args={[1.14, 1.6, 0.03]} />
        <group
          scale={3.2}
          position={[0, -1.7, -0.05]}
          onPointerOver={() => hover(true)}
          onPointerOut={() => hover(false)}
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          onPointerUp={(e) => {
            const target = e.target;
            if (target && target.releasePointerCapture) {
              try { target.releasePointerCapture(e.pointerId); } catch (_) {}
            }
            drag(false);
          }}
          onPointerDown={(e) => {
            e.stopPropagation();
            const target = e.target;
            if (target && target.setPointerCapture) {
              try { target.setPointerCapture(e.pointerId); } catch (_) {}
            }
            onSelect();
            drag(
              new THREE.Vector3()
                .copy(e.point)
                .sub(vec.copy(card.current.translation()))
            );
          }}
        >
          <mesh geometry={nodes.card.geometry}>
            <meshPhysicalMaterial
              map={badgeTex}
              clearcoat={1}
              clearcoatRoughness={0.06}
              roughness={0.12}
              metalness={0.03}
              envMapIntensity={0.9}
            />
          </mesh>
          <mesh
            geometry={nodes.clip.geometry}
            material={materials.metal}
            material-roughness={0.15}
            material-metalness={0.95}
          />
          <mesh
            geometry={nodes.clamp.geometry}
            material={materials.metal}
            material-roughness={0.15}
            material-metalness={0.95}
          />
        </group>
      </RigidBody>

      {/* Lanyard band — band mesh at world origin, points in world space */}
      <mesh ref={band}>
        <meshLineGeometry ref={lineGeometry} />
        <meshLineMaterial
          transparent
          opacity={0.96}
          color="white"
          depthTest={false}
          useMap={1}
          map={bandTex}
          repeat={[-3, 1]}
          lineWidth={0.34}
        />
      </mesh>
    </>
  );
}

/** Rustic Cafe Peg-Wire & Wooden Clothespins spanning the entire page width in 3D */
function CafePegWire() {
  const WIRE_SPAN = 80;

  return (
    <group position={[0, WIRE_Y, 0]}>
      {/* ── Main Hanging Cafe Cable / Wire (Aged Bronze / Vintage Steel) ── */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.022, 0.022, WIRE_SPAN, 24]} />
        <meshStandardMaterial
          metalness={0.88}
          roughness={0.28}
          color="#695d4d"
        />
      </mesh>

      {/* Subtle secondary wire twist / shadow for realistic cable texture */}
      <mesh position={[0, -0.015, -0.005]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.008, 0.008, WIRE_SPAN, 12]} />
        <meshStandardMaterial
          metalness={0.7}
          roughness={0.4}
          color="#42392e"
        />
      </mesh>

      {/* ── Rustic Wooden Clothespins / Pegs at each badge anchor ── */}
      {[-3.9, -1.3, 1.3, 3.9].map((x, i) => (
        <group key={i} position={[x, 0.09, 0]}>
          {/* Left wooden pin leg */}
          <mesh position={[-0.05, -0.05, 0]} rotation={[0, 0, 0.06]}>
            <boxGeometry args={[0.075, 0.48, 0.1]} />
            <meshStandardMaterial
              color="#c89658"
              roughness={0.65}
              metalness={0.05}
            />
          </mesh>

          {/* Right wooden pin leg */}
          <mesh position={[0.05, -0.05, 0]} rotation={[0, 0, -0.06]}>
            <boxGeometry args={[0.075, 0.48, 0.1]} />
            <meshStandardMaterial
              color="#b88448"
              roughness={0.65}
              metalness={0.05}
            />
          </mesh>

          {/* Peg Head Top grip notch */}
          <mesh position={[0, 0.18, 0]}>
            <boxGeometry args={[0.15, 0.09, 0.1]} />
            <meshStandardMaterial
              color="#a7733a"
              roughness={0.7}
              metalness={0.05}
            />
          </mesh>

          {/* Brass Metal Spring Coil in the middle of the clothespin */}
          <mesh position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.076, 0.02, 12, 20]} />
            <meshStandardMaterial
              color="#e6c35c"
              roughness={0.25}
              metalness={0.92}
            />
          </mesh>

          {/* Small warm hanging spotlight above each peg */}
          <pointLight
            position={[0, 0.4, 0.5]}
            intensity={4}
            distance={3.5}
            color="#fff0d4"
          />
        </group>
      ))}

      {/* Vintage brass cable ferrules / clamps along the span */}
      {[-12, -7.5, 0, 7.5, 12].map((x) => (
        <mesh key={x} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.038, 0.038, 0.08, 12]} />
          <meshStandardMaterial
            metalness={0.92}
            roughness={0.2}
            color="#d4af37"
          />
        </mesh>
      ))}
    </group>
  );
}

export const BADGE_CONFIGS: BadgeCardConfig[] = [
  {
    id: 'google',
    name: 'Google Reviews',
    tagline: '4.9 ★★★★★ · 2,480+ Reviews',
    badgeTexture: '/textures/google_badge.jpg',
    bandTexture: '/textures/google_band.jpg',
    x: -3.9,
    highlightColor: '#4285F4',
  },
  {
    id: 'instagram',
    name: 'Instagram Feed',
    tagline: '@fooglecafe · 18.5K Followers',
    badgeTexture: '/textures/instagram_badge.jpg',
    bandTexture: '/textures/instagram_band.jpg',
    x: -1.3,
    highlightColor: '#E1306C',
  },
  {
    id: 'facebook',
    name: 'Facebook Community',
    tagline: '99% Recommended · 14K Likes',
    badgeTexture: '/textures/facebook_badge.jpg',
    bandTexture: '/textures/facebook_band.jpg',
    x: 1.3,
    highlightColor: '#1877F2',
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    tagline: '@foogle_udaipur · Live Crust Talk',
    badgeTexture: '/textures/twitter_badge.jpg',
    bandTexture: '/textures/twitter_band.jpg',
    x: 3.9,
    highlightColor: '#F8FAFC',
  },
];

interface HangingBadges3DProps {
  activeId: string;
  onSelect: (id: string) => void;
  isDark?: boolean;
}

export function HangingBadges3D({ activeId, onSelect, isDark = true }: HangingBadges3DProps) {
  return (
    <div className="w-full h-[760px] sm:h-[820px] relative select-none">
      <Suspense
        fallback={
          <div className="w-full h-full flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
            <p className="text-xs font-serif tracking-wider opacity-60">Loading hanging gallery...</p>
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 1.8, 12.0], fov: 43 }}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={Math.PI * 0.9} color="#fff6eb" />
          <directionalLight position={[4, 8, 6]} intensity={1.8} color="#ffecd1" />
          <directionalLight position={[-4, 2, -3]} intensity={0.5} color="#ffe4cc" />
          <pointLight position={[0, WIRE_Y + 1.2, 3]} intensity={16} color="#ffe8c2" distance={14} />

          <Physics interpolate gravity={[0, -38, 0]} timeStep={1 / 60}>
            <CafePegWire />

            {BADGE_CONFIGS.map((cfg) => (
              <SingleHangingBadge
                key={cfg.id}
                config={cfg}
                isActive={activeId === cfg.id}
                onSelect={() => onSelect(cfg.id)}
              />
            ))}
          </Physics>

          <Environment blur={0.6}>
            {/* NO background color — canvas is transparent so section bg shows through */}
            <Lightformer intensity={2.5} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={8} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
          </Environment>
        </Canvas>
      </Suspense>
    </div>
  );
}

export default HangingBadges3D;

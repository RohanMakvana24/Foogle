// @ts-nocheck
'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './Lanyard.css';

export interface MultiBadgeItem {
  id: string;
  frontCanvas?: HTMLCanvasElement;
  backCanvas?: HTMLCanvasElement;
  strapCanvas?: HTMLCanvasElement;
  frontImage?: string;
  backImage?: string;
  strapImage?: string;
  cardColor?: string;
  strapColor?: string;
  metal?: 'gold' | 'silver' | 'graphite';
  anchor?: number; // 0..1 along top edge (e.g. 0.22, 0.50, 0.78)
}

export interface MultiLanyardProps {
  items: MultiBadgeItem[];
  className?: string;
  style?: React.CSSProperties;
  breeze?: number;
  interactive?: boolean;
}

const CARD_SIZES = {
  portrait: [1.75, 2.45],
  landscape: [2.45, 1.75]
};
const THICKNESS = 0.018;
const BEVEL = 0.007;
const JOINTS = 4;
const NODE_WEIGHT = 1 / 0.05;
const MAX_STEP = 1 / 960;
const ITERATIONS = 2;
const SAMPLES = 72;
const FOV = 24;
const STRAP_WIDTH = 0.36;
const RING_RADIUS = 0.095;
const RING_TUBE = 0.0135;
const EYELET_RADIUS = 0.036;
const CLAMP_BODY = 0.15;
const FLIP_SPIN = 9;

const METALS = {
  silver: { color: '#d9dce2', roughness: 0.16 },
  gold: { color: '#e4b965', roughness: 0.2 },
  graphite: { color: '#4d4f55', roughness: 0.28 }
};

const BAND_COLUMNS = [0, 0.07, 0.93, 1];
const BAND_BEND = [-0.95, -0.28, 0.28, 0.95];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

const traceRoundedRect = (path: any, x: number, y: number, width: number, height: number, radius: number) => {
  const r = Math.max(0, Math.min(radius, width / 2, height / 2));
  const k = r * 0.4477;
  path.moveTo(x + r, y);
  path.lineTo(x + width - r, y);
  path.bezierCurveTo(x + width - k, y, x + width, y + k, x + width, y + r);
  path.lineTo(x + width, y + height - r);
  path.bezierCurveTo(x + width, y + height - k, x + width - k, y + height, x + width - r, y + height);
  path.lineTo(x + r, y + height);
  path.bezierCurveTo(x + k, y + height, x, y + height - k, x, y + height - r);
  path.lineTo(x, y + r);
  path.bezierCurveTo(x, y + k, x + k, y, x + r, y);
};

const cardLayout = (orientation: 'portrait' | 'landscape', cornerRadius: number) => {
  const [width, height] = CARD_SIZES[orientation] || CARD_SIZES.portrait;
  const radius = mix(0.03, Math.min(width, height) * 0.2, clamp(cornerRadius, 0, 1));
  const slot = { width: 0.34, height: 0.07, y: height / 2 - 0.13 };
  const ringY = height / 2 - 0.055;
  return { width, height, radius, slot, ringY, hangY: ringY + RING_RADIUS };
};

const buildCardGeometry = (layout: any) => {
  const { width, height, radius, slot } = layout;
  const outline = new THREE.Shape();
  traceRoundedRect(
    outline,
    -width / 2 + BEVEL,
    -height / 2 + BEVEL,
    width - BEVEL * 2,
    height - BEVEL * 2,
    Math.max(radius - BEVEL, 0.005)
  );
  const hole = new THREE.Path();
  traceRoundedRect(
    hole,
    -slot.width / 2 - BEVEL,
    slot.y - slot.height / 2 - BEVEL,
    slot.width + BEVEL * 2,
    slot.height + BEVEL * 2,
    slot.height / 2 + BEVEL
  );
  outline.holes.push(hole);
  const body = new THREE.ExtrudeGeometry(outline, {
    depth: THICKNESS,
    bevelEnabled: true,
    bevelThickness: BEVEL,
    bevelSize: BEVEL,
    bevelSegments: 5,
    curveSegments: 24
  });
  body.translate(0, 0, -THICKNESS / 2);
  const face = new THREE.ShapeGeometry(outline, 24);
  const position = face.getAttribute('position');
  const uv = face.getAttribute('uv');
  for (let i = 0; i < position.count; i++) {
    uv.setXY(i, (position.getX(i) + width / 2) / width, (position.getY(i) + height / 2) / height);
  }
  uv.needsUpdate = true;
  return { body, face };
};

const buildClampGeometry = (width: number) => {
  const shape = new THREE.Shape();
  const w = width * 1.16;
  traceRoundedRect(shape, -w / 2 + 0.014, -CLAMP_BODY / 2 + 0.014, w - 0.028, CLAMP_BODY - 0.028, 0.024);
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.02,
    bevelEnabled: true,
    bevelThickness: 0.014,
    bevelSize: 0.014,
    bevelSegments: 6,
    curveSegments: 10
  });
  geometry.translate(0, 0, -0.01);
  return geometry;
};

const buildBandGeometry = (count: number) => {
  const columns = BAND_COLUMNS.length;
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * columns * 3), 3));
  geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(count * columns * 3), 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(count * columns * 2), 2));
  const index = [];
  for (let i = 0; i < count - 1; i++) {
    for (let c = 0; c < columns - 1; c++) {
      const a = i * columns + c;
      index.push(a, a + columns, a + 1, a + 1, a + columns, a + columns + 1);
    }
  }
  geometry.setIndex(index);
  return geometry;
};

const makeCanvasTexture = (canvas: HTMLCanvasElement, anisotropy: number) => {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = Math.max(16, anisotropy);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
};

const buildEnvironment = (renderer: THREE.WebGLRenderer) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0.04, 0.04, 0.05);
  const geometry = new THREE.PlaneGeometry(1, 1);
  const materials: THREE.Material[] = [];
  const panel = (intensity: number, position: [number, number, number], scale: [number, number], rotation = 0) => {
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(intensity, intensity, intensity),
      side: THREE.DoubleSide
    });
    materials.push(material);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...position);
    mesh.scale.set(scale[0], scale[1], 1);
    mesh.lookAt(0, 0, 0);
    mesh.rotateZ(rotation);
    scene.add(mesh);
  };
  panel(3.0, [0, 4.5, 8], [9, 4]);
  panel(6.0, [-5.5, 0.5, 7], [0.9, 14]);
  panel(4.0, [5, -0.5, 8], [0.6, 14]);
  panel(3.5, [0, -1, 9], [24, 0.35], Math.PI / 3);
  panel(2.5, [1, 2.5, 9], [24, 0.2], Math.PI / 3);
  panel(1.5, [0, 6, -6], [12, 4]);
  panel(1.0, [0, -7, 1], [16, 6]);
  panel(1.2, [8, 0, -2], [4, 10]);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const target = pmrem.fromScene(scene, 0.035);
  pmrem.dispose();
  geometry.dispose();
  materials.forEach(material => material.dispose());
  return target;
};

const createSimulation = () => {
  const vectors = () => Array.from({ length: JOINTS + 1 }, () => new THREE.Vector3());
  return {
    nodes: vectors(),
    previous: vectors(),
    velocities: vectors(),
    lengths: new Float64Array(JOINTS),
    impulses: new Float64Array(JOINTS),
    rest: 1,
    anchor: new THREE.Vector3(),
    body: {
      position: new THREE.Vector3(),
      previous: new THREE.Vector3(),
      velocity: new THREE.Vector3(),
      quaternion: new THREE.Quaternion(),
      previousQuaternion: new THREE.Quaternion(),
      angular: new THREE.Vector3(),
      mass: 1,
      inverseInertia: new THREE.Vector3(1, 1, 1),
      hang: new THREE.Vector3()
    },
    grab: null,
    turn: 0,
    twist: 0,
    twistRaw: 0,
    calm: 0
  };
};

const scratch = {
  a: new THREE.Vector3(),
  b: new THREE.Vector3(),
  c: new THREE.Vector3(),
  d: new THREE.Vector3(),
  e: new THREE.Vector3(),
  f: new THREE.Vector3(),
  g: new THREE.Vector3(),
  pin: new THREE.Vector3(),
  q: new THREE.Quaternion(),
  r: new THREE.Quaternion()
};

const applyInverseInertia = (body: any, vector: THREE.Vector3, out: THREE.Vector3) => {
  scratch.r.copy(body.quaternion).invert();
  out.copy(vector).applyQuaternion(scratch.r);
  out.set(out.x * body.inverseInertia.x, out.y * body.inverseInertia.y, out.z * body.inverseInertia.z);
  return out.applyQuaternion(body.quaternion);
};

const rotateBody = (q: THREE.Quaternion, w: THREE.Vector3) => {
  const { x: qx, y: qy, z: qz, w: qw } = q;
  q.x += 0.5 * (w.x * qw + w.y * qz - w.z * qy);
  q.y += 0.5 * (w.y * qw + w.z * qx - w.x * qz);
  q.z += 0.5 * (w.z * qw + w.x * qy - w.y * qx);
  q.w += 0.5 * (-w.x * qx - w.y * qy - w.z * qz);
  q.normalize();
};

const bodyWeight = (body: any, r: THREE.Vector3, normal: THREE.Vector3) => {
  const rn = scratch.c.crossVectors(r, normal);
  return 1 / body.mass + rn.dot(applyInverseInertia(body, rn, scratch.d));
};

const pushBody = (body: any, r: THREE.Vector3, impulse: THREE.Vector3) => {
  body.position.addScaledVector(impulse, 1 / body.mass);
  rotateBody(body.quaternion, applyInverseInertia(body, scratch.e.crossVectors(r, impulse), scratch.f));
};

const solveSegment = (sim: any, i: number, h: number, physics: any) => {
  const { nodes, body } = sim;
  const a = nodes[i];
  const wa = i === 0 ? 0 : NODE_WEIGHT;
  const last = i === JOINTS - 1;
  const r = scratch.g;
  let b = nodes[i + 1];
  if (last) {
    r.copy(body.hang).applyQuaternion(body.quaternion);
    b = scratch.b.copy(body.position).add(r);
  }
  const delta = scratch.a.subVectors(b, a);
  const length = delta.length();
  const stretch = length - sim.rest;
  if (stretch <= 0 || length < 1e-9) return;
  const normal = delta.divideScalar(length);
  const wb = last ? bodyWeight(body, r, normal) : NODE_WEIGHT;
  const rate = (length - sim.lengths[i]) / h;
  const tension =
    physics.hold * Math.tanh((physics.stiffness * stretch) / physics.hold) +
    physics.spring * stretch +
    physics.bandDamping * Math.max(0, rate);
  const room = tension * h * h - sim.impulses[i];
  if (room <= 0) return;
  const lambda = Math.min(stretch / (wa + wb), room);
  sim.impulses[i] += lambda;
  if (wa) a.addScaledVector(normal, lambda * wa);
  if (last) pushBody(body, r, normal.multiplyScalar(-lambda));
  else b.addScaledVector(normal, -lambda * wb);
};

const solvePin = (body: any, grab: any, target: THREE.Vector3) => {
  const r = scratch.g.copy(grab.local).applyQuaternion(body.quaternion);
  const delta = scratch.a.copy(target).sub(body.position).sub(r);
  const distance = delta.length();
  if (distance < 1e-9) return;
  const normal = delta.divideScalar(distance);
  const lambda = distance / bodyWeight(body, r, normal);
  pushBody(body, r, normal.multiplyScalar(lambda));
};

const placeHanging = (sim: any, layout: any, intro: boolean) => {
  const { nodes, previous, velocities, body, anchor } = sim;
  nodes[0].copy(anchor);
  for (let i = 1; i <= JOINTS; i++) {
    nodes[i].copy(nodes[i - 1]);
    if (intro) nodes[i].x += sim.rest;
    else nodes[i].y -= sim.rest;
  }
  body.quaternion.identity();
  if (intro) body.quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2);
  body.hang.set(0, layout.hangY, 0);
  const offset = scratch.a.copy(body.hang).applyQuaternion(body.quaternion);
  body.position.copy(nodes[JOINTS]).sub(offset);
  body.previous.copy(body.position);
  body.previousQuaternion.copy(body.quaternion);
  body.velocity.set(0, 0, 0);
  body.angular.set(0, 0, 0);
  for (let i = 0; i <= JOINTS; i++) {
    previous[i].copy(nodes[i]);
    velocities[i].set(0, 0, 0);
  }
  sim.lengths.fill(sim.rest);
  sim.turn = 0;
  sim.twist = 0;
  sim.twistRaw = 0;
  sim.calm = 0;
};

const configureSimulation = (sim: any, layout: any, length: number) => {
  sim.rest = length / JOINTS;
  const { width, height } = layout;
  const body = sim.body;
  const t = THICKNESS + BEVEL * 2;
  body.mass = 1;
  body.inverseInertia.set(
    12 / (height * height + t * t),
    12 / (width * width + t * t),
    12 / (width * width + height * height)
  );
  body.hang.set(0, layout.hangY, 0);
};

const stepSimulation = (sim: any, dt: number, physics: any, time: number) => {
  const steps = Math.max(1, Math.ceil(dt / MAX_STEP - 1e-6));
  const h = dt / steps;
  const { nodes, previous, velocities, body } = sim;
  const windX = physics.breeze * (Math.sin(time * 0.53) * 0.7 + Math.sin(time * 1.31 + 1.7) * 0.3) * 3;
  const windZ = physics.breeze * Math.sin(time * 0.37 + 0.6) * 2;
  const grab = sim.grab;
  const pin = scratch.pin;
  const nodeDrag = Math.exp(-physics.nodeDrag * h);
  const linearDrag = Math.exp(-physics.linearDrag * h);
  const angularDrag = Math.exp(-physics.angularDrag * h);

  for (let s = 0; s < steps; s++) {
    for (let i = 1; i < JOINTS; i++) {
      const v = velocities[i];
      v.y -= physics.gravity * h;
      v.x += windX * h;
      v.z += windZ * h;
      previous[i].copy(nodes[i]);
      nodes[i].addScaledVector(v, h);
    }

    body.previous.copy(body.position);
    body.previousQuaternion.copy(body.quaternion);
    const q = body.quaternion;
    if (grab) {
      const turn = scratch.q.copy(grab.rotation).multiply(scratch.r.copy(q).invert());
      if (turn.w < 0) turn.set(-turn.x, -turn.y, -turn.z, -turn.w);
      const torque = scratch.a.set(turn.x, turn.y, turn.z).multiplyScalar(2 * physics.grip);
      torque.addScaledVector(body.angular, -physics.gripDamping);
      body.angular.addScaledVector(applyInverseInertia(body, torque, scratch.b), h);
    }
    const up = scratch.a.set(0, 1, 0).applyQuaternion(q);
    const front = scratch.b.set(-up.x * up.z, -up.y * up.z, 1 - up.z * up.z);
    if (front.lengthSq() > 1e-3) {
      const facing = scratch.d.set(0, 0, 1).applyQuaternion(q);
      const raw = Math.atan2(scratch.e.crossVectors(front, facing).dot(up), front.dot(facing));
      let turned = raw - sim.twistRaw;
      if (turned > Math.PI) turned -= Math.PI * 2;
      else if (turned < -Math.PI) turned += Math.PI * 2;
      sim.twist += turned;
      sim.twistRaw = raw;
    }
    if (!grab) {
      const spin = body.angular.dot(up);
      body.angular.addScaledVector(up, (physics.twist * (sim.turn - sim.twist) - physics.twistDamping * spin) * h);
    }
    body.velocity.y -= physics.gravity * h;
    body.velocity.x += windX * 0.35 * h;
    body.velocity.z += windZ * 0.35 * h;
    body.position.addScaledVector(body.velocity, h);
    rotateBody(body.quaternion, scratch.f.copy(body.angular).multiplyScalar(h));

    sim.impulses.fill(0);
    if (grab) pin.lerpVectors(grab.from, grab.target, (s + 1) / steps);
    for (let iteration = 0; iteration < ITERATIONS; iteration++) {
      for (let i = 0; i < JOINTS; i++) solveSegment(sim, i, h, physics);
      if (grab) solvePin(body, grab, pin);
    }

    for (let i = 1; i < JOINTS; i++) {
      const v = velocities[i].subVectors(nodes[i], previous[i]).divideScalar(h).multiplyScalar(nodeDrag);
      v.multiplyScalar(1 / (1 + physics.nodeAir * v.length() * h));
    }
    body.velocity.subVectors(body.position, body.previous).divideScalar(h);
    const dq = scratch.q.copy(body.previousQuaternion).invert().premultiply(body.quaternion);
    body.angular.set(dq.x, dq.y, dq.z).multiplyScalar((2 / h) * (dq.w < 0 ? -1 : 1));

    const normal = scratch.a.set(0, 0, 1).applyQuaternion(body.quaternion);
    const across = body.velocity.dot(normal);
    const along = scratch.b.copy(body.velocity).addScaledVector(normal, -across);
    along.multiplyScalar(1 / (1 + physics.air * along.length() * h));
    body.velocity
      .copy(along)
      .addScaledVector(normal, across / (1 + physics.broadside * Math.abs(across) * h))
      .multiplyScalar(linearDrag);
    body.angular.multiplyScalar(angularDrag / (1 + physics.spinAir * body.angular.length() * h));
    if (body.velocity.lengthSq() > 3600) body.velocity.setLength(60);
    if (body.angular.lengthSq() > 1600) body.angular.setLength(40);

    nodes[JOINTS].copy(body.hang).applyQuaternion(body.quaternion).add(body.position);
    for (let i = 0; i < JOINTS; i++) sim.lengths[i] = nodes[i].distanceTo(nodes[i + 1]);
  }

  if (grab) grab.from.copy(grab.target);

  let energy = body.velocity.lengthSq() + body.angular.lengthSq() * 0.3;
  for (let i = 1; i < JOINTS; i++) energy += velocities[i].lengthSq() * 0.05;
  sim.calm = energy < 2e-4 ? sim.calm + dt : 0;
};

export const MultiLanyard: React.FC<MultiLanyardProps> = ({
  items = [],
  className = '',
  style,
  breeze = 0.35,
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef(items);
  itemsRef.current = items;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      return undefined;
    }
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1.1;

    const canvas = renderer.domElement;
    canvas.className = 'lanyard-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.appendChild(canvas);

    const anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    const scene = new THREE.Scene();

    // Critical: Add PMREM Environment reflection map
    const environment = buildEnvironment(renderer);
    scene.environment = environment.texture;

    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 200);

    // Bright Studio Lighting
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(-2.5, 4, 6);

    const fillLight = new THREE.DirectionalLight(0xffffff, 1.2);
    fillLight.position.set(3, -1, 4);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(keyLight, fillLight, ambientLight);

    const layout = cardLayout('portrait', 0.28);
    const cardGeom = buildCardGeometry(layout);
    const clampGeom = buildClampGeometry(STRAP_WIDTH * 0.65);
    const ringGeom = new THREE.TorusGeometry(RING_RADIUS, RING_TUBE, 18, 72);
    const eyeletGeom = new THREE.TorusGeometry(EYELET_RADIUS, 0.0105, 14, 40);

    // Per-item runtime structures with DIRECT CANVAS TEXTURES
    const badgeObjects = itemsRef.current.map((item, idx) => {
      const sim = createSimulation();

      // Use canvas directly or fallback
      const frontC = item.frontCanvas || document.createElement('canvas');
      const backC = item.backCanvas || document.createElement('canvas');
      const strapC = item.strapCanvas || document.createElement('canvas');

      const frontTexture = makeCanvasTexture(frontC, anisotropy);
      const backTexture = makeCanvasTexture(backC, anisotropy);
      const strapTexture = makeCanvasTexture(strapC, anisotropy);
      strapTexture.wrapS = THREE.ClampToEdgeWrapping;
      strapTexture.wrapT = THREE.RepeatWrapping;

      // Ultra-clean crystal glossy material with zero grain
      const frontMaterial = new THREE.MeshStandardMaterial({
        map: frontTexture,
        roughness: 0.2,
        metalness: 0.05,
      });

      const backMaterial = new THREE.MeshStandardMaterial({
        map: backTexture,
        roughness: 0.2,
        metalness: 0.05,
      });

      const edgeMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(item.cardColor || '#0b141f'),
        roughness: 0.3,
        metalness: 0.2,
      });

      const metalLook = METALS[item.metal || 'gold'];
      const metalMaterial = new THREE.MeshStandardMaterial({
        color: metalLook.color,
        metalness: 0.95,
        roughness: metalLook.roughness
      });

      const bandMaterial = new THREE.MeshStandardMaterial({
        map: strapTexture,
        roughness: 0.6,
        side: THREE.DoubleSide
      });

      // Card 3D group
      const cardGroup = new THREE.Group();
      const bodyMesh = new THREE.Mesh(cardGeom.body, edgeMaterial);
      const frontMesh = new THREE.Mesh(cardGeom.face, frontMaterial);
      const backMesh = new THREE.Mesh(cardGeom.face.clone(), backMaterial);
      frontMesh.position.z = THICKNESS / 2 + BEVEL + 0.0006;
      backMesh.rotation.y = Math.PI;
      backMesh.position.z = -(THICKNESS / 2 + BEVEL + 0.0006);

      const ring = new THREE.Mesh(ringGeom, metalMaterial);
      ring.position.set(0, layout.ringY, 0);
      ring.rotation.y = Math.PI / 2 - 0.7;

      cardGroup.add(bodyMesh, frontMesh, backMesh, ring);
      scene.add(cardGroup);

      // Strap Band
      const bandGeometry = buildBandGeometry(SAMPLES);
      const band = new THREE.Mesh(bandGeometry, bandMaterial);
      band.frustumCulled = false;
      scene.add(band);

      // Clamp Group
      const clampGroup = new THREE.Group();
      const clampMesh = new THREE.Mesh(clampGeom, metalMaterial);
      clampMesh.position.y = EYELET_RADIUS + CLAMP_BODY / 2 - 0.004;
      const eyelet = new THREE.Mesh(eyeletGeom, metalMaterial);
      clampGroup.add(clampMesh, eyelet);
      scene.add(clampGroup);

      const curveControls: THREE.Vector3[] = [];
      const curve = new THREE.CatmullRomCurve3(curveControls, false, 'centripetal');
      const mouth = new THREE.Vector3();
      const tuck = new THREE.Vector3();
      const points = Array.from({ length: SAMPLES }, () => new THREE.Vector3());
      const sides = Array.from({ length: SAMPLES }, () => new THREE.Vector3());
      const bends = BAND_BEND.map(angle => [Math.cos(angle), Math.sin(angle)]);
      const work = {
        tangent: new THREE.Vector3(),
        toCamera: new THREE.Vector3(),
        basis: new THREE.Matrix4(),
        up: new THREE.Vector3(),
        across: new THREE.Vector3(),
        facing: new THREE.Vector3(),
        end: new THREE.Vector3()
      };

      return {
        item,
        idx,
        sim,
        frontTexture,
        backTexture,
        strapTexture,
        cardGroup,
        bodyMesh,
        frontMesh,
        backMesh,
        band,
        bandGeometry,
        clampGroup,
        curveControls,
        curve,
        mouth,
        tuck,
        points,
        sides,
        bends,
        work,
        tileRatio: 2,
        placed: false
      };
    });

    const view = { width: 1, height: 1 };
    let raf = 0;
    let last = performance.now();
    let time = 0;
    let visible = true;
    let alive = true;
    let activeGrab: { badgeObj: any; hit: any } | null = null;
    let press: any = null;

    const frameView = () => {
      const aspect = view.width / view.height;
      const viewHeight = layout.height / 0.52;
      const viewWidth = viewHeight * aspect;

      camera.aspect = aspect;
      camera.position.set(0, 0, viewHeight / 2 / Math.tan((FOV * Math.PI) / 360));
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
      camera.updateMatrixWorld();

      const numItems = badgeObjects.length;
      badgeObjects.forEach((obj, idx) => {
        let anchorRatio = 0.5;
        if (numItems === 3) {
          const ratios = [0.22, 0.50, 0.78];
          anchorRatio = ratios[idx];
        } else if (numItems === 2) {
          const ratios = [0.35, 0.65];
          anchorRatio = ratios[idx];
        }

        const anchorX = (anchorRatio - 0.5) * viewWidth;
        const anchorY = viewHeight / 2 + 0.2;
        const cardTop = viewHeight / 2 - viewHeight * 0.32;
        const hangTop = cardTop + (layout.hangY - layout.height / 2);

        obj.sim.anchor.set(anchorX, anchorY, 0);
        configureSimulation(obj.sim, layout, anchorY - hangTop);
        obj.sim.nodes[0].copy(obj.sim.anchor);
        obj.sim.previous[0].copy(obj.sim.anchor);

        if (!obj.placed) {
          placeHanging(obj.sim, layout, false);
          obj.placed = true;
        }
      });
    };

    const updateBand = (obj: any) => {
      const sim = obj.sim;
      const hang = sim.nodes[JOINTS];
      const reach = EYELET_RADIUS + CLAMP_BODY + 0.05;
      let guide = JOINTS - 1;
      while (guide > 0 && sim.nodes[guide].distanceTo(hang) < reach * 1.1) guide--;
      const axis = obj.work.up.subVectors(sim.nodes[guide], hang);
      if (axis.lengthSq() < 1e-8) axis.set(0, 1, 0).applyQuaternion(sim.body.quaternion);
      axis.normalize();
      obj.mouth.copy(hang).addScaledVector(axis, reach);
      obj.tuck.copy(hang).addScaledVector(axis, EYELET_RADIUS + CLAMP_BODY * 0.35);
      obj.curveControls.length = 0;
      for (let i = 0; i <= guide; i++) obj.curveControls.push(sim.nodes[i]);
      obj.curveControls.push(obj.mouth, obj.tuck);
      obj.curve.updateArcLengths();
      for (let i = 0; i < SAMPLES; i++) obj.curve.getPointAt(i / (SAMPLES - 1), obj.points[i]);
      const length = obj.curve.getLength();
      const held = 1 - obj.mouth.distanceTo(obj.tuck) / Math.max(length, 0.001);
      const position = obj.bandGeometry.getAttribute('position');
      const normal = obj.bandGeometry.getAttribute('normal');
      const uv = obj.bandGeometry.getAttribute('uv');
      const columns = BAND_COLUMNS.length;
      const strapScale = STRAP_WIDTH * 0.65;
      const restLength = sim.rest * JOINTS;
      const repeats = restLength / (strapScale * obj.tileRatio);
      const width = strapScale / Math.pow(Math.max(1, length / Math.max(restLength, 0.001)), 0.35);
      const { tangent, toCamera, across, facing } = obj.work;

      for (let i = 0; i < SAMPLES; i++) {
        tangent.subVectors(obj.points[Math.min(SAMPLES - 1, i + 1)], obj.points[Math.max(0, i - 1)]);
        if (tangent.lengthSq() < 1e-12) tangent.set(0, -1, 0);
        tangent.normalize();
        toCamera.subVectors(camera.position, obj.points[i]).normalize();
        const side = obj.sides[i].crossVectors(toCamera, tangent);
        if (side.lengthSq() < 1e-10) side.copy(i > 0 ? obj.sides[i - 1] : scratch.a.set(1, 0, 0));
        side.normalize();
        if (i > 0 && side.dot(obj.sides[i - 1]) < 0) side.negate();
        const angle = -sim.twist * Math.pow(Math.min(1, i / (SAMPLES - 1) / held), 1.3);
        facing.crossVectors(tangent, side);
        across.copy(side).multiplyScalar(Math.cos(angle)).addScaledVector(facing, Math.sin(angle));
        facing.crossVectors(tangent, across);
        const p = obj.points[i];
        const v = (1 - i / (SAMPLES - 1)) * repeats;
        for (let c = 0; c < columns; c++) {
          const k = i * columns + c;
          const offset = (BAND_COLUMNS[c] - 0.5) * width;
          const [bendCos, bendSin] = obj.bends[c];
          position.setXYZ(k, p.x + across.x * offset, p.y + across.y * offset, p.z + across.z * offset);
          normal.setXYZ(
            k,
            facing.x * bendCos + across.x * bendSin,
            facing.y * bendCos + across.y * bendSin,
            facing.z * bendCos + across.z * bendSin
          );
          uv.setXY(k, BAND_COLUMNS[c], v);
        }
      }
      obj.work.end.copy(across);
      position.needsUpdate = true;
      normal.needsUpdate = true;
      uv.needsUpdate = true;

      across.copy(obj.work.end).addScaledVector(axis, -obj.work.end.dot(axis)).normalize();
      facing.crossVectors(across, axis).normalize();
      obj.work.basis.makeBasis(across, axis, facing);
      obj.clampGroup.quaternion.setFromRotationMatrix(obj.work.basis);
      obj.clampGroup.position.copy(hang);
    };

    const render = () => {
      badgeObjects.forEach(obj => {
        obj.cardGroup.position.copy(obj.sim.body.position);
        obj.cardGroup.quaternion.copy(obj.sim.body.quaternion);
        updateBand(obj);
      });
      renderer.render(scene, camera);
    };

    const physics = () => {
      const gravity = 44;
      const weight = 44;
      return {
        gravity,
        hold: weight * 3.5,
        stiffness: weight * 10 * JOINTS,
        spring: weight * 0.25 * JOINTS,
        bandDamping: weight * 0.18 * JOINTS,
        linearDrag: 0.25 * Math.pow(16, 0.48),
        angularDrag: 0.5 * Math.pow(12, 0.48),
        air: 0.15,
        broadside: 0.5,
        spinAir: 0.03,
        nodeDrag: 2,
        nodeAir: 0.2,
        twist: 30,
        twistDamping: 3,
        grip: 40,
        gripDamping: 6,
        breeze: breeze
      };
    };

    const tick = (now: number) => {
      raf = 0;
      if (!alive) return;
      const dt = Math.min(1 / 30, Math.max(1 / 240, (now - last) / 1000));
      last = now;
      time += dt;
      const current = physics();

      badgeObjects.forEach(obj => {
        stepSimulation(obj.sim, dt, current, time);
        const body = obj.sim.body;
        if (!Number.isFinite(body.position.x + body.position.y + body.position.z + body.quaternion.w)) {
          obj.sim.grab = null;
          placeHanging(obj.sim, layout, false);
        }
      });

      render();
      const resting = badgeObjects.every(obj => obj.sim.calm > 1.2 && !obj.sim.grab) && current.breeze === 0;
      if (visible && !resting) raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (raf || !visible || !alive) return;
      badgeObjects.forEach(obj => { obj.sim.calm = 0; });
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const toPointer = (event: any) => {
      const rect = canvas.getBoundingClientRect();
      pointer.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1
      );
      raycaster.setFromCamera(pointer, camera);
    };

    const pickAnyCard = () => {
      const allMeshes: { mesh: THREE.Mesh; obj: any }[] = [];
      badgeObjects.forEach(obj => {
        obj.cardGroup.updateMatrixWorld();
        allMeshes.push(
          { mesh: obj.bodyMesh, obj },
          { mesh: obj.frontMesh, obj },
          { mesh: obj.backMesh, obj }
        );
      });
      const hits = raycaster.intersectObjects(allMeshes.map(m => m.mesh), false);
      if (hits.length > 0) {
        const found = allMeshes.find(m => m.mesh === hits[0].object);
        return { hit: hits[0], badgeObj: found?.obj };
      }
      return null;
    };

    const flipCard = (obj: any, point: THREE.Vector3) => {
      const body = obj.sim.body;
      const up = scratch.a.set(0, 1, 0).applyQuaternion(body.quaternion);
      let direction = obj.sim.turn > 0 ? -1 : 1;
      if (obj.sim.turn === 0) {
        const away = scratch.c.subVectors(point, camera.position).normalize();
        direction = scratch.b.subVectors(point, body.position).cross(away).dot(up) < 0 ? -1 : 1;
      }
      obj.sim.turn = obj.sim.turn === 0 ? Math.PI * direction : 0;
      body.angular.addScaledVector(up, FLIP_SPIN * direction);
    };

    const onPointerDown = (event: any) => {
      if (!interactive || event.button > 0) return;
      toPointer(event);
      const picked = pickAnyCard();
      if (!picked) return;

      const { hit, badgeObj } = picked;
      badgeObj.sim.grab = {
        local: hit.point.clone().sub(badgeObj.sim.body.position).applyQuaternion(badgeObj.sim.body.quaternion.clone().invert()),
        rotation: badgeObj.sim.body.quaternion.clone(),
        reach: hit.distance,
        from: hit.point.clone(),
        target: hit.point.clone()
      };

      activeGrab = { badgeObj, hit };
      press = { x: event.clientX, y: event.clientY, time: performance.now(), point: hit.point.clone(), badgeObj };
      canvas.setPointerCapture?.(event.pointerId);
      canvas.style.cursor = 'grabbing';
      event.preventDefault();
      start();
    };

    const onPointerMove = (event: any) => {
      if (!interactive) return;
      toPointer(event);
      if (activeGrab) {
        if (press && Math.hypot(event.clientX - press.x, event.clientY - press.y) > 6) press = null;
        raycaster.ray.at(activeGrab.badgeObj.sim.grab.reach, activeGrab.badgeObj.sim.grab.target);
        start();
        return;
      }
      if (event.pointerType === 'touch') return;
      const hover = !!pickAnyCard();
      canvas.style.cursor = hover ? 'grab' : 'default';
    };

    const onPointerUp = (event: any) => {
      if (!activeGrab) return;
      activeGrab.badgeObj.sim.grab = null;
      if (press && event.type === 'pointerup' && performance.now() - press.time < 450) {
        flipCard(press.badgeObj, press.point);
      }
      activeGrab = null;
      press = null;
      canvas.releasePointerCapture?.(event.pointerId);
      canvas.style.cursor = 'default';
      start();
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);

    const resize = () => {
      view.width = Math.max(1, container.clientWidth);
      view.height = Math.max(1, container.clientHeight);
      // High pixel ratio for razor-sharp textures and typography on high-DPI screens
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2.5));
      renderer.setSize(view.width, view.height, false);
      frameView();
      render();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    resize();
    start();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
      environment.dispose();
      renderer.dispose();
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${className}`.trim()}
      style={{ overflow: 'visible', ...style }}
    />
  );
};

export default MultiLanyard;

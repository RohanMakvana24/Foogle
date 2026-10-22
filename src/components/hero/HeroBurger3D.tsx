import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

interface BurgerMeshProps {
  onLoaded?: () => void;
}

function BurgerMesh({ onLoaded }: BurgerMeshProps) {
  const [model, setModel] = useState<THREE.Group | null>(null);
  const [modelSize, setModelSize] = useState<THREE.Vector3 | null>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();

    // Load textures
    const breadTopColor = textureLoader.load('/textures/burger/Bread(top)_Base_color.png');
    breadTopColor.colorSpace = THREE.SRGBColorSpace;
    const breadTopNormal = textureLoader.load('/textures/burger/Bread(top)_Normal_OpenGL.png');
    const breadTopRoughness = textureLoader.load('/textures/burger/Bread(top)_Roughness.png');

    const breadBottomColor = textureLoader.load('/textures/burger/Bread(bottom)_Base_color.png');
    breadBottomColor.colorSpace = THREE.SRGBColorSpace;
    const breadBottomNormal = textureLoader.load('/textures/burger/Bread(bottom)_Normal_OpenGL.png');
    const breadBottomRoughness = textureLoader.load('/textures/burger/Bread(bottom)_Roughness.png');

    const meatColor = textureLoader.load('/textures/burger/Meat_Base_color.png');
    meatColor.colorSpace = THREE.SRGBColorSpace;
    const meatNormal = textureLoader.load('/textures/burger/Meat_Normal_OpenGL.png');
    const meatRoughness = textureLoader.load('/textures/burger/Meat_Roughness.png');

    const tomatoColor = textureLoader.load('/textures/burger/tomato_slice.png');
    tomatoColor.colorSpace = THREE.SRGBColorSpace;
    const tomatoNormal = textureLoader.load('/textures/burger/tomato_slice_normal.png');

    const saladColor = textureLoader.load('/textures/burger/salad.png');
    saladColor.colorSpace = THREE.SRGBColorSpace;
    const saladNormal = textureLoader.load('/textures/burger/salad_normal.png');

    // Premium realistic food materials
    const materials: Record<string, THREE.Material> = {
      breadTop: new THREE.MeshStandardMaterial({
        map: breadTopColor,
        normalMap: breadTopNormal,
        roughnessMap: breadTopRoughness,
        roughness: 0.58,
        metalness: 0.04,
      }),
      breadBottom: new THREE.MeshStandardMaterial({
        map: breadBottomColor,
        normalMap: breadBottomNormal,
        roughnessMap: breadBottomRoughness,
        roughness: 0.58,
        metalness: 0.04,
      }),
      meat: new THREE.MeshStandardMaterial({
        map: meatColor,
        normalMap: meatNormal,
        roughnessMap: meatRoughness,
        roughness: 0.75,
        metalness: 0.02,
      }),
      cheese: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#E8940C'),
        roughness: 0.45,
        metalness: 0.0,
      }),
      tomato: new THREE.MeshStandardMaterial({
        map: tomatoColor,
        normalMap: tomatoNormal,
        roughness: 0.2,
        metalness: 0.02,
        transparent: true,
      }),
      salad: new THREE.MeshStandardMaterial({
        map: saladColor,
        normalMap: saladNormal,
        roughness: 0.38,
        metalness: 0.02,
        side: THREE.DoubleSide,
        transparent: true,
      }),
      sesame: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#F7EADA'),
        roughness: 0.5,
        metalness: 0.05,
      }),
    };

    const loader = new OBJLoader();
    loader.load('/models/burger.obj', (obj) => {
      obj.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          const name = (mesh.name || '').toLowerCase();

          if (name.includes('top') && (name.includes('bread') || name.includes('bun'))) {
            mesh.material = materials.breadTop;
          } else if (name.includes('bottom') || name.includes('bread(bottom)')) {
            mesh.material = materials.breadBottom;
          } else if (name.includes('meat')) {
            mesh.material = materials.meat;
          } else if (name.includes('cheese')) {
            mesh.material = materials.cheese;
          } else if (name.includes('tomato')) {
            mesh.material = materials.tomato;
          } else if (name.includes('salad')) {
            mesh.material = materials.salad;
          } else if (name.includes('sesame')) {
            mesh.material = materials.sesame;
          } else {
            mesh.material = materials.breadTop;
          }
        }
      });

      const box = new THREE.Box3().setFromObject(obj);
      const center = new THREE.Vector3();
      box.getCenter(center);
      const size = new THREE.Vector3();
      box.getSize(size);

      obj.position.x = -center.x;
      obj.position.y = -center.y;
      obj.position.z = -center.z;

      const wrapper = new THREE.Group();
      wrapper.add(obj);
      setModel(wrapper);
      setModelSize(size.clone());
      if (onLoaded) onLoaded();
    });
  }, [onLoaded]);

  // Constant cinematic idle rotation
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.32;
    }
  });

  if (!model || !modelSize) return null;

  // Fit the burger inside the stage on every screen size. The model is much
  // wider/deeper than it is tall, so we fit its rotating footprint to the
  // viewport width and keep a little breathing room around it.
  const footprint = Math.max(modelSize.x, modelSize.z) || 1;
  const fitScale = Math.min(
    (viewport.width * 0.68) / footprint,
    (viewport.height * 0.58) / (modelSize.y || 1)
  );

  return (
    <group ref={groupRef} rotation={[0.02, 0.45, 0]}>
      <group scale={fitScale}>
        <primitive object={model} />
      </group>
    </group>
  );
}

interface HeroBurger3DProps {
  onLoaded?: () => void;
}

export const HeroBurger3D: React.FC<HeroBurger3DProps> = ({ onLoaded }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoaded = () => {
    setIsLoaded(true);
    if (onLoaded) onLoaded();
  };

  return (
    <div className="relative w-full h-[520px] sm:h-[580px] lg:h-[640px] flex items-center justify-center select-none overflow-visible">
      {/* Loading state indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-amber-400 z-10">
          <div className="w-10 h-10 border-3 border-amber-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold tracking-widest uppercase text-amber-200">
            Loading 3D Burger...
          </span>
        </div>
      )}

      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 0, 3.8], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        className={`w-full h-full cursor-grab active:cursor-grabbing transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <ambientLight intensity={1.3} />
        <directionalLight
          position={[5, 6, 5]}
          intensity={2.8}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-4, 2, -2]} intensity={1.4} color="#FF9F80" />
        <directionalLight position={[0, -2, 3]} intensity={0.9} color="#FFE6A7" />
        <pointLight position={[0, 3, 2]} intensity={2.0} color="#FFF8E7" />

        <Float speed={1.8} rotationIntensity={0.12} floatIntensity={0.2}>
          <Suspense fallback={null}>
            <BurgerMesh onLoaded={handleLoaded} />
          </Suspense>
        </Float>

        <ContactShadows
          position={[0, -0.68, 0]}
          opacity={0.45}
          scale={4}
          blur={2.6}
          far={1.4}
          color="#000000"
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 3.4}
        />
      </Canvas>
    </div>
  );
};

export default HeroBurger3D;

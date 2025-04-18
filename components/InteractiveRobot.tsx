'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three'

// The robot model component using GLB file
function RobotModel({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const group = useRef<THREE.Group>(null)
  // Load the GLB model
  const { scene } = useGLTF('/models/cute-robo.glb')
  
  // Animation loop
  useFrame(({ clock }) => {
    if (!group.current) return
    
    const time = clock.getElapsedTime()
    
    // Calculate angle based on mouse position (normalized from -1 to 1)
    const targetX = (mousePosition.x * 2) - 1
    const targetY = -((mousePosition.y * 2) - 1) // Y is inverted in 3D space
    
    // Smoothly rotate the robot to look at the mouse
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetX * 0.5, // Limit rotation to make it subtle
      0.1
    )
    
    // Add a slight tilt based on Y mouse position
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetY * 0.2, // Limit tilt
      0.1
    )

    // Add overall subtle floating animation
    group.current.position.y = Math.sin(time * 0.8) * 0.1
  });

  // Apply bluish-violet tint to the model
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          // Apply bluish-violet tint to all materials
          if (child.material.color) {
            child.material.color.set('#00FF00'); // Light green color
          }
        }
      });
    }
  }, [scene]);

  return (
    <group ref={group} position={[0, -0.5, 0]} scale={1.5}>
      <primitive object={scene} />
    </group>
  )
}

export default function InteractiveRobot() {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })
  
  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="w-[400px] h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={1.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.0} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <RobotModel mousePosition={mousePosition} />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}

// Pre-load the model to avoid flickering
useGLTF.preload('/models/cute-robo.glb')

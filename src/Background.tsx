import React, { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

import backgroundFrag from './shaders/background.frag'
import vertexShader from './shaders/default.vert'

const ShaderMaterial = () => {
  const material = useRef<THREE.ShaderMaterial>(null!)
  useFrame(({ clock }) => {
    if (material.current) {
      material.current.uniforms.u_time.value = clock.getElapsedTime()
    }
  })

  return (
    <shaderMaterial
      ref={material}
      uniforms={{
        u_time: { value: 0.0 },
        u_resolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
      }}
      vertexShader={vertexShader}
      fragmentShader={backgroundFrag}
    />
  )
}

const FullscreenPlane = () => {
  const { size } = useThree()

  return (
    <mesh scale={[size.width, size.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <ShaderMaterial />
    </mesh>
  )
}

export const BackgroundCanvas: React.FC = () => {
  const updateCamera = (
    camera: THREE.OrthographicCamera,
    size: { width: number; height: number }
  ) => {
    camera.left = -size.width / 2
    camera.right = size.width / 2
    camera.top = size.height / 2
    camera.bottom = -size.height / 2
    camera.updateProjectionMatrix()
  }

  return (
    <Canvas
      orthographic
      camera={{
        near: -1000,
        far: 1000,
        position: [0, 0, 1],
        zoom: 1,
      }}
      onCreated={({ gl, camera }) => {
        const handleResize = () => {
          const size = {
            width: window.innerWidth,
            height: window.innerHeight,
          }
          updateCamera(camera as THREE.OrthographicCamera, size)
          gl.setSize(size.width, size.height)
        }

        window.addEventListener('resize', handleResize)
        handleResize()

        return () => {
          window.removeEventListener('resize', handleResize)
        }
      }}
    >
      <FullscreenPlane />
    </Canvas>
  )
}

import React, { useMemo, useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ShaderMaterial, Vector2, OrthographicCamera } from 'three'
import audioWorkletScriptURL from './audioWorkletScript.js?url'
console.log(audioWorkletScriptURL)

import backgroundFrag from './shaders/background.frag'
import vertexShader from './shaders/default.vert'

const FullscreenPlane = () => {
  const { size } = useThree()

  const shaderMaterial = useMemo(() => {
    return new ShaderMaterial({
      uniforms: {
        u_time: { value: 0.0 },
        u_resolution: {
          value: new Vector2(window.innerWidth, window.innerHeight),
        },
        intensity: { value: 0.0 },
      },
      vertexShader,
      fragmentShader: backgroundFrag,
    })
  }, [])

  useFrame(({ clock }) => {
    if (shaderMaterial) {
      shaderMaterial.uniforms.u_time.value = clock.getElapsedTime()
    }
  })

  return (
    <mesh scale={[size.width, size.height, 1]} material={shaderMaterial}>
      <planeGeometry args={[1, 1]} />
    </mesh>
  )
}

export const BackgroundCanvas: React.FC<{ soundOn: boolean }> = ({
  soundOn,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null!)

  useEffect(() => {
    if (soundOn) audioRef.current.play()
    else audioRef.current.pause()
  }, [soundOn])

  const updateCamera = (
    camera: OrthographicCamera,
    size: { width: number; height: number }
  ) => {
    camera.left = -size.width / 2
    camera.right = size.width / 2
    camera.top = size.height / 2
    camera.bottom = -size.height / 2
    camera.updateProjectionMatrix()
  }

  return (
    <>
      <audio src="ladybug.m4a" ref={audioRef} loop />
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
            updateCamera(camera as OrthographicCamera, size)
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
    </>
  )
}

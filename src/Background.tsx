import React, { useMemo, useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ShaderMaterial, Vector2, OrthographicCamera } from 'three'
import audioWorkletScriptURL from './audioWorkletScript.js?url'

import backgroundFrag from './shaders/background.frag'
import vertexShader from './shaders/default.vert'

const FullscreenPlane = ({
  intensityRef,
}: {
  intensityRef: React.MutableRefObject<number>
}) => {
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
      shaderMaterial.uniforms.intensity.value = intensityRef.current
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
  const audioContextRef = useRef<AudioContext>(null!)
  const intensityRef = useRef(0)

  useEffect(() => {
    if (soundOn) {
      audioContextRef.current.resume()
      audioRef.current.play()
    } else audioRef.current.pause()
  }, [soundOn])

  useEffect(() => {
    audioContextRef.current = new window.AudioContext()
    const audioElement = audioRef.current
    const clipLevel = 0.98 // Adjust this as needed
    let node: AudioWorkletNode

    audioContextRef.current.audioWorklet
      .addModule(audioWorkletScriptURL)
      .then(() => {
        const mediaElementSource =
          audioContextRef.current.createMediaElementSource(audioElement)
        const gainNode = audioContextRef.current.createGain()

        node = new AudioWorkletNode(audioContextRef.current, 'audio-monitor', {
          parameterData: {
            clipLevel: clipLevel, // Level at which audio is considered clipped
            averaging: 0.9, // Averaging factor for smoothing volume measurements
            clipLag: 750, // Duration to hold the clipping indicator
          },
        })

        node.port.onmessage = event => {
          const [l, r] = event.data.volume
          if (l && r) {
            const value = (l.value + r.value) / 2
            intensityRef.current = value
          }
        }

        // Split the connection
        mediaElementSource.connect(gainNode)
        gainNode.connect(audioContextRef.current.destination) // Ensure audio is audible
        gainNode.connect(node) // Connect to audio worklet node

        node.connect(audioContextRef.current.destination) // Connect worklet node to the destination for further processing if needed
      })
      .catch(console.error)

    return () => {
      if (node) {
        node.disconnect()
        node.port.close()
      }
      audioContextRef.current.close()
    }
  }, [])

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
        <FullscreenPlane intensityRef={intensityRef} />
      </Canvas>
    </>
  )
}

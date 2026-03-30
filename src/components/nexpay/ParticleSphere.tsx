'use client'

import { useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'

interface ParticleSphereProps {
  particleCount?: number
}

export function ParticleSphere({ particleCount = 50000 }: ParticleSphereProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer
    points: THREE.Points
    geometry: THREE.BufferGeometry
    material: THREE.PointsMaterial
    positions: Float32Array
    originals: Float32Array
    velocities: Float32Array
    pointer: THREE.Vector2
    isTouching: boolean
    animationId: number
  } | null>(null)

  const handleResize = useCallback(() => {
    if (!sceneRef.current) return

    const { camera, renderer } = sceneRef.current
    const width = window.innerWidth
    const height = window.innerHeight

    camera.aspect = width / height
    camera.position.z = width < 768 ? 8 : 6
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    const width = window.innerWidth
    const height = window.innerHeight
    const isMobile = width < 768
    const actualParticleCount = isMobile ? 30000 : particleCount

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    camera.position.z = isMobile ? 8 : 6

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Geometry
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(actualParticleCount * 3)
    const originals = new Float32Array(actualParticleCount * 3)
    const velocities = new Float32Array(actualParticleCount * 3)
    const radius = isMobile ? 2.2 : 2.8

    for (let i = 0; i < actualParticleCount; i++) {
      const i3 = i * 3
      const phi = Math.acos(-1 + (2 * i) / actualParticleCount)
      const theta = Math.sqrt(actualParticleCount * Math.PI) * phi

      positions[i3] = radius * Math.cos(theta) * Math.sin(phi)
      positions[i3 + 1] = radius * Math.sin(theta) * Math.sin(phi)
      positions[i3 + 2] = radius * Math.cos(phi)

      originals[i3] = positions[i3]
      originals[i3 + 1] = positions[i3 + 1]
      originals[i3 + 2] = positions[i3 + 2]
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.015 : 0.012,
      color: 0x00d2ff,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // Store refs
    sceneRef.current = {
      scene,
      camera,
      renderer,
      points,
      geometry,
      material,
      positions,
      originals,
      velocities,
      pointer: new THREE.Vector2(-100, -100),
      isTouching: false,
      animationId: 0,
    }

    // Event handlers
    const handleMouseMove = (e: MouseEvent) => {
      if (!sceneRef.current) return
      sceneRef.current.pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      sceneRef.current.pointer.y = -(e.clientY / window.innerHeight) * 2 + 1
      sceneRef.current.isTouching = true
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (!sceneRef.current) return
      const touch = e.touches[0]
      sceneRef.current.pointer.x = (touch.clientX / window.innerWidth) * 2 - 1
      sceneRef.current.pointer.y = -(touch.clientY / window.innerHeight) * 2 + 1
      sceneRef.current.isTouching = true
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!sceneRef.current) return
      const touch = e.touches[0]
      sceneRef.current.pointer.x = (touch.clientX / window.innerWidth) * 2 - 1
      sceneRef.current.pointer.y = -(touch.clientY / window.innerHeight) * 2 + 1
      sceneRef.current.isTouching = true
    }

    const handleTouchEnd = () => {
      if (!sceneRef.current) return
      sceneRef.current.isTouching = false
    }

    // Animation loop
    const animate = () => {
      if (!sceneRef.current) return

      const { points, originals, velocities, pointer, isTouching, camera } = sceneRef.current
      const posAttr = points.geometry.attributes.position

      points.rotation.y += 0.002
      points.rotation.x += 0.0005

      // Project pointer into 3D space
      const vector = new THREE.Vector3(pointer.x, pointer.y, 0.5).unproject(camera)
      const dir = vector.sub(camera.position).normalize()
      const distance = -camera.position.z / dir.z
      const touch3D = camera.position.clone().add(dir.multiplyScalar(distance))

      const invRot = new THREE.Matrix4().makeRotationFromEuler(points.rotation).invert()
      const localTouch = touch3D.clone().applyMatrix4(invRot)

      for (let i = 0; i < actualParticleCount; i++) {
        const i3 = i * 3
        let x = posAttr.array[i3]
        let y = posAttr.array[i3 + 1]
        let z = posAttr.array[i3 + 2]

        const ox = originals[i3]
        const oy = originals[i3 + 1]
        const oz = originals[i3 + 2]

        const dx = x - localTouch.x
        const dy = y - localTouch.y
        const dz = z - localTouch.z
        const d2 = dx * dx + dy * dy + dz * dz
        const d = Math.sqrt(d2)

        // Repel particles
        const limit = isTouching ? 1.2 : 0.4
        if (d < limit) {
          const repulsion = (1.0 - d / limit) * 0.3
          velocities[i3] += dx * repulsion
          velocities[i3 + 1] += dy * repulsion
          velocities[i3 + 2] += dz * repulsion
        }

        // Spring back to original position
        const springForce = 0.06
        velocities[i3] += (ox - x) * springForce
        velocities[i3 + 1] += (oy - y) * springForce
        velocities[i3 + 2] += (oz - z) * springForce

        // Damping
        velocities[i3] *= 0.82
        velocities[i3 + 1] *= 0.82
        velocities[i3 + 2] *= 0.82

        posAttr.array[i3] += velocities[i3]
        posAttr.array[i3 + 1] += velocities[i3 + 1]
        posAttr.array[i3 + 2] += velocities[i3 + 2]
      }

      posAttr.needsUpdate = true
      renderer.render(scene, camera)
      sceneRef.current.animationId = requestAnimationFrame(animate)
    }

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleTouchEnd)
    window.addEventListener('resize', handleResize)

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('resize', handleResize)

      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId)
        sceneRef.current.renderer.dispose()
        sceneRef.current.geometry.dispose()
        sceneRef.current.material.dispose()
        if (containerRef.current) {
          containerRef.current.removeChild(sceneRef.current.renderer.domElement)
        }
      }
    }
  }, [particleCount, handleResize])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0"
      style={{ touchAction: 'none' }}
    />
  )
}

"use client"

// Carga condicional para evitar errores si los paquetes aún no están instalados
let Canvas: any = () => null
let useFrame: any = () => {}
let Html: any = () => null
let useGLTF: any = () => ({ scene: null })
let THREE: any = null
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const fiber = require("@react-three/fiber")
  Canvas = fiber.Canvas
  useFrame = fiber.useFrame
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const drei = require("@react-three/drei")
  Html = drei.Html
  useGLTF = drei.useGLTF
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  THREE = require("three")
} catch (e) {
  // Paquetes no disponibles: el fallback seguirá funcionando sin romper SSR
}
import type * as THREEType from "three"
import React, { Suspense, useMemo, useRef } from "react"
import { HeroVisual } from "./hero-visual"

function ChartCandles() {
  const meshRef = useRef<THREEType.InstancedMesh | null>(null)
  const dummy = useMemo(() => new (THREE?.Object3D ?? Object)(), [])

  const count = 24

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    for (let i = 0; i < count; i++) {
      const x = (i - count / 2) * 0.25
      const base = 0.6 + 0.4 * Math.sin(i * 0.35 + t * 1.2)
      const h = Math.max(0.1, base)
      dummy.position.set(x, h / 2, 0)
      dummy.scale.set(0.18, h, 0.18)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current!.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined as any, undefined as any, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#22c55e" roughness={0.4} metalness={0.1} />
    </instancedMesh>
  )
}

function TrendLine() {
  const points = useMemo(() => {
    const pts: THREEType.Vector3[] = []
    const n = 40
    for (let i = 0; i < n; i++) {
      const x = (i - n / 2) * 0.18
      const y = 0.2 * Math.sin(i * 0.3) + 0.05 * i * 0.05
      if (THREE) {
        pts.push(new THREE.Vector3(x, y + 1, 0.02))
      }
    }
    return pts
  }, [])
  const lineRef = useRef<THREEType.Line | null>(null)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (lineRef.current) {
      lineRef.current.material.opacity = 0.7 + 0.2 * Math.sin(t * 0.8)
    }
  })
  return (
    <line ref={lineRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array(points.flatMap((p) => p.toArray())), 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#f97316" transparent opacity={0.8} />
    </line>
  )
}

function TraderFigure() {
  const headRef = useRef<THREEType.Mesh | null>(null)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (headRef.current) headRef.current.position.y = 1.55 + Math.sin(t * 2) * 0.03
  })
  return (
    <group position={[-1.4, 0, 0]}>
      <mesh ref={headRef} position={[0, 1.55, 0]}>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.1, 0]}>
        <coneGeometry args={[0.18, 0.6, 24]} />
        <meshStandardMaterial color="#3b82f6" roughness={0.5} />
      </mesh>
      <mesh position={[0.24, 1.25, 0]} rotation={[0, 0, -0.5]}>
        <cylinderGeometry args={[0.03, 0.03, 0.5, 12]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
    </group>
  )
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <group>
      <mesh position={[0.2, 1.1, 0]}>
        <boxGeometry args={[2.6, 1.8, 0.08]} />
        <meshStandardMaterial color="#0b0b0b" roughness={0.8} />
      </mesh>
      <mesh position={[0.2, 1.1, 0.045]}>
        <boxGeometry args={[2.4, 1.6, 0.02]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <group position={[0.2, 1.1, 0.06]}>{children}</group>
    </group>
  )
}

function ModelFallback() {
  return (
    <group>
      <PhoneFrame>
        <ChartCandles />
        <TrendLine />
      </PhoneFrame>
      <TraderFigure />
    </group>
  )
}

function TraderModel() {
  // Attempts to load /hero-trader.glb if present
  const gltf = useGLTF("/hero-trader.glb", true)
  return <primitive object={gltf.scene} position={[0, 0.6, 0]} scale={1.6} />
}

export function HeroVisual3D() {
  // Si no hay Canvas (paquetes no instalados), usar el SVG
  if (!Canvas || Canvas.toString() === (() => null).toString()) {
    return <HeroVisual />
  }
  return (
    <div className="relative w-full h-[260px] sm:h-[320px]">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 1.6, 4.2], fov: 45 }}>
        <color attach="background" args={["transparent"] as any} />
        <hemisphereLight intensity={0.6} groundColor="#0b0b0b" />
        <directionalLight intensity={1.1} position={[2, 3, 2]} />
        <Suspense fallback={<Html center style={{ color: "#999", fontSize: 12 }}>cargando…</Html>}>
          <ModelFallback />
        </Suspense>
      </Canvas>
    </div>
  )
}

useGLTF.preload?.("/hero-trader.glb")



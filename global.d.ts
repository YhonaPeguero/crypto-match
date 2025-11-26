// Extiende JSX para incluir elementos de React Three Fiber
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Geometrías
      boxGeometry: {
        args?: [number?, number?, number?, number?, number?, number?]
        [key: string]: any
      }
      sphereGeometry: {
        args?: [number?, number?, number?]
        [key: string]: any
      }
      coneGeometry: {
        args?: [number?, number?, number?, number?]
        [key: string]: any
      }
      cylinderGeometry: {
        args?: [number?, number?, number?, number?]
        [key: string]: any
      }
      bufferGeometry: {
        attach?: string
        [key: string]: any
      }
      bufferAttribute: {
        attach?: string
        args?: [ArrayLike<number>, number]
        [key: string]: any
      }
      // Materiales
      meshStandardMaterial: {
        color?: string | number
        roughness?: number
        metalness?: number
        [key: string]: any
      }
      meshBasicMaterial: {
        color?: string | number
        [key: string]: any
      }
      lineBasicMaterial: {
        color?: string | number
        transparent?: boolean
        opacity?: number
        [key: string]: any
      }
      // Objetos 3D
      mesh: {
        position?: [number, number, number]
        rotation?: [number, number, number]
        scale?: [number, number, number] | number
        ref?: any
        [key: string]: any
      }
      group: {
        position?: [number, number, number]
        rotation?: [number, number, number]
        scale?: [number, number, number] | number
        [key: string]: any
      }
      line: {
        ref?: any
        [key: string]: any
      }
      instancedMesh: {
        ref?: any
        limit?: number
        castShadow?: boolean
        receiveShadow?: boolean
        [key: string]: any
      }
      primitive: {
        object?: any
        position?: [number, number, number]
        scale?: [number, number, number] | number
        [key: string]: any
      }
      // Luces
      hemisphereLight: {
        intensity?: number
        groundColor?: string
        [key: string]: any
      }
      directionalLight: {
        intensity?: number
        position?: [number, number, number]
        [key: string]: any
      }
      ambientLight: {
        intensity?: number
        [key: string]: any
      }
      pointLight: {
        intensity?: number
        position?: [number, number, number]
        [key: string]: any
      }
      // Otros
      color: {
        attach?: string
        args?: [string | number]
        [key: string]: any
      }
      // Permite cualquier otro elemento de Three.js
      [key: string]: any
    }
  }
}

export {}





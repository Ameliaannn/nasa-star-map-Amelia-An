import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { useRef } from 'react'

function Planet({ texturePath, onClick, onDoubleClick, size = 1 }) {
  const texture = useLoader(TextureLoader, texturePath)
  const meshRef = useRef()

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002
    }
  })

  return (
    <mesh
      ref={meshRef}
      onClick={onClick}
      
    >
      <sphereGeometry args={[size, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}

export default Planet

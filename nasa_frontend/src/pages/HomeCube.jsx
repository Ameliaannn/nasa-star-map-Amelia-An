import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'

function HomeCube({ position, texturePath, size = 1, onClick }) {
  const texture = useLoader(TextureLoader, texturePath)

  return (
    <mesh position={position}  onClick={onClick}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}

export default HomeCube

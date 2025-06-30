import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef, useEffect, useState } from 'react'
import Planet from './Planet'
import HomeCube from './HomeCube'
import { useNavigate } from 'react-router-dom'

function RotatingPlanets({ setFullText }) {
  const earthRef = useRef()
  const marsRef = useRef()
  const venusRef = useRef()
  const navigate = useNavigate()

  useFrame(() => {
    if (earthRef.current) earthRef.current.rotation.y += 0.001
    if (marsRef.current) marsRef.current.rotation.y += 0.00098
    if (venusRef.current) venusRef.current.rotation.y += 0.000001
  })

  return (
    <>
      {/* Home Cube */}
      <HomeCube
        position={[24, 0, 0]}
        texturePath="/textures/home.jpg"
        size={5}
        onClick={() => navigate('/nasadata')}
      />

      {/* Earth */}
      <group ref={earthRef} position={[-8, 0, -5]}>
        <Planet
          size={6}
          texturePath="/textures/earth.jpg"
          onClick={() => window.location.href = '/earth'}
        />
      </group>

      {/* Venus */}
      <group ref={venusRef} position={[-28, 0, -10]}>
        <Planet
          size={4.5}
          texturePath="/textures/venus.jpg"
          onClick={() => alert('🟡THIS IS VENUS. A hot, cloudy planet often called Earth\'s twin.')}
        />
      </group>

      {/* Mars */}
      <group ref={marsRef} position={[8, 0, 0]}>
        <Planet
          size={6}
          texturePath="/textures/mars.jpg"
          onClick={() => window.location.href = '/mars'}
        />
      </group>
    </>
  )
}

export default function SolarSystem() {
  const [dialogue, setDialogue] = useState('')
  const [fullText, setFullText] = useState('Welcome to the NASA star map system!😃 Click on any planet to start your journey into space!')
  const [i, setI] = useState(0)

  useEffect(() => {
    if (i < fullText.length) {
      const timeout = setTimeout(() => {
        setDialogue((prev) => prev + fullText[i])
        setI((prev) => prev + 1)
      }, 80)
      return () => clearTimeout(timeout)
    }
  }, [i, fullText])

  useEffect(() => {
    setDialogue('')
    setI(0)
  }, [fullText])

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <div
        style={{
          position: 'absolute',
          top: '3%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '16px 24px',
          borderRadius: '12px',
          fontSize: 'clamp(12px, 3vw, 18px)', 
          maxWidth: '90vw', 
          zIndex: 10,
          boxShadow: '0 0 10px rgba(0,0,0,0.5)',
          whiteSpace: 'pre-wrap',
          textAlign: 'center',
        }}
      >
        {dialogue}
      </div>


      <p
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(255,255,255,0.6)',
          fontSize: 'clamp(10px, 2vw, 14px)', 
          textAlign: 'center',
          maxWidth: '90vw',
          zIndex: 10,
        }}
      >
        Data from NASA Open APIs · Project by Amelia An
      </p>
      <Canvas camera={{ position: [0, 5, 20] }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        <RotatingPlanets setFullText={setFullText} />
      </Canvas>
    </div>
  )
}

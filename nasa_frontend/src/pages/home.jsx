import { useCallback } from 'react'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'

export default function Home() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine)
  }, [])

  return (
    <div className="relative h-screen bg-black text-white overflow-hidden">
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0 -z-10"
        options={{
          background: { color: '#000000' },
          fullScreen: { enable: false }, 
          fpsLimit: 60,
          particles: {
            number: { value: 80 },
            size: { value: 2 },
            move: { speed: 0.3 },
            links: { enable: true, color: '#ffffff', distance: 100 },
            opacity: { value: 0.6 },
          },
        }}
      />
      <div className="flex flex-col items-center justify-center h-full z-10">
        <h1 className="text-4xl font-bold"></h1>
      </div>
    </div>
  )
}

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SolarSystem from './pages/SolarSystem'
import EarthInfo from './pages/EarthInfo'
import MarsInfo from './pages/MarsInfo'
import NasaData from './pages/NasaData' 

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SolarSystem />} />
        <Route path="/earth" element={<EarthInfo />} />
        <Route path="/mars" element={<MarsInfo />} />
        <Route path="/nasadata" element={<NasaData />} />
      </Routes>
    </Router>
  )
}

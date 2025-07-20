import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function AsteroidSizeChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/asteroids/top10`)
      .then(res => res.json())
      .then(json => {
        const processed = json
          .map(a => ({
            name: `${a.name} (${a.approach_date})`,
            size: a.diameter || 0
          }))
          .sort((a, b) => b.size - a.size)
        setData(processed)
      })
      .catch(err => {
        console.error('Failed to fetch top10 asteroids:', err)
      })
  }, [])

  return (
    <div style={{ width: '100%', height: 400, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '1rem' }}>
      <h3 style={{ color: '#fff', textAlign: 'center' }}>Top 10 Largest Asteroids (Next 7 Days)</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart layout="vertical" data={data} margin={{ left: 20 }}>
          <XAxis type="number" stroke="#fff" />
          <YAxis dataKey="name" type="category" stroke="#fff" width={160} />
          <Tooltip formatter={(value) => `${value.toFixed(3)} km`} />
          <Bar dataKey="size" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

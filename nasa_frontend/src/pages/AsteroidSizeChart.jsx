import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function AsteroidSizeChart({ asteroids }) {
  const top10 = [...asteroids]
    .map(a => ({
      name: a.name,
      size: a.estimated_diameter?.kilometers?.estimated_diameter_max || 0
    }))
    .sort((a, b) => b.size - a.size)
    .slice(0, 10)

  return (
    <div style={{ width: '100%', height: 400, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '1rem' }}>
      <h3 style={{ color: '#fff', textAlign: 'center' }}>Top 10 Largest Asteroids</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart layout="vertical" data={top10} margin={{ left: 20 }}>
          <XAxis type="number" stroke="#fff" />
          <YAxis dataKey="name" type="category" stroke="#fff" width={130} />
          <Tooltip />
          <Bar dataKey="size" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

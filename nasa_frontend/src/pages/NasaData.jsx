import { useEffect, useState } from 'react'
import AsteroidSizeChart from './AsteroidSizeChart'

export default function NasaData() {
  const today = new Date().toISOString().split('T')[0]
  const [selectedDate, setSelectedDate] = useState(today)
  const [asteroids, setAsteroids] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/asteroids?date=${selectedDate}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
      })
      .then(data => {
        setAsteroids(data || [])
        if (!data || data.length === 0) setError(true)
        setLoading(false)
      })
      .catch(err => {
        console.error('Fetch error:', err)
        setAsteroids([])
        setError(true)
        setLoading(false)
      })
  }, [selectedDate])

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h1 style={{ textAlign: 'center' }}>Near Earth Asteroids</h1>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <label style={{ marginRight: '0.5rem' }}>Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '6px' }}
        />
      </div>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : (
        <>
          {error ? (
            <p style={{ textAlign: 'center', fontSize: '1.2rem', marginTop: '2rem' }}>
              😢 The data has gone out. Please try again on a different date.
            </p>
          ) : (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '2rem',
                marginTop: '1rem',
                justifyContent: 'center',
              }}
            >
              <div style={{ flex: '1 1 100%', maxWidth: '1000px', overflowX: 'auto' }}>
           <table
              style={{
              width: '100%',                        
              maxWidth: '1000px',                  
              margin: '0 auto',                    
              borderCollapse: 'collapse',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              backdropFilter: 'blur(8px)',
                          }}
                    >
                  <thead>
                    <tr style={{ backgroundColor: '#222' }}>
                      <th style={thStyle}>ID</th>
                      <th style={thStyle}>Name</th>
                      <th style={thStyle}>Magnitude</th>
                      <th style={thStyle}>Potential Hazard</th>
                      <th style={thStyle}>Date of Closest Approach</th>
                    </tr>
                  </thead>
                  <tbody>
                    {asteroids.map((asteroid, index) => (
                      <tr key={asteroid.neo_id || `row-${index}`} style={{ borderBottom: '1px solid #555' }}>
                        <td style={tdStyle}>{asteroid.neo_id ?? 'N/A'}</td>
                        <td style={tdStyle}>{asteroid.name ?? 'Unknown'}</td>
                        <td style={{ ...tdStyle, textAlign: 'right' }}>{asteroid.magnitude ?? '—'}</td>
                        <td
                          style={{
                            ...tdStyle,
                            textAlign: 'center',
                            color: asteroid.is_hazardous ? 'red' : 'lightgreen',
                          }}
                        >
                          {asteroid.is_hazardous ? 'YES' : 'NO'}
                        </td>
                        <td style={tdStyle}>{asteroid.approach_date ?? '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div style={{ width: '100%' }}>
            <AsteroidSizeChart />
          </div>
        </>
      )}
    </div>
  )
}

const thStyle = {
  border: '1px solid rgba(255,255,255,0.2)',
  padding: '0.6rem',
  color: '#fff',
  backgroundColor: 'rgba(0,0,0,0.3)',
  fontWeight: 'bold',
  textAlign: 'left',
}

const tdStyle = {
  border: '1px solid rgba(255,255,255,0.1)',
  padding: '0.5rem',
  color: '#fff',
  backgroundColor: 'rgba(255,255,255,0.05)',
}

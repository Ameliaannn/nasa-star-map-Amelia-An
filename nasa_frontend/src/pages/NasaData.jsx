import { useEffect, useState } from 'react'
import AsteroidSizeChart from './AsteroidSizeChart'

export default function NasaData() {
  const [asteroids, setAsteroids] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://nasa-backend-tm30.onrender.com/api/asteroids')
      .then(res => res.json())
      .then(data => {
        setAsteroids(data || [])
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch asteroids:', err)
        setLoading(false)
      })
  }, [])

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h1 style={{ textAlign: 'center' }}>Near Earth Asteroids</h1>
      {loading ? (
        <p>Loading...</p>
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
                minWidth: '600px',
                borderCollapse: 'collapse',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                overflow: 'hidden',
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
                {asteroids.map((asteroid) => {
                  const approachDate =
                    asteroid.close_approach_data?.[0]?.close_approach_date || 'UNKNOWN'
                  return (
                    <tr key={asteroid.id} style={{ borderBottom: '1px solid #555' }}>
                      <td style={tdStyle}>{asteroid.id}</td>
                      <td style={tdStyle}>{asteroid.name}</td>
                      <td style={{ ...tdStyle, textAlign: 'right' }}>
                        {asteroid.absolute_magnitude_h}
                      </td>
                      <td
                        style={{
                          ...tdStyle,
                          textAlign: 'center',
                          color: asteroid.is_potentially_hazardous_asteroid
                            ? 'red'
                            : 'lightgreen',
                        }}
                      >
                        {asteroid.is_potentially_hazardous_asteroid ? 'YES' : 'NO'}
                      </td>
                      <td style={tdStyle}>{approachDate}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>


          <div style={{ flex: '1 1 100%', maxWidth: '1000px' }}>
            <AsteroidSizeChart asteroids={asteroids} />
          </div>
        </div>
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

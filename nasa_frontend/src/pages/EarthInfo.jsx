import { useEffect, useState } from 'react'

export default function EarthInfo() {
  const [epicData, setEpicData] = useState(null)

  useEffect(() => {
    fetch('https://nasa-backend-tm30.onrender.com/api/epic')
      .then(res => res.json())
      .then(data => setEpicData(data))
      .catch(err => console.error('Fetch EPIC failed:', err))
  }, [])

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        backgroundImage: `url('/textures/bg1.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '2rem 1rem',
        color: 'white',
        textAlign: 'center',
        overflowY: 'auto',
        boxSizing: 'border-box',
      }}
    >
      <h1
        style={{
          fontSize: '6vw',
          marginBottom: '1rem',
          maxWidth: '90%',
          wordWrap: 'break-word',
        }}
      >
        NASA EPIC Earth View
      </h1>

      {epicData ? (
        <>
          <img
            src={epicData.imageUrl}
            alt="Earth from NASA EPIC"
            style={{
              width: '90vw',
              maxWidth: '600px',
              height: 'auto',
              borderRadius: '10px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
              objectFit: 'contain',
            }}
          />
          <p style={{ marginTop: '1rem', fontSize: '1rem', lineHeight: '1.6' }}>
            {epicData.caption}
          </p>
          <p style={{ fontSize: '0.9rem' }}>
            <strong>Date:</strong> {epicData.date}
          </p>
        </>
      ) : (
        <p style={{ fontSize: '1.2rem' }}>Loading image...</p>
      )}
    </div>
  )
}

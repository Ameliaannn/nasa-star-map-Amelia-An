import { useEffect, useState } from 'react'

export default function EarthInfo() {
  const today = new Date().toISOString().split('T')[0]
  const [selectedDate, setSelectedDate] = useState(today)
  const [epicData, setEpicData] = useState(null)
  const [error, setError] = useState('')
  const [availableDates, setAvailableDates] = useState([])

  // 获取指定日期的图像
  const fetchEpic = (date) => {
    fetch(`https://nasa-backend-tm30.onrender.com/api/epic?date=${date}`)
      .then(res => {
        if (!res.ok) throw new Error('No image data available for the selected date.')
        return res.json()
      })
      .then(data => {
        setEpicData(data)
        setError('')
      })
      .catch(err => {
        setEpicData(null)
        setError(err.message || 'Failed to fetch image data.')
      })
  }

  // 加载所有可用日期
  useEffect(() => {
    fetch('https://epic.gsfc.nasa.gov/api/natural/all')
      .then(res => res.json())
      .then(data => {
        const dates = data.map(d => d.date?.split(' ')[0])
        const uniqueDates = [...new Set(dates)]
        setAvailableDates(uniqueDates)

        // 自动加载今天或最后一个有效日期
        if (uniqueDates.includes(today)) {
          setSelectedDate(today)
          fetchEpic(today)
        } else {
          const lastValid = uniqueDates[uniqueDates.length - 1]
          setSelectedDate(lastValid)
          fetchEpic(lastValid)
          setError('⚠️ No EPIC image for today, showing last available image.')
        }
      })
      .catch(err => {
        console.error('Failed to fetch available dates:', err)
        setError('Failed to load available EPIC dates.')
      })
  }, [])

  const handleDateChange = (e) => {
    const date = e.target.value
    setSelectedDate(date)

    if (date > today) {
      setError('⚠️ You cannot select a future date.')
      setEpicData(null)
      return
    }

    if (!availableDates.includes(date)) {
      setError('⚠️ No EPIC image available for the selected date.')
      setEpicData(null)
      return
    }

    setError('')
    fetchEpic(date)
  }

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

      <div style={{ marginBottom: '1.5rem' }}>
        <input
          type="date"
          value={selectedDate}
          max={today}
          onChange={handleDateChange}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            border: 'none',
            fontSize: '1rem',
          }}
        />
      </div>

      {error ? (
        <p style={{ fontSize: '1rem', color: 'lightcoral', maxWidth: '90%' }}>{error}</p>
      ) : epicData ? (
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

# NASA Star Map System - Amelia An

An interactive 3D web application that visualizes real-time space data from NASA using beautiful visual effects, charts, and interactive planets. Users can explore Mars rover photos, Earth EPIC images, and asteroid information.

### Live Demo & Video

- Web App: [https://nasa-frontend-lemon.vercel.app/](https://nasa-frontend-lemon.vercel.app/)
- YouTube Demo: [https://www.youtube.com/watch?v=LZzoJlKi4Uw](https://www.youtube.com/watch?v=LZzoJlKi4Uw)

---

### Features

- **🪐 Home Cube Navigation**  
  Interactive rotating cube with clickable sides:  
  - **Earth** → View Earth through NASA EPIC  
  - **Mars** → Explore Mars Rover images & info  
  - **Asteroids** → Top 10 asteroid sizes with chart and near-Earth objects table

- **360° Planet Rotation**  
  Realistic spinning planets following mouse movement using `three.js`

- **Charts & Tables**  
  - Asteroid size bar chart (Recharts)  
  - Near-Earth asteroid table with zoom-in effect

- **Mars Info Viewer**  
  Displays Mars mission data with images & rover camera labels

- **EPIC Earth View**  
  Shows daily Earth imagery from NASA EPIC API

- **Dialogue UI Navigation**  
  Custom UI styled like in-game conversation popups

---

### Tech Stack

- **Frontend**: React + Vite + Tailwind CSS + Three.js + Recharts  
- **Backend**: Node.js + Express  
- **Deployment**: Vercel (frontend), Render (backend)  
- **Data Source**: [NASA Open APIs](https://api.nasa.gov/)

---

### Folder Structure

```
nasa-star-map-System/
├── nasa-backend/
│   ├── routes/
│   │   ├── asteroidRouter.js
│   │   ├── epicRouter.js
│   │   ├── marsRouter.js
│   │   └── nasaRouter.js
│   ├── users.js
│   ├── app.js
│   ├── index.js          ← Run with: node index.js
│   ├── package.json
├── nasa_frontend/
│   ├── public/
│   │   └── textures/
│   ├── src/
│   │   ├── assets/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── EarthInfo.jsx
│   │   │   ├── MarsInfo.jsx
│   │   │   └── AsteroidSizeChart.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── vercel.json
│   └── README.md
```

---

### API Endpoints

| Endpoint         | Description             |
|------------------|-------------------------|
| `/api/epic`      | Earth images (EPIC)     |
| `/api/mars`      | Mars Rover photos       |
| `/api/asteroids` | Top asteroid sizes      |
| `/api/nasa`      | General NASA data       |

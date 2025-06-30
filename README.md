# NASA Star Map System - Amelia An

An interactive 3D web application that visualizes real-time space data from NASA using visual effects, charts, and interactive planets. Users can explore Mars rover photos, Earth EPIC images, and asteroid information.

## Live Demo & Video

- Web App: [https://nasa-frontend-lemon.vercel.app/](https://nasa-frontend-lemon.vercel.app/)
- YouTube Demo: [https://www.youtube.com/watch?v=LZzoJlKi4Uw](https://www.youtube.com/watch?v=LZzoJlKi4Uw)

---

## Features

- **Navigation**  
  Interactive rotating Obj:
  - Earth → View Earth through NASA EPIC
  - Mars → Explore Mars Rover images and information
  - Homwcube → Top 10 asteroid sizes with chart and near-Earth objects table

- **360° Planet Rotation**  
  Realistic spinning planets that respond to mouse movement (Three.js)

- **Charts & Tables**  
  - Asteroid size bar chart (Recharts)
  - Near-Earth asteroid table with zoom-in effect

- **Mars Info Viewer**  
  Displays Mars mission photos and camera labels

- **EPIC Earth View**  
  Daily Earth imagery from NASA EPIC API

- **Dialogue UI Navigation**  
  Game-style dialogue navigation popups

---

## Tech Stack

- Frontend: React + Vite + Tailwind CSS + Three.js + Recharts  
- Backend: Node.js + Express  
- Deployment: Vercel (Frontend), Render (Backend)  
- Data Source: [NASA Open APIs](https://api.nasa.gov/)

---

## Requirements

- Node.js v18+
- npm v9+
- NASA API Key (register at https://api.nasa.gov)

---

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/nasa-star-map-System.git
cd nasa-star-map-System
```

### 2. Setup and Run Backend
```bash
cd nasa-backend
npm install
# Optionally set environment variable if not hardcoded:
# export NASA_API_KEY=your_api_key
node index.js
```

Backend will run on default port `5000`.

### 3. Setup and Run Frontend
```bash
cd ../nasa_frontend
npm install
npm run dev
```

Frontend runs on Vite’s default port `5173` (or as configured).

---

## Folder Structure

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
│   ├── index.js
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

## API Endpoints

| Endpoint         | Description               |
|------------------|---------------------------|
| `/api/epic`      | Earth images (EPIC)       |
| `/api/mars`      | Mars Rover photos         |
| `/api/asteroids` | Top asteroid sizes        |
| `/api/nasa`      | General NASA information  |

---

## Deployment

- Frontend is deployed on **Vercel**  
- Backend is deployed on **Render**  
- No need to manually input NASA Key on frontend; API key is securely managed in backend

---

## License

This project is created as part of the 2025 Software Engineer Coding Challenge.

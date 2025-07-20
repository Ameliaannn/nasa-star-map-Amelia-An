# NASA Star Map System - Amelia An

An interactive 3D web application that visualizes real-time space data from NASA using visual effects, charts, and interactive planets. Users can explore Mars rover photos, Earth EPIC images, and asteroid information.

## Live Demo 
- Web App: [https://nasa-frontend-lemon.vercel.app/](https://nasa-frontend-lemon.vercel.app/)

---

## New Features (20/07/2025 Update)

### EPIC Earth View Calendar
- **Frontend Date Picker** added to the Earth (EPIC) section
- Users can now **select any date** from **2015-06-13 to 2025-07-XX** (latest available)
- Dates after latest available are **automatically disabled**
- Still powered by **NASA EPIC API** – API usage logic remains unchanged

### Asteroids Database: PostgreSQL + Scheduled Fetch
- Introduced a **PostgreSQL database (`neodata`)** hosted on **Render**
- Created a **daily cron job** (runs at **06:00 UTC**) to fetch current day's near-Earth object (NEO) data
- Fetch begins from **2025-07-18**, so earlier dates are unavailable in the database
- **Frontend now reads NEO data directly from the database**, not API

### NEO Data Visualization Enhancement
- **Chart 1**: Sorted by **absolute magnitude (brightness)** ascending, with:
  - **Danger Flag**, **Distance**, **Name**, etc.
- **Chart 2**: Shows **Top NEOs by size over past 7 days**
  - Includes **calendar picker** to select a specific day (no grey-out, but shows “Sorry, Data went out” tip if not available)
  - Real-time updates based on database content

---

## 🛰 Features Overview

- **Navigation**
  - Earth → EPIC images with date selector
  - Mars → Mars Rover photos + camera labels
  - Homecube → Asteroid charts + NEO database

- **3D Planetary Interaction**  
  Realistic **360° spinning planets** (Three.js)  
  Mouse-controlled interactive rotation

- **Dialogue UI**  
  Game-style interactive pop-up guidance

---

## Visualizations

- **EPIC Earth Viewer**  
  - NASA EPIC imagery based on user-selected valid dates  
  - Automatic grey-out of invalid future dates

- **Mars Rover Gallery**  
  - Displays camera info and images from different Mars missions

- **Asteroid Charts**
  - **Chart 1**: Brightness-based (magnitude) sorted NEOs  
  - **Chart 2**: Largest asteroids from the last 7 days (selectable)

---

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS + Three.js + Recharts  
- **Backend**: Node.js + Express + PostgreSQL (Render-hosted)  
- **Deployment**: Vercel (Frontend) + Render (Backend & DB)  
- **NASA Data**: [NASA Open APIs](https://api.nasa.gov)

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Ameliaannn/nasa-star-map-Amelia-An.git
cd nasa-star-map-Amelia-An
```

### 2. Setup and Run Backend
```bash
cd nasa-backend
npm install
node index.js
```
- Runs on: `http://localhost:5000`
- Database: PostgreSQL (must configure DB connection string via `.env`)

### 3. Setup and Run Frontend
```bash
cd ../nasa_frontend
npm install
npm run dev
```
- Runs on: `http://localhost:5173`

---

## Updated Backend Folder Structure

```
nasa-backend/
├── routes/
│   ├── asteroidRouter.js       
│   ├── epicRouter.js          
│   ├── marsRouter.js           
│   ├── nasaRouter.js           
│   ├── top10.js                
│   └── users.js                  
├── app.js                     
├── index.js                    
├── cronjob.js                  
├── db.js                      
├── initdb.js                   
├── Neodata.js                  
├── package.json
```

---

| Routes           | Description                                                             |
|------------------|-------------------------------------------------------------------------|
| `/api/epic`      | Get NASA EPIC Earth Images (supports date lookup)                       |
| `/api/mars`      | Get Mars Rover Pictures and Camera Information                          |
| `/api/asteroids` | Real-time acquisition of asteroid data from NASA (no repository)        |
| `/api/neodb`     | Reading of near-Earth asteroid data from database (from 2025/07/18)     |
| `/api/top10`     | Getting data on the top 10 asteroids in terms of brightness             |


---

## Date Picker Behavior Summary

| Section   | Picker Behavior                          |
|-----------|-------------------------------------------|
| EPIC Earth | Disabled future dates after latest NASA data |
| NEO Chart | All dates selectable, warns if no data    |

---

## Requirements

- Node.js v18+
- npm v9+
- PostgreSQL connection (Render or local)
- NASA API Key (register at [api.nasa.gov](https://api.nasa.gov))

---

## License

This project was created for the **2025 Software Engineer Coding Challenge**.  
Feel free to explore, contribute, and share ideas!

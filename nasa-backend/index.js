const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
// connect MySQL
//const db = require('./util/dbconfig');

// import user cntroller
//const userController = require('./controllers/userController');

//import nasa api
const nasaRouter = require('./routes/nasaRouter');
const marsRouter = require('./routes/marsRouter');
const epicRouter = require('./routes/epicRouter');
const asteroidRouter = require('./routes/asteroidRouter');

// json
app.use(express.json());

// nasa route
app.use('/api', nasaRouter);
app.use('/api/mars', marsRouter);
app.use('/api/epic', epicRouter);
app.use('/api', asteroidRouter);


// listen 5000
app.listen(5000, () => {
    console.log('Server running at http://localhost:5000');
});

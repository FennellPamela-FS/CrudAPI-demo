//   bare bones for our basic server
const express = require('express');
require('dotenv').config();
// const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

// Serve up environment variables for deployment (usually on heroku)
const PORT = process.env.PORT || 8000;

const studentRouter = require('./routes/students');

// const DATABASE_URL = process.env.DATABASE_URL;

// mongoose.connect(DATABASE_URL, { useNewURLParser: true });
// mongoose.set('strictQuery', false);
// const db = mongoose.connection;
// db.on('error', error => console.error(error))
// db.once('open', () => console.log('Database connected established'))


app.use(express.json()); // expect json on all routes after this
app.use('/students', studentRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})


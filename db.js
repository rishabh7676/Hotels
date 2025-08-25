const mongoose = require('mongoose');

// Define the MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels'

// setup mongodb connection
mongoose.connect(mongoURL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})

// Get the default Connection
// Mongoose maintains a default connection object representing the MongoDB connection.
const db= mongoose.connection;

// Definr event listeners for databse connection

db.on('connected', ()=>{
    console.log('Connected to mongoDB server')
})

db.on('error', (err)=>{
    console.log(' mongoDB connection error',err)
})

db.on('disconnected', ()=>{
    console.log('Disconnected to mongoDB server')
});

// Export the database connection

module.exports = db;
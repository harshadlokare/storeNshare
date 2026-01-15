require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const cors = require('cors');
const staticPath = path.join(__dirname, "/public");
app.use(express.static(staticPath));
// Cors 
const corsOptions = {
  origin: process.env.ALLOWED_CLIENTS ? process.env.ALLOWED_CLIENTS.split(',') : '*',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204
}

app.use(cors(corsOptions))
app.use(express.static('public'));

const connectDB = require('./config/db');
connectDB();

app.use(express.json());

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Routes 
//HOME
app.use(express.static(staticPath));
app.get('/', (req, res) => {
  res.status(200).sendFile(__dirname + '/public/' + 'index.html');
});
app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));

// Health check endpoint for deployment platforms
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handler middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({ 
        error: process.env.NODE_ENV === 'production' 
            ? 'Internal server error' 
            : err.message 
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    if (process.env.NODE_ENV !== 'production') {
        console.log(`Visit http://localhost:${PORT} to use the application.`);
    }
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err.message);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err.message);
    process.exit(1);
});

module.exports ={

  devServer: {
    historyApiFallback: true
  }
};
const express = require('express');
const path = require('path');
const app = express();

const cors = require('cors');

require('dotenv').config();
const HOST = '0.0.0.0';

const PORT = process.env.PORT || 8888;

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json());
const connectDB = require('./config/db');
connectDB();
//cors
const corsOptions = {
    origin: process.env.ALLOWED_CLIENTS.split(',')
}

app.use(cors(corsOptions));
//Template ENgine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

//Routes
app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download/', require('./routes/download'));

//app.use('/files',require('./routes/show'));


app.listen(process.env.PORT || 8888, process.env.HOST || '0.0.0.0', () => {
    console.log('Listening on port => ' + process.env.PORT);
})

module.exports = app;

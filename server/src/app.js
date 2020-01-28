// app.js
require('dotenv').config()
import mongoose from 'mongoose'
import cors from 'cors'
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index';
const app = express();
app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api', indexRouter);
// console.log(`process.env`, process.env)

// mongoose.connect('mongodb://localhost:27017/shortLink', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // console.log('mongo connected')
})

var mongodUri = `mongodb://${process.env.MLAB_USER}:${process.env.MLAB_PASS}@ds151943.mlab.com:51943/short_link`
mongoose.connect(mongodUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Handle production
if (process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static(__dirname + '/public/'));

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

export default app;

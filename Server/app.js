const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const apiRoutes = require('./routes/apiRoutes');
const errorController = require('./controllers/errorController');

const app = express();

app.use(cookieParser(process.env.JWT_SECRET_KEY));
app.use(express.json());
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());
app.use(cors());
app.options('*', cors());
app.use('/api', rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Too many requests from this IP, please try again in an hour!',
}));
app.use(express.static('uploads'));

// Routes
app.use(apiRoutes);

app.all('*', (req, _, next) => {
  const err = new Error(`Can't Find ${req.originalUrl}`);
  err.status = 'fail';
  err.statusCode = 404;
  err.isOperational = true;
  next(err);
});

app.use(errorController);

module.exports = app;

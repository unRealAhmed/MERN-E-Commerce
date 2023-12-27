require('dotenv').config({ path: './config.env' })
const express = require('express')
const cookieParser = require('cookie-parser');
const connectDatabase = require('./utils/DB')
const apiRoutes = require('./routes/apiRoutes');
const errorController = require('./controllers/errorController');

const app = express()
app.use(cookieParser(process.env.JWT_SECRET_KEY));
app.use(express.json())
app.use(express.static('uploads'))
connectDatabase()

// Routes
app.use(apiRoutes)

app.all('*', (req, _, next) => {
  const err = new Error(`Can't Find ${req.originalUrl}`);
  err.status = 'fail';
  err.statusCode = 404;
  err.isOperational = true;
  next(err);
});

app.use(errorController);

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server Is Running On Port ${port}...👍`))

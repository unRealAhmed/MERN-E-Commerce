require('dotenv').config({ path: './config.env' })
const express = require('express')
const cookieParser = require('cookie-parser');
const connectDatabase = require('./utils/DB')

const app = express()
connectDatabase()

app.use(cookieParser(process.env.JWT_SECRET_KEY));

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server Is Running On Port ${port}...👍`))

require('dotenv').config({ path: './config.env' })
const express = require('express')
const connectDatabase = require('./utils/DB')

const app = express()
connectDatabase()

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server Is Running On Port ${port}...👍`))

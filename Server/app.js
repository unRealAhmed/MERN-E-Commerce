require('dotenv').config({ path: './config.env' })
const express = require('express')

const app = express()

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server Is Running On Port ${port}...👍`))

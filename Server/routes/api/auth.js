const express = require('express')
const { signup } = require('../../controllers/auth')
const userSchema = require('../../validation/userValidation')
const validate = require('../../middleware/validation')

const router = express.Router()

router.post('/signup', validate(userSchema), signup)

module.exports = router
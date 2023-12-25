const express = require('express')
const { signup, login, logout, forgetPassword, resetPassword } = require('../../controllers/auth')
const userSchema = require('../../validation/userValidation')
const validate = require('../../middleware/validation')

const router = express.Router()

router.post('/signup', validate(userSchema), signup)
router.post('/login', login)
router.get('/logout', logout)
router.post('/forgetPassword', forgetPassword)
router.patch('/resetPassword/:token', resetPassword)

module.exports = router
const express = require('express')
const { getAllUsers, getMe, updateCurrentUser, updatePassword } = require('../../controllers/user')
const { protect } = require('../../controllers/auth')

const router = express.Router()

router.get('/', getAllUsers)
router.get('/me', protect, getMe)
router.patch('/updateMe', protect, updateCurrentUser)
router.patch('/updateMyPassword', protect, updatePassword)

module.exports = router
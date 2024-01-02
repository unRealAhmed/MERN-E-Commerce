const express = require('express')
const { getAllUsers, getMe, updateCurrentUser, updatePassword } = require('../../controllers/user')
const { protect, restrictTo } = require('../../controllers/auth')

const router = express.Router()

router.get('/', protect, restrictTo('admin'), getAllUsers)
router.get('/me', protect, getMe)
router.patch('/updateMe', protect, updateCurrentUser)
router.patch('/updateMyPassword', protect, updatePassword)

module.exports = router
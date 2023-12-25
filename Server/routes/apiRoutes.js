const router = require('express').Router();
const authRoutes = require('./api/auth')
const userRoutes = require('./api/user')

router.use('/api/v1/auth', authRoutes)
router.use('/api/v1/users', userRoutes)

module.exports = router
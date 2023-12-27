const router = require('express').Router();
const authRoutes = require('./api/auth');
const brandRouter = require('./api/brand');
const categoryRouter = require('./api/category');
const productRouter = require('./api/product');
const userRoutes = require('./api/user')

router.use('/api/v1/auth', authRoutes)
router.use('/api/v1/users', userRoutes)
router.use('/api/v1/products', productRouter)
router.use('/api/v1/categories', categoryRouter) 
router.use('/api/v1/brands', brandRouter) 

module.exports = router
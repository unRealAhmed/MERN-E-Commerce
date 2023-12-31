const express =require('express')
const { protect } = require('../../controllers/auth')
const { addToWishlist, removeFromWishlist, getUserWishlist } = require('../../controllers/wishlist')

const wishlistRouter =express.Router()
wishlistRouter.patch('/',protect ,addToWishlist)
wishlistRouter.delete('/',protect ,removeFromWishlist)
wishlistRouter.get('/',protect ,getUserWishlist)

module.exports =wishlistRouter
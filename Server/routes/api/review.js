const express = require('express');
const { protect } = require('../../controllers/auth');
const router = express.Router();
const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview
} = require('../../controllers/review');


router.route('/')
  .post(protect, createReview)
  .get(getAllReviews);

router.route('/:id')
  .get(getSingleReview)
  .patch(protect, updateReview)
  .delete(protect, deleteReview);

module.exports = router;

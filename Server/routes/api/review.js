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

router.use(protect)

router.route('/')
  .post(createReview)
  .get(getAllReviews);

router.route('/:id')
  .get(getSingleReview)
  .patch(updateReview)
  .delete(deleteReview);

module.exports = router;

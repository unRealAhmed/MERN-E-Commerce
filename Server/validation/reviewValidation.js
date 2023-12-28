const Joi = require('joi');

const reviewSchema = Joi.object({
  user: Joi.string().required().messages({
    'any.required': 'User is required.',
  }),
  product: Joi.string().required().messages({
    'any.required': 'Product is required.',
  }),
  review: Joi.string().required().label('Review Message').messages({
    'any.required': 'Please add a message for your review.',
  }),
  rating: Joi.number().required().min(1).max(5).label('Rating').messages({
    'any.required': 'Please add a rating between 1 and 5.',
    'number.base': 'Rating must be a number.',
    'number.min': 'Rating must be at least 1.',
    'number.max': 'Rating must not exceed 5.',
  }),
});

module.exports = reviewSchema;
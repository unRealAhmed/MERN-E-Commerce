const Joi = require('joi');

const productValidationSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name cannot be empty',
    'any.required': 'Name is required',
  }),

  descriptions: Joi.string()
    .min(3, 'utf8')
    .max(100, 'utf8')
    .required()
    .messages({
      'string.base': 'Description must be a string',
      'string.empty': 'Description cannot be empty',
      'string.min': 'Description is too short. Minimum length is {#limit} characters',
      'string.max': 'Description is too long. Maximum length is {#limit} characters',
      'any.required': 'Description is required',
    }),

  quantity: Joi.number().default(1).messages({
    'number.base': 'Quantity must be a number',
  }),

  sold: Joi.number().default(0).messages({
    'number.base': 'Sold must be a number',
  }),

  price: Joi.number().required().messages({
    'number.base': 'Price must be a number',
    'any.required': 'Price is required',
  }),

  priceAfterDiscount: Joi.number().messages({
    'number.base': 'Price after discount must be a number',
  }),

}).options({ abortEarly: false });

module.exports = productValidationSchema;

const Joi = require('joi');

const brandValidationSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name cannot be empty',
    'any.required': 'Name is required',
  }),
}).options({ abortEarly: false });

module.exports = brandValidationSchema;

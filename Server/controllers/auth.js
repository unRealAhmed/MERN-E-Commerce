const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const crypto = require('crypto')
const User = require('../models/User')
const AppError = require('../utils/appErrors')
const Email = require('../utils/email')
const asyncHandler = require('../utils/asyncHandler')
const tokenGenerator = require('../utils/tokenGenerator')


const sendTokenResponse = (res, user, statusCode) => {

  const token = tokenGenerator(res, user._id);

  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

//SIGNUP
exports.signup = asyncHandler(async (req, res, next) => {
  // console.log(req.body);
  const { fullname, email, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists) {
    return next(new AppError('Email already exists', 400));
  }

  const newUser = await User.create({
    fullname,
    email,
    password,
  });

  newUser.password = undefined;

  const url = `${req.protocol}://${req.get('host')}/me`;
  const welcomeEmail = new Email(newUser, url);

  // Send welcome email asynchronously
  welcomeEmail.sendWelcomeEmail()
    .then(() => {
      sendTokenResponse(res, newUser, 201);
    })
    .catch((error) => {
      console.error('Error sending welcome email:', error);
      sendTokenResponse(res, newUser, 201);
    });
});
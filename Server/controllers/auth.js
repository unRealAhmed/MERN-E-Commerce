const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const crypto = require('crypto')
const User = require('../models/User')
const AppError = require('../utils/appErrors')
const Email = require('../utils/email')
const asyncHandler = require('../utils/asyncHandler')
const tokenGenerator = require('../utils/tokenGenerator')
const { resetHtmlTemplate } = require('../utils/resetPasswordTemplate')


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

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide valid email and password.', 400));
  }

  const user = await User.findOne({ email }).select('+password +active');

  if (!user) {
    return next(new AppError('Invalid email or password', 401));
  }

  const isPasswordCorrect = await user.passwordMatching(password, user.password);

  if (!isPasswordCorrect) {
    return next(new AppError('Invalid email or password', 401));
  }

  user.password = undefined;

  sendTokenResponse(res, user, 200);
});

exports.logout = (req, res) => {
  res.cookie("token", "loggedout", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: new Date(Date.now() + 5 * 1000), // Set the cookie to expire in 5 seconds
  });

  res.status(200).json({ status: "success", message: 'You have been logged out.' });
};

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token no longer exists.',
        401
      )
    );
  }

  const tokenIssuedAt = decoded.iat;

  if (currentUser.changedPasswordAfter(tokenIssuedAt)) {
    return next(
      new AppError('User recently changed the password! Please log in again.', 401)
    );
  }
  req.user = currentUser;
  next();
});

exports.forgetPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with this email address.', 404));
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
  const html = resetHtmlTemplate(
    req.protocol,
    req.headers.host,
    resetToken,
  );
  const email = new Email(user, resetURL);

  try {
    await email.sendPasswordResetEmail(html);

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email.',
    });
  } catch (err) {
    console.error(err);

    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    return next(
      new AppError('There was an error sending the email. Please try again later.', 503)
    );
  }
});

exports.resetPassword = asyncHandler(async (req, res, next) => {

  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(new AppError('Token is invalid or has expired. Please request a new password reset.', 400));
  }

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  user.password = undefined;

  sendTokenResponse(res, user, 200);
});

exports.restrictTo = (...permittedRoles) => (req, res, next) => {
  const userRole = req.user.role;

  if (permittedRoles.includes(userRole)) {
    next();
  } else {
    const errorMessage = `You don't have permission to perform this action.`;
    return res.status(403).json({ status: 'fail', message: errorMessage });
  }
};
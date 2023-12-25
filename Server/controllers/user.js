const User = require('../models/User')
const asyncHandler = require("../utils/asyncHandler")
const AppError = require("../utils/appErrors")
const tokenGenerator = require('../utils/tokenGenerator')

exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

  const users = await User.find({}, { password: 0, _id: 0 })
    .limit(limit * 1)
    .skip((page - 1) * limit)

  const count = await User.countDocuments();

  res.status(200).json({
    users,
    totalPages: Math.ceil(count / limit),
    currentPage: Number(page),
    count
  });
})

exports.getMe = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  const user = await User.findById(userId, { password: 0, passwordChangedAt: 0 });

  res.status(200).json({
    user
  });
});

exports.updateCurrentUser = asyncHandler(async (req, res, next) => {
  const { fullname } = req.body;

  if (!fullname) {
    return next(new AppError('fullname is required.', 400));
  }

  const userId = req.user._id;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { fullname },
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({
    user: updatedUser
  });
});

exports.updatePassword = asyncHandler(async (req, res, next) => {

  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return next(new AppError('Please provide both values', 400))
  }

  const user = await User.findById(req.user._id).select("+password");

  const isPasswordCorrect = await user.passwordMatching(
    oldPassword,
    user.password
  );

  if (!isPasswordCorrect) {
    return next(new AppError("Your current password is incorrect", 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  user.password = undefined;

  const token = tokenGenerator(res, user._id);

  res.status(200).json({
    status: "success",
    token,
    user,
  });
});
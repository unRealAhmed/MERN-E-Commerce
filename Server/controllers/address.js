const Address = require('../models/Address');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/appErrors');
const User = require('../models/User');


exports.createAddress = asyncHandler(async (req, res, next) => {
  const { address, city, state, country, zipCode } = req.body;

  if (!address || !city || !state || !country || !zipCode) {
    return next(new AppError('Incomplete address information. All fields are required.', 400));
  }

  const newAddress = await Address.create({
    address,
    city,
    state,
    country,
    zipCode,
    user: req.user.id,
  });

  const user = await User.findById(req.user.id);
  user.address.push(newAddress);
  await user.save();

  res.status(201).json({ success: true, address: newAddress });
});


exports.getAllAddresses = asyncHandler(async (req, res, next) => {
  const addresses = await Address.find({ user: req.user._id });
  res.status(200).json({ success: true, addresses });
});

exports.getSingleAddress = asyncHandler(async (req, res, next) => {
  const address = await Address.findById(req.params.id);

  if (!address) {
    return next(new AppError(`Address with ID ${req.params.id} not found`, 404));
  }

  res.status(200).json({ success: true, address });
});

exports.updateAddress = asyncHandler(async (req, res, next) => {
  const { address, city, state, country, zipCode } = req.body;

  if (!address || !city || !state || !country || !zipCode) {
    return next(new AppError('Incomplete address information. All fields are required.', 400));
  }

  const user = await User.findById(req.user.id);

  const updatedAddress = await Address.findOneAndUpdate(
    { _id: req.params.id, user: user._id },
    { address, city, state, country, zipCode },
    { new: true, runValidators: true }
  );

  if (!updatedAddress) {
    return next(new AppError(`Address with ID ${req.params.id} not found for the current user`, 404));
  }

  res.status(200).json({ success: true, address: updatedAddress });
});

exports.deleteAddress = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  const address = await Address.findOneAndDelete({
    _id: req.params.id,
    user: user._id,
  });

  if (!address) {
    return next(new AppError(`Address with ID ${req.params.id} not found for the current user`, 404));
  }

  res.status(200).json({ success: true, address });
});

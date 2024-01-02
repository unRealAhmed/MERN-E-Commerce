const Address = require('../models/Address');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/appErrors');

exports.createAddress = asyncHandler(async (req, res, next) => {
  const { address, city, state, country, zipCode } = req.body;

  if (!address || !city || !state || !country || !zipCode) {
    return next(new AppError('Incomplete address information. All fields are required.', 400));
  }

  const newAddress = await Address.create({ address, city, state, country, zipCode });

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

  const updatedAddress = await Address.findByIdAndUpdate(
    req.params.id,
    { address, city, state, country, zipCode },
    { new: true, runValidators: true }
  );

  if (!updatedAddress) {
    return next(new AppError(`Address with ID ${req.params.id} not found`, 404));
  }

  res.status(200).json({ success: true, address: updatedAddress });
});

exports.deleteAddress = asyncHandler(async (req, res, next) => {
  const address = await Address.findByIdAndDelete(req.params.id);

  if (!address) {
    return next(new AppError(`Address with ID ${req.params.id} not found`, 404));
  }

  res.status(200).json({ success: true, address });
});

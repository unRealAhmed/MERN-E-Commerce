const Merchant = require('../models/Merchant');
const User = require('../models/User');
const Brand = require('../models/Brand');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/appErrors');
const APIFeatures = require('../utils/apiFeatures');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');


const deactivateBrand = async (merchantId) => {
  const merchantDoc = await Merchant.findOne({ _id: merchantId }).populate(
    'brand',
    '_id'
  );

  if (!merchantDoc || !merchantDoc.brand) return;

  const brandId = merchantDoc.brand._id;
  const query = { _id: brandId };
  const update = {
    isActive: false
  };

  return await Brand.findOneAndUpdate(query, update, {
    new: true
  });
};

const createMerchantBrand = async ({ _id, brandName, business }) => {
  const newBrand = new Brand({
    name: brandName,
    description: business,
    merchant: _id,
    isActive: false
  });

  const brandDoc = await newBrand.save();

  const update = {
    brand: brandDoc._id
  };

  await Merchant.findOneAndUpdate({ _id }, update);
};

const createMerchantUser = async (email, name, merchant, host) => {
  const firstName = name;
  const lastName = '';

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const query = { _id: existingUser._id };
    const update = {
      merchant
    };

    const merchantDoc = await Merchant.findOne({
      email
    });

    await createMerchantBrand(merchantDoc);

    return await User.findOneAndUpdate(query, update, {
      new: true
    });
  } else {
    const buffer = await crypto.randomBytes(48);
    const resetToken = buffer.toString('hex');
    const resetPasswordToken = resetToken;

    const user = new User({
      email,
      firstName,
      lastName,
      resetPasswordToken,
      merchant
    });

    return await user.save();
  }
};

exports.addMerchant = asyncHandler(async (req, res) => {
  const { name, business, phoneNumber, email, brandName } = req.body;

  if (!name || !email || !business || !phoneNumber) {
    throw new AppError('Please provide all required information.', 400);
  }

  const existingMerchant = await Merchant.findOne({ email });

  if (existingMerchant) {
    throw new AppError('That email address is already in use.', 400);
  }

  const merchant = new Merchant({
    name,
    email,
    business,
    phoneNumber,
    brandName
  });

  const merchantDoc = await merchant.save();

  res.status(200).json({
    success: true,
    message: `We received your request! We will reach you on your phone number ${phoneNumber}!`,
    merchant: merchantDoc
  });
});

exports.searchMerchants = asyncHandler(async (req, res) => {
  const { search } = req.query;
  const regex = new RegExp(search, 'i');

  const merchants = await Merchant.find({
    $or: [
      { phoneNumber: { $regex: regex } },
      { email: { $regex: regex } },
      { name: { $regex: regex } },
      { brandName: { $regex: regex } },
      { status: { $regex: regex } }
    ]
  }).populate('brand', 'name');

  res.status(200).json({ merchants });
});

exports.getAllMerchants = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const apiFeatures = new APIFeatures(Merchant.find(), req.query)
    .paginate()
    .sort('-created');

  const merchants = await apiFeatures.query;
  const count = await Merchant.countDocuments();

  res.status(200).json({
    merchants,
    totalPages: Math.ceil(count / limit),
    currentPage: Number(page),
    count
  });
});

exports.disableMerchantAccount = asyncHandler(async (req, res) => {
  const merchantId = req.params.id;
  const update = req.body.merchant;
  const query = { _id: merchantId };

  const merchantDoc = await Merchant.findOneAndUpdate(query, update, {
    new: true
  });

  await deactivateBrand(merchantId);

  res.status(200).json({ success: true });
});

exports.approveMerchant = asyncHandler(async (req, res) => {
  const merchantId = req.params.id;
  const query = { _id: merchantId };
  const update = {
    status: 'Approved',
    isActive: true
  };

  const merchantDoc = await Merchant.findOneAndUpdate(query, update, {
    new: true
  });

  await createMerchantUser(
    merchantDoc.email,
    merchantDoc.name,
    merchantId,
    req.headers.host
  );

  res.status(200).json({ success: true });
});

exports.rejectMerchant = asyncHandler(async (req, res) => {
  const merchantId = req.params.id;

  const query = { _id: merchantId };
  const update = {
    status: 'Rejected'
  };

  await Merchant.findOneAndUpdate(query, update, {
    new: true
  });

  res.status(200).json({ success: true });
});

exports.signupMerchant = asyncHandler(async (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  if (!email || !firstName || !lastName || !password) {
    throw new AppError('Please provide all required information.', 400);
  }

  const userDoc = await User.findOne({
    email,
    resetPasswordToken: req.params.token
  });

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const query = { _id: userDoc._id };
  const update = {
    email,
    firstName,
    lastName,
    password: hash,
    resetPasswordToken: undefined
  };

  await User.findOneAndUpdate(query, update, {
    new: true
  });

  const merchantDoc = await Merchant.findOne({
    email
  });

  await createMerchantBrand(merchantDoc);

  res.status(200).json({ success: true });
});

exports.deleteMerchant = asyncHandler(async (req, res) => {
  const merchantId = req.params.id;

  await deactivateBrand(merchantId);

  const deletedMerchant = await Merchant.findByIdAndDelete(merchantId);

  if (!deletedMerchant) {
    throw new AppError('Merchant not found', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Merchant has been deleted successfully!',
    merchant: deletedMerchant
  });
});

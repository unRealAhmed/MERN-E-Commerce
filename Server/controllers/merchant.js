const User = require('../models/User');
const Brand = require('../models/Brand');
const Merchant = require('../models/Merchant');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/appErrors');

exports.signupMerchant = asyncHandler(async (req, res) => {
  const userEmail = req.user.email;
  const { business } = req.body;

  const user = await User.findOne({ email: userEmail });

  if (!user) {
    throw new AppError('User not found with the provided email.', 404);
  }

  if (user.merchant) {
    throw new AppError('User is already associated with a merchant.', 400);
  }

  const newMerchant = await Merchant.create({
    business,
    user: user.id
  });

  user.role = 'merchant';
  user.merchant = newMerchant._id;
  await user.save();

  newMerchant.password = undefined;

  res.status(201).json({ success: true, merchant: newMerchant, user });
});


exports.createMerchantBrand = asyncHandler(async (req, res) => {
  const { brandName } = req.body;

  const existingBrand = await Brand.findOne({ name: brandName });

  if (existingBrand) {
    throw new AppError('Brand name already exists.', 400);
  }

  const currentMerchant = await Merchant.findById(req.user.merchant);

  if (!currentMerchant) {
    throw new AppError('Merchant not found for the logged-in user.', 404);
  }

  if (currentMerchant.status !== 'Approved') {
    throw new AppError('Merchant is not approved and cannot create a brand.', 403);
  }

  const newBrand = await Brand.create({
    name: brandName,
    merchant: currentMerchant.id,
  });

  currentMerchant.brand = newBrand._id;
  currentMerchant.brandName = brandName;
  await currentMerchant.save();

  res.status(201).json({ success: true, brand: newBrand });
});

exports.getAllMerchant = asyncHandler(async (req, res) => {
  const merchants = await Merchant.find()
    .select('business brand brandName status user')
    .populate({
      path: 'brand',
      select: 'name logo',
    })
    .populate({
      path: 'user',
      select: 'email',
    });

  const formattedMerchants = merchants.map(merchant => ({
    business: merchant.business,
    name: merchant.brand.name,
    brandName: merchant.brandName,
    email: merchant.user[0].email,
    status: merchant.status,
  }));

  res.status(200).json({ success: true, count: formattedMerchants.length, merchants: formattedMerchants });
});


exports.approveMerchant = asyncHandler(async (req, res) => {
  const { merchantId } = req.params;

  if (!merchantId) {
    throw new AppError('Invalid merchant ID.', 400);
  }

  const merchant = await Merchant.findById(merchantId);

  if (!merchant) {
    throw new AppError('Merchant not found.', 404);
  }

  merchant.status = 'Approved';
  await merchant.save();

  res.status(200).json({ success: true, message: 'Merchant approved successfully.' });
});

exports.rejectMerchant = asyncHandler(async (req, res) => {
  const { merchantId } = req.params;

  if (!merchantId) {
    throw new AppError('Invalid merchant ID.', 400);
  }

  const merchant = await Merchant.findById(merchantId);

  if (!merchant) {
    throw new AppError('Merchant not found.', 404);
  }

  merchant.status = 'Rejected';
  await merchant.save();

  res.status(200).json({ success: true, message: 'Merchant rejected successfully.' });
});

exports.getMerchantsWaitingApproval = asyncHandler(async (req, res) => {
  const merchants = await Merchant.find({ status: 'Waiting_Approval' })
    .select('business brand brandName status user')
    .populate({
      path: 'brand',
      select: 'name logo',
    })
    .populate({
      path: 'user',
      select: 'email',
    });

  const formattedMerchants = merchants.map(merchant => ({
    business: merchant.business,
    name: merchant.brand.name,
    brandName: merchant.brandName,
    email: merchant.user[0].email,
    status: merchant.status,
  }));

  res.status(200).json({ success: true, count: formattedMerchants.length, merchants: formattedMerchants });
});

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

// exports.signupMerchant = asyncHandler(async (req, res) => {
//   const { email, firstName, lastName, password } = req.body;

//   if (!email || !firstName || !lastName || !password) {
//     throw new AppError('Please provide all required information.', 400);
//   }

//   const userDoc = await User.findOne({
//     email,
//     resetPasswordToken: req.params.token
//   });

//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash(password, salt);

//   const query = { _id: userDoc._id };
//   const update = {
//     email,
//     firstName,
//     lastName,
//     password: hash,
//     resetPasswordToken: undefined
//   };

//   await User.findOneAndUpdate(query, update, {
//     new: true
//   });

//   const merchantDoc = await Merchant.findOne({
//     email
//   });

//   await createMerchantBrand(merchantDoc);

//   res.status(200).json({ success: true });
// });

// exports.deleteMerchant = asyncHandler(async (req, res) => {
//   const merchantId = req.params.id;

//   await deactivateBrand(merchantId);

//   const deletedMerchant = await Merchant.findByIdAndDelete(merchantId);

//   if (!deletedMerchant) {
//     throw new AppError('Merchant not found', 404);
//   }

//   res.status(200).json({
//     success: true,
//     message: 'Merchant has been deleted successfully!',
//     merchant: deletedMerchant
//   });
// });

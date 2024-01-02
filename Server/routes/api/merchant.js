const express = require('express');
const { protect, restrictTo } = require('../../controllers/auth');
const {
  signupMerchant,
  createMerchantBrand,
  getAllMerchant,
  approveMerchant,
  rejectMerchant,
  getMerchantsWaitingApproval
} = require('../../controllers/merchant');

const router = express.Router();

router.use(protect);

router.post('/signup', restrictTo('user'), signupMerchant);
router.post('/add-brand', restrictTo('merchant'), createMerchantBrand);
router.get('/', restrictTo('admin'), getAllMerchant);
router.patch('/approve/:merchantId', restrictTo('admin'), approveMerchant);
router.patch('/reject/:merchantId', restrictTo('admin'), rejectMerchant);
router.get('/waiting-approval', restrictTo('admin'), getMerchantsWaitingApproval);

module.exports = router;

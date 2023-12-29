const express = require('express');
const { protect } = require('../../controllers/auth');
const {
  signupMerchant,
  addMerchant,
  searchMerchants,
  getAllMerchants,
  disableMerchantAccount,
  approveMerchant,
  rejectMerchant,
  deleteMerchant
} = require('../../controllers/merchant');

const router = express.Router();

router.post('/signup', signupMerchant);

router.use(protect);

router.post('/add', addMerchant);
router.get('/search', searchMerchants);
router.get('/all', getAllMerchants);
router.put('/disable/:id', disableMerchantAccount);
router.put('/approve/:id', approveMerchant);
router.put('/reject/:id', rejectMerchant);
router.delete('/delete/:id', deleteMerchant);

module.exports = router;

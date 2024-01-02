const mongoose = require('mongoose');

const merchantSchema = new mongoose.Schema({
  brandName: {
    type: String
  },
  business: {
    type: String,
    trim: true
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
    default: null
  },
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  status: {
    type: String,
    default: 'Waiting_Approval',
    enum: [
      'Waiting_Approval',
      'Rejected',
      'Approved'
    ]
  }
}, {
  timestamps: true
});

const Merchant = mongoose.model('Merchant', merchantSchema);

module.exports = Merchant

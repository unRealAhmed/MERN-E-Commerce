const mongoose = require('mongoose');

const merchantSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  brandName: {
    type: String
  },
  business: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: false
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
    default: null
  },
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

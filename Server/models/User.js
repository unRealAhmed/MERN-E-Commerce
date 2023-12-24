const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    phoneNumber: {
      type: String,
    },
    fullname: {
      type: String,
    },
    password: {
      type: String,
      select: false,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    role: {
      type: String,
      default: 'user',
      enum: ['admin', 'user', 'merchant'],
    },
    merchant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Merchant',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);

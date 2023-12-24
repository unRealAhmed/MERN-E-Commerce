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

userSchema.methods.passwordMatching = async function (enteredPassword, userPassword) {
  return await bcrypt.compare(enteredPassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (tokenIssuedAt) {
  if (this.passwordChangedAt) {
    const changedTimestamp = this.passwordChangedAt.getTime() / 1000;
    return tokenIssuedAt < changedTimestamp;
  }
  return false;
};

userSchema.methods.changedPasswordAfter = function (tokenIssuedAt) {
  if (this.passwordChangedAt) {
    const changedTimestamp = this.passwordChangedAt.getTime() / 1000;
    return tokenIssuedAt < changedTimestamp;
  }
  return false;
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);

    if (!this.isNew) this.passwordChangedAt = Date.now() - 1000;

    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User
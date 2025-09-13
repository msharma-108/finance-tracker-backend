const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  category: {
    type: String,
    required: true,
    enum: ['Food', 'Transportation', 'Entertainment', 'Bills', 'Shopping', 'Healthcare', 'Income', 'Other']
  },
  type: {
    type: String,
    required: true,
    enum: ['income', 'expense'],
    default: function() {
      return this.amount >= 0 ? 'income' : 'expense';
    }
  }
}, {
  timestamps: true
});


// Virtual for formatted amount
transactionSchema.virtual('formattedAmount').get(function() {
  return this.amount >= 0 ? `+$${this.amount.toFixed(2)}` : `-$${Math.abs(this.amount).toFixed(2)}`;
});

// Ensure virtual fields are serialized
transactionSchema.set('toJSON', {
  virtuals: true
});
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  transactions: [transactionSchema]  // embed transactions as subdocuments
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);


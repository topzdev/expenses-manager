const mongoose = require("mongoose");

const transactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Course name is required."],
  },
  type: {
    type: String,
    required: [true, "Type is required."],
  },
  income: {
    type: String,
    required: [true, "Description is required."],
  },
  amount: {
    type: Number,
    required: [true, "Amount is required."],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  userId: {
    type: String,
    required: [true, "User is required."],
  },
  createdOn: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Transaction", transactSchema);

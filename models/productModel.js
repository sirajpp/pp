const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    adminId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, "please enter product name"],
      trim: true,
      maxLength: [100, " Product name cannot exceed 100 characters"],
    },

    brands: {
      type: [String],
      default: [],
    },

    imageUrl: {
      type: String,
      required: [true, "Please add a photo for the product"],
    },
  },
  { timestamps: true }
);

let schema = mongoose.model("Product", productSchema);

module.exports = schema;

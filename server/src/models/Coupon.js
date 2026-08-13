import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'Please provide coupon code'],
      unique: true,
      trim: true,
      uppercase: true,
      maxLength: [15, 'Coupon code cannot exceed 15 characters']
    },
    discountType: {
      type: String,
      enum: ['PERCENTAGE', 'FIXED'],
      required: true
    },
    discountAmount: {
      type: Number,
      required: [true, 'Please provide discount amount']
    },
    minPurchase: {
      type: Number,
      default: 0
    },
    expiryDate: {
      type: Date,
      required: [true, 'Please provide expiry date']
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

// Pre-save to ensure code is uppercase
couponSchema.pre('save', function (next) {
  this.code = this.code.toUpperCase();
  next();
});

export default mongoose.model('Coupon', couponSchema);

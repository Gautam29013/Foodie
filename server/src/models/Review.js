import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    rating: {
      type: Number,
      required: [true, 'Please provide a rating'],
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: [true, 'Please provide review comment'],
      trim: true,
      maxLength: [500, 'Comment cannot exceed 500 characters']
    },
    isVerifiedPurchase: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// Prevent user from submitting more than one review per product
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

// Static method to calculate average rating and update Product model
reviewSchema.statics.calculateAverageRating = async function (productId) {
  const result = await this.aggregate([
    {
      $match: { product: productId }
    },
    {
      $group: {
        _id: '$product',
        averageRating: { $avg: '$rating' },
        numOfReviews: { $sum: 1 }
      }
    }
  ]);

  try {
    await mongoose.model('Product').findByIdAndUpdate(productId, {
      averageRating: result[0]?.averageRating || 0,
      numOfReviews: result[0]?.numOfReviews || 0
    });
  } catch (error) {
    console.error('Error updating average rating:', error);
  }
};

// Call calculateAverageRating after save and remove
reviewSchema.post('save', async function () {
  await this.constructor.calculateAverageRating(this.product);
});

reviewSchema.post('remove', async function () {
  await this.constructor.calculateAverageRating(this.product);
});

export default mongoose.model('Review', reviewSchema);

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide product name'],
      trim: true,
      maxLength: [100, 'Product name cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Please provide product description']
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    subcategory: {
      type: String,
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'Please provide product price'],
      default: 0
    },
    mrp: {
      type: Number,
      required: [true, 'Please provide product MRP (Original Price)']
    },
    discount: {
      type: Number,
      default: 0 // Percentage
    },
    weight: {
      type: Number,
      required: [true, 'Please provide weight/quantity value (e.g., 1)']
    },
    unit: {
      type: String,
      required: [true, 'Please provide unit (e.g., kg, g, L, piece, bunch)'],
      trim: true
    },
    stock: {
      type: Number,
      required: [true, 'Please provide stock quantity'],
      default: 0
    },
    sku: {
      type: String,
      unique: true,
      trim: true
    },
    brand: {
      type: String,
      trim: true
    },
    images: [
      {
        url: {
          type: String,
          required: true
        },
        public_id: {
          type: String, // Useful for deleting from Cloudinary later
          required: false
        }
      }
    ],
    averageRating: {
      type: Number,
      default: 0,
      min: [0, 'Rating must be at least 0'],
      max: [5, 'Rating cannot exceed 5']
    },
    numOfReviews: {
      type: Number,
      default: 0
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

// Calculate discount percentage before saving if not explicitly set
productSchema.pre('save', function (next) {
  if (this.mrp && this.price && this.isModified('price')) {
    if (this.mrp > this.price) {
      this.discount = Math.round(((this.mrp - this.price) / this.mrp) * 100);
    } else {
      this.discount = 0;
    }
  }
  next();
});

export default mongoose.model('Product', productSchema);

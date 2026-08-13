import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide category name'],
      trim: true,
      unique: true,
      maxLength: [50, 'Category name cannot exceed 50 characters']
    },
    slug: {
      type: String,
      unique: true,
      index: true
    },
    description: {
      type: String,
      maxLength: [200, 'Description cannot exceed 200 characters']
    },
    image: {
      type: String, // URL to cloudinary
      required: false
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

// Pre-save middleware to generate slug from name if not provided
categorySchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }
  next();
});

export default mongoose.model('Category', categorySchema);

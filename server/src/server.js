import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';

import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Route imports
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

// Connect to MongoDB
// You MUST place a valid MONGODB_URI in the .env file!
connectDB();

const app = express();

// Security and middleware
// Set security HTTP headers
app.use(helmet());

// Enable CORS
app.use(cors({ 
  origin: [process.env.CLIENT_URL, process.env.ADMIN_URL], 
  credentials: true 
}));

// Body parser
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp({
  whitelist: [
    'price',
    'averageRating',
    'category',
    'numOfReviews'
  ]
}));

// Rate limiting: Limit requests from same API
const limiter = rateLimit({
  max: 100, // 100 requests per windowMs
  windowMs: 15 * 60 * 1000, // 15 minutes
  message: 'Too many requests from this IP, please try again in 15 minutes!'
});
app.use('/api', limiter);

// Base Route
app.get('/', (req, res) => {
  res.send('FOODIE API is running...');
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

// Error Handling Middleware (must be after all routes)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
}

// Export for Vercel serverless functions
export default app;

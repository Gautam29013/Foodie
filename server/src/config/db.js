import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log the error but do NOT exit — the server can still serve
    // hardcoded admin login and other routes that don't need MongoDB.
    console.error(`MongoDB connection failed: ${error.message}`);
    console.warn('⚠️  Running in LIMITED mode (no DB). Hardcoded admin login still works.');
  }
};

export default connectDB;

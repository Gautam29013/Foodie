import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;
  
  // Read JWT from the 'jwt' cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Intercept mock admin
      if (decoded.userId === 'admin_mock_id') {
        req.user = {
          _id: 'admin_mock_id',
          name: 'System Admin',
          email: 'admin@foodie.com',
          role: 'ADMIN',
          twoFactorEnabled: false
        };
        return next();
      }
      
      // Intercept mock customer
      if (decoded.userId === 'mock_user_id_123') {
        req.user = {
          _id: 'mock_user_id_123',
          name: 'Demo User',
          email: 'user@foodie.com',
          role: 'CUSTOMER',
          twoFactorEnabled: false
        };
        return next();
      }

      req.user = await User.findById(decoded.userId).select('-password');
      if (!req.user) {
        res.status(401);
        throw new Error('Not authorized, user not found');
      }
      next();
    } catch (error) {
      res.status(401);
      next(new Error('Not authorized, token failed'));
    }
  } else {
    res.status(401);
    next(new Error('Not authorized, no token'));
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    res.status(403);
    next(new Error('Not authorized as an admin'));
  }
};

// src/middlewares/adminAuth.js
const jwt = require('jsonwebtoken');

const verifyAdmin = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    if (!decoded.isAdmin) { // Check if user is an admin
      return res.status(403).json({ error: 'Admin access required' });
    }
    req.user = decoded; // Attach decoded user information to the request
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(400).json({ error: 'Invalid token' });
  }
};

module.exports = verifyAdmin;

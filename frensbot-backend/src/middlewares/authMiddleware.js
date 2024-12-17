const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization'); // Expecting the token in the Authorization header

    // Check if token is provided
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info (from token) to the request object
        next(); // Pass control to the next middleware/route handler
    } catch (err) {
        console.error('Token verification failed:', err);
        res.status(401).json({ message: 'Token is invalid' });
    }
};

module.exports = authMiddleware;

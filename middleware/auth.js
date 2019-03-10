const jwt = require('jsonwebtoken');
const JWT_SECRET = 'mysecret';
const authMiddleware = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.status(401).json({ msg: 'Not Authenticated' });
    }
    // Header format is like Bearer <token>
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ msg: 'Not Authenticated' });
    }
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ msg: 'Not Authenticated' });
        }
        next();
    });
};

module.exports = authMiddleware;
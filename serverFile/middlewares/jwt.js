import jwt from 'jsonwebtoken';
const JWT_SECRET = 'your-secret-key';
// Middleware to check user role
export const checkRole = (requiredRole) => (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Authorization token missing' });
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.role !== requiredRole) {
            return res.status(403).json({ message: 'Insufficient permissions' });
        }
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};


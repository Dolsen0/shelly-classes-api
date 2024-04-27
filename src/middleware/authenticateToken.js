import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: "Unauthorized" });
    
    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ message: "Invalid token format" });
    }
    
    const jwtToken = tokenParts[1];

    jwt.verify(jwtToken, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: "Token expired" });
            } else if (err.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: "Invalid token" });
            } else {
                return res.status(403).json({ message: "Forbidden" });
            }
        }
    
        req.user = user;
        next();
    });
}

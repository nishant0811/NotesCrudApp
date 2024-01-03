const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) return res.status(401).json({ message: 'You are not logged in' });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Token is not valid' });
        req.body.userId = decoded.userId;
        next();
    });
};

module.exports = {
    verifyToken
}
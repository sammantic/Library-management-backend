const jwt = require("jsonwebtoken");

// Verify token
function verifyToken(req, res, next) {
    const token = req.headers.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decoded
            next()
        } catch {
            res.status(401).json({ message: "Invalid token" });
        }
    } else {
        res.status(401).json({ message: "No token provided" });
    }
}

// Verify token and admin
function verifyTokenAndAuthorization(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({ message: "You are not allowed" });
        }
    });
}

function verifyTokenAndAuthorizationAdmin(req, res, next) {
    if (req.user.isAdmin) {
        next()
    } else {
        res.status(403).json({ message: "You are not allowed, only admin" });
    }
}
module.exports = {
    verifyToken,
}
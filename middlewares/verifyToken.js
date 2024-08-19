const jwt = require("jsonwebtoken");

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

module.exports = {
    verifyToken,
}
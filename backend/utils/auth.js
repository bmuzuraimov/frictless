const jwt = require("jsonwebtoken");
const { AuthorizationError } = require("./error_handler");

// Function to generate a JWT token
const generateToken = function(user, scope = "user") {
    const payload = {
        ...user,
        scope: scope,
    };
    return jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: 86400, // Token expires in 24 hours
    });
};

// Generic function to verify token and check scope
const verifyScope = (expectedScope) => (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader) {
        throw new AuthorizationError('Unauthorized: No token provided');
    }
    const token = bearerHeader.split(' ')[1];
    // console.log(token);
    // console.log(process.env.TOKEN_SECRET);
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            throw new AuthorizationError('Unauthorized: Token is invalid');
        }
        if (decoded.scope !== expectedScope) {
            throw new AuthorizationError(`Unauthorized: ${expectedScope} role required`);
        }
        req.user = decoded; // Attach the decoded token to the request
        next();
    });
};

// Middleware for different roles
const isUser = verifyScope("user");
const isAdmin = verifyScope("admin");
const isMentor = verifyScope("mentor");
const isMentee = verifyScope("mentee");

module.exports = { generateToken, isUser, isAdmin, isMentor, isMentee };
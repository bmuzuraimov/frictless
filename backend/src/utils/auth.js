const jwt = require('jsonwebtoken');
const { AuthorizationError } = require('./error_handler');

// generate a token
const generateToken = function (user) {
    return jwt.sign(user, process.env.TOKEN_SECRET, {
        expiresIn: 86400 // expires in 24 hours
    });
}

const isMentor = function (req, res, next) {
    if (req.authInfo.scope !== 'mentor') {
        throw new AuthorizationError("Unauthorized: mentor role required");
    }
    next();
};

const isMentee = function (req, res, next) {
    if (req.authInfo.scope !== 'mentee') {
        throw new AuthorizationError("Unauthorized: mentee role required");
    }
    next();
};

const isAdmin = function (req, res, next) {
    if (req.authInfo.scope !== 'admin') {
        throw new AuthorizationError("Unauthorized: Admin role required");
    }
    next();
};

module.exports = { generateToken, isAdmin, isMentor, isMentee };
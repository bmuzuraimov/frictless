const util = require('util');

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.success = false;
        this.name = 'ValidationError';
        this.statusCode = 400;
    }
}

class AuthenticationError extends Error {
    constructor(message) {
        super(message);
        this.success = false;
        this.name = 'AuthenticationError';
        this.statusCode = 401;
    }
}

class AuthorizationError extends Error {
    constructor(message) {
        super(message);
        this.success = false;
        this.name = 'AuthorizationError';
        this.statusCode = 403;
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.success = false;
        this.name = 'NotFoundError';
        this.statusCode = 404;
    }
}

class DatabaseError extends Error {
    constructor(message) {
        super(message);
        this.success = false;
        this.name = 'DatabaseError';
        this.statusCode = 405;
    }
}

class InternalServerError extends Error {
    constructor(message = 'Internal Server Error') {
        super(message);
        this.success = false;
        this.name = 'InternalServerError';
        this.statusCode = 500;
    }
}

const asyncHandler = (fn) => (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(err => {
        if (err instanceof ValidationError) {
            res.status(err.statusCode).json({ success: err.success, message: err.message });
        } else if (err instanceof AuthenticationError) {
            res.status(err.statusCode).json({ success: err.success, message: err.message });
        } else if (err instanceof AuthorizationError) {
            res.status(err.statusCode).json({ success: err.success, message: err.message });
        } else if (err instanceof DatabaseError) {
            res.status(err.statusCode).json({ success: err.success, message: err.message });
        } else if (err instanceof NotFoundError) {
            res.status(err.statusCode).json({ success: err.success, message: err.message });
        } else if (err instanceof InternalServerError) {
            res.status(err.statusCode).json({ success: err.success, message: err.message });
        } else {
            console.error(util.inspect(err, { showHidden: false, depth: null }));
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};

module.exports = {
    ValidationError,
    AuthenticationError,
    AuthorizationError,
    DatabaseError,
    NotFoundError,
    InternalServerError,
    asyncHandler
};
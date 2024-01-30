class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
        this.statusCode = 400;
    }
}

class AuthenticationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AuthenticationError';
        this.statusCode = 401;
    }
}

class AuthorizationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AuthorizationError';
        this.statusCode = 403;
    }
}

class DatabaseError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DatabaseError';
        this.statusCode = 500;
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = 404;
    }
}

class InternalServerError extends Error {
    constructor(message = 'Internal Server Error') {
        super(message);
        this.name = 'InternalServerError';
        this.statusCode = 500;
    }
}

const asyncHandler = (fn) => (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(err => {
        if (err instanceof ValidationError) {
            res.status(err.statusCode).json({ message: err.message });
        } else if (err instanceof AuthenticationError) {
            res.status(err.statusCode).json({ message: err.message });
        } else if (err instanceof AuthorizationError) {
            res.status(err.statusCode).json({ message: err.message });
        } else if (err instanceof DatabaseError) {
            res.status(err.statusCode).json({ message: err.message });
        } else if (err instanceof NotFoundError) {
            res.status(err.statusCode).json({ message: err.message });
        } else if (err instanceof InternalServerError) {
            res.status(err.statusCode).json({ message: err.message });
        } else {
            // For unhandled errors
            console.error(err);
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
class JsonWebTokenError extends Error {
    constructor(message) {
        super(message);
        this.name = 'JsonWebTokenError';
    }
}

module.exports = JsonWebTokenError;
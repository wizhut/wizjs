

class BadlyInitializedError extends Error {
    constructor(message, ...args) {
        super(message);
    }
}


module.exports = {
    BadlyInitializedError
};
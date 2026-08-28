const singleton = require('./src/lang/singleton.js');
const checks = require('./src/lang/checks.js');
const numbers = require('./src/math/numbers.js');
const functools = require('./src/lang/functools.js');
const arrays = require('./src/lang/arrays.js');
const files = require('./src/io/files.js');
const flow = require('./src/lang/flow.js');
const itertools = require('./src/lang/itertools.js');
const objects = require('./src/lang/objects.js');
const collections = require('./src/lang/collections.js');

const { BadlyInitializedError } = require('./src/internal/exceptions.js');


module.exports = {
    io: {
        files: files,
    },
    lang: {
        arrays: arrays,
        singleton: singleton,
        flow: flow,
        checks: checks,
        functools: functools,
        itertools: itertools,
        objects: objects,
        collections: collections
    },
    math: {
        numbers: numbers
    },
    exceptions: {
        BadlyInitializedError
    }
}
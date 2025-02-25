const singleton = require('./src/lang/singleton.js');
const checks = require('./src/lang/checks.js');
const numbers = require('./src/math/numbers.js');
const functools = require('./src/lang/functools.js');
const arrays = require('./src/lang/arrays.js');
const files = require('./src/io/files.js');


module.exports = {
    io: {
        files: files,
    },
    lang: {
        arrays: arrays,
        singleton: singleton,
        checks: checks,
        functools: functools
    },
    math: {
        numbers: numbers
    }
}
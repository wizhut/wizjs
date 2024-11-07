const singleton = require('./src/lang/singleton.js');
const checks = require('./src/lang/checks.js');
const numbers = require('./src/math/numbers.js');


module.exports = {
    lang: {
        singleton: singleton,
        checks: checks
    },
    math: {
        numbers: numbers
    }
}
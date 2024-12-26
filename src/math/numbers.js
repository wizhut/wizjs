const { isNil } = require('../lang/checks.js');


function toInteger(num) {
    if (isNil(num)) {
        return 0;
    }

    try {
        return parseInt(num, 10);
    } catch (e) {
        return 0;
    }
}


module.exports = {
    toInteger
}
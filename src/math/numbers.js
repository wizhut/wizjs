const { isNil } = require('../lang/checks.js');


function toInteger(num) {
    if (isNil(num)) {
        return 0;
    }

    try {
        const r = parseInt(num, 10);

        if (isNaN(r)) {
            return 0;
        }

        return r;
    } catch (e) {
        return 0;
    }
}


module.exports = {
    toInteger
}
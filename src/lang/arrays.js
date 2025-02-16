const { isNil } = require('./checks.js');


function compact(arr) {
    if (isNil(arr)) {
        return [];
    }

    const result = [];

    for (let i = 0; i < arr.length; i++) {
        if (isNil(arr[i])) {
            continue;
        }

        result.push(arr[i]);
    }

    return result;
}


module.exports = {
    compact
}
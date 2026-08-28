const { isNil, isArray } = require('./checks.js');
const { toInteger } = require('../math/numbers.js');


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

class Operator {
    static plus = (a, b) => a + b;
    static minus = (a, b) => a - b;
    static multiply = (a, b) => a * b;
    static divide = (a, b) => a / b;

    static apply(op, a, b) {
        return op(a, b);
    }
}


function accumulate(arr, operator, initial=0) {
    let accumulator = initial;

    for (let i = 0; i < arr.length; i++) {
        accumulator = Operator.apply(operator, accumulator, arr[i]);
    }

    return accumulator;
}


function unique(arr) {
    if (isNil(arr)) {
        return [];
    }

    const seen = new Set();
    const result = [];

    for (let i = 0; i < arr.length; i++) {
        const value = arr[i];

        if (seen.has(value)) {
            continue;
        }

        seen.add(value);
        result.push(value);
    }

    return result;
}


function chunk(arr, size) {
    if (isNil(arr)) {
        return [];
    }

    const n = toInteger(size);

    if (n < 1) {
        return [];
    }

    const result = [];

    for (let i = 0; i < arr.length; i += n) {
        result.push(Array.prototype.slice.call(arr, i, i + n));
    }

    return result;
}


function flatten(arr) {
    if (isNil(arr)) {
        return [];
    }

    const result = [];

    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];

        if (isArray(item)) {
            for (let j = 0; j < item.length; j++) {
                result.push(item[j]);
            }
        } else {
            result.push(item);
        }
    }

    return result;
}


module.exports = {
    compact,
    accumulate,
    Operator,
    unique,
    chunk,
    flatten
}

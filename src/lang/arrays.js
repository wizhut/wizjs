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


module.exports = {
    compact,
    accumulate,
    Operator
}
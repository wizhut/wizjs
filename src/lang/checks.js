
function isNil(value) {
    return value === null || value === undefined;
}

function isArray(value) {
    return Array.isArray(value);
}

function isObject(value) {
    if (isNil(value)) {
        return false;
    }

    if (isArray(value)) {
        return false;
    }

    return typeof value === 'object';
}


function isString(value) {
    return typeof value === 'string';
}


function isNumber(value) {
    return typeof value === 'number';
}


function isBoolean(value) {
    return typeof value === 'boolean';
}


function isFunction(value) {
    return typeof value === 'function';
}


function isInteger(value) {
    return Number.isInteger(value);
}


function isEmpty(value) {
    if (isNil(value)) {
        return true;
    }

    if (isString(value) || isArray(value)) {
        return value.length === 0;
    }

    if (value instanceof Map || value instanceof Set) {
        return value.size === 0;
    }

    if (isObject(value)) {
        return Object.keys(value).length === 0;
    }

    return false;
}


module.exports = {
    isNil,
    isArray,
    isObject,
    isString,
    isNumber,
    isBoolean,
    isFunction,
    isInteger,
    isEmpty
}


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


module.exports = {
    isNil,
    isArray,
    isObject,
    isString,
    isNumber
}
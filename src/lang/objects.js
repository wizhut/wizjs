const { isNil, isArray, isString } = require('./checks.js');


const UNSAFE_KEYS = new Set(['__proto__', 'prototype', 'constructor']);


function toKeyList(keys) {
    if (isArray(keys)) {
        return keys;
    }

    return [keys];
}


function pathKeys(path) {
    if (isArray(path)) {
        return path;
    }

    if (isString(path)) {
        if (path.length === 0) {
            return [];
        }

        return path.split('.');
    }

    return [path];
}


function assignOwn(target, key, value) {
    if (UNSAFE_KEYS.has(String(key))) {
        Object.defineProperty(target, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
        return;
    }

    target[key] = value;
}


function pick(obj, keys) {
    if (isNil(obj) || (typeof obj !== 'object' && typeof obj !== 'function')) {
        return {};
    }

    const result = {};
    const list = toKeyList(keys);

    for (let i = 0; i < list.length; i++) {
        const key = list[i];

        if (key in obj) {
            assignOwn(result, key, obj[key]);
        }
    }

    return result;
}


function omit(obj, keys) {
    if (isNil(obj) || (typeof obj !== 'object' && typeof obj !== 'function')) {
        return {};
    }

    const exclude = new Set();
    const list = toKeyList(keys);

    for (let i = 0; i < list.length; i++) {
        exclude.add(String(list[i]));
    }

    const result = {};
    const ownKeys = Object.keys(obj);

    for (let i = 0; i < ownKeys.length; i++) {
        const key = ownKeys[i];

        if (!exclude.has(key)) {
            assignOwn(result, key, obj[key]);
        }
    }

    return result;
}


function get(obj, path, defaultValue) {
    if (isNil(obj)) {
        return defaultValue;
    }

    const keys = pathKeys(path);
    let current = obj;

    for (let i = 0; i < keys.length; i++) {
        if (isNil(current) || (typeof current !== 'object' && typeof current !== 'function')) {
            return defaultValue;
        }

        current = current[keys[i]];
    }

    if (current === undefined) {
        return defaultValue;
    }

    return current;
}


module.exports = {
    pick,
    omit,
    get
};

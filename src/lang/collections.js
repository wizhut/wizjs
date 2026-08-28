const { isNil, isObject, isFunction } = require('./checks.js');
const { toInteger } = require('../math/numbers.js');


class Counter {
    constructor(source) {
        this._map = new Map();

        if (isNil(source)) {
            return;
        }

        if (source instanceof Counter) {
            for (const [item, n] of source.entries()) {
                this._map.set(item, n);
            }
            return;
        }

        if (source instanceof Map) {
            for (const [item, n] of source) {
                this.add(item, n);
            }
            return;
        }

        if (typeof source[Symbol.iterator] === 'function') {
            for (const item of source) {
                this.add(item, 1);
            }
            return;
        }

        if (isObject(source)) {
            const keys = Object.keys(source);

            for (let i = 0; i < keys.length; i++) {
                this.add(keys[i], source[keys[i]]);
            }
        }
    }

    add(item, n) {
        const delta = n === undefined ? 1 : Number(n);
        const next = (this._map.has(item) ? this._map.get(item) : 0) + delta;
        this._map.set(item, next);
        return next;
    }

    get(item) {
        if (!this._map.has(item)) {
            return 0;
        }

        return this._map.get(item);
    }

    set(item, n) {
        this._map.set(item, Number(n));
        return this;
    }

    delete(item) {
        return this._map.delete(item);
    }

    mostCommon(n) {
        const entries = [];

        for (const pair of this._map.entries()) {
            entries.push(pair);
        }

        entries.sort((a, b) => b[1] - a[1]);

        if (n === undefined || n === null) {
            return entries;
        }

        const count = toInteger(n);

        if (count < 1) {
            return [];
        }

        return entries.slice(0, count);
    }

    total() {
        let sum = 0;

        for (const v of this._map.values()) {
            sum += v;
        }

        return sum;
    }

    get size() {
        return this._map.size;
    }

    entries() {
        return this._map.entries();
    }

    keys() {
        return this._map.keys();
    }

    values() {
        return this._map.values();
    }

    *elements() {
        for (const [item, count] of this._map) {
            const times = count > 0 ? toInteger(count) : 0;

            for (let i = 0; i < times; i++) {
                yield item;
            }
        }
    }

    [Symbol.iterator]() {
        return this._map.keys();
    }
}


class DefaultDict {
    constructor(factory) {
        this._factory = isFunction(factory) ? factory : null;
        this._data = new Map();
    }

    get(key) {
        if (!this._data.has(key)) {
            if (this._factory === null) {
                return undefined;
            }

            this._data.set(key, this._factory());
        }

        return this._data.get(key);
    }

    peek(key, defaultValue) {
        if (!this._data.has(key)) {
            return defaultValue;
        }

        return this._data.get(key);
    }

    set(key, value) {
        this._data.set(key, value);
        return this;
    }

    has(key) {
        return this._data.has(key);
    }

    delete(key) {
        return this._data.delete(key);
    }

    get size() {
        return this._data.size;
    }

    entries() {
        return this._data.entries();
    }

    keys() {
        return this._data.keys();
    }

    values() {
        return this._data.values();
    }
}


module.exports = {
    Counter,
    DefaultDict
};

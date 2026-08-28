
const { isNil, isFunction } = require('./checks.js');


function reflexive(arg) {
    return arg;
}


function partial(fn, ...preset) {
    return function partiallyApplied(...rest) {
        return fn.apply(this, preset.concat(rest));
    };
}


function compose(...fns) {
    if (fns.length === 0) {
        return reflexive;
    }

    return function composed(...args) {
        let result = fns[fns.length - 1].apply(this, args);

        for (let i = fns.length - 2; i >= 0; i--) {
            result = fns[i].call(this, result);
        }

        return result;
    };
}


function once(fn) {
    let called = false;
    let result;

    return function onceWrapped(...args) {
        if (called) {
            return result;
        }

        called = true;
        result = fn.apply(this, args);
        return result;
    };
}


const MEMO_RESULT = Symbol('memoize.result');


function memoize(fn, resolver) {
    const cache = new Map();

    const memoized = function memoized(...args) {
        if (resolver) {
            const key = resolver.apply(this, args);

            if (cache.has(key)) {
                return cache.get(key);
            }

            const result = fn.apply(this, args);
            cache.set(key, result);
            return result;
        }

        let node = cache;

        for (let i = 0; i < args.length; i++) {
            const arg = args[i];

            if (!node.has(arg)) {
                node.set(arg, new Map());
            }

            node = node.get(arg);
        }

        if (node.has(MEMO_RESULT)) {
            return node.get(MEMO_RESULT);
        }

        const result = fn.apply(this, args);
        node.set(MEMO_RESULT, result);
        return result;
    };

    memoized.cache = cache;
    return memoized;
}


function reduce(fn, iterable, initializer) {
    if (!isFunction(fn) || isNil(iterable) || typeof iterable[Symbol.iterator] !== 'function') {
        if (arguments.length >= 3) {
            return initializer;
        }

        throw new TypeError('reduce() of empty iterable with no initial value');
    }

    const iterator = iterable[Symbol.iterator]();
    let acc;
    let started = arguments.length >= 3;

    if (started) {
        acc = initializer;
    }

    while (true) {
        const next = iterator.next();

        if (next.done) {
            break;
        }

        if (!started) {
            acc = next.value;
            started = true;
        } else {
            acc = fn(acc, next.value);
        }
    }

    if (!started) {
        throw new TypeError('reduce() of empty iterable with no initial value');
    }

    return acc;
}


module.exports = {
    reflexive,
    partial,
    compose,
    once,
    memoize,
    cache: memoize,
    reduce
}

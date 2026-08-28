const { toInteger } = require('../math/numbers.js');
const { isNil, isObject, isFunction } = require('./checks.js');


function* count(start=0, step=1) {
    let iCount = toInteger(start);

    while (true) {
        yield iCount;
        iCount += step;
    }
}

function *repeat(arg, times=0) {
    let iTimes = toInteger(times);

    if (iTimes < 0) {
        iTimes = 0;
    }

    if (iTimes === 0) {
        while (true) {
            yield arg;
        }
    }

    for (let i = 0; i < iTimes; i++) {
        yield arg;
    }
}


function* cycle(iterable) {
    if (isNil(iterable)) {
        return;
    }

    const saved = [];

    for (const item of iterable) {
        yield item;
        saved.push(item);
    }

    if (saved.length === 0) {
        return;
    }

    let i = 0;

    while (true) {
        yield saved[i];
        i += 1;

        if (i === saved.length) {
            i = 0;
        }
    }
}


function* chain(...iterables) {
    for (let i = 0; i < iterables.length; i++) {
        const iterable = iterables[i];

        if (isNil(iterable)) {
            continue;
        }

        yield* iterable;
    }
}


function take(n, iterable) {
    const countN = toInteger(n);
    const result = [];

    if (countN <= 0 || isNil(iterable)) {
        return result;
    }

    let taken = 0;

    for (const item of iterable) {
        result.push(item);
        taken += 1;

        if (taken >= countN) {
            break;
        }
    }

    return result;
}


function* zip(...iterables) {
    if (iterables.length === 0) {
        return;
    }

    const iterators = [];

    for (let i = 0; i < iterables.length; i++) {
        const iterable = iterables[i];

        if (isNil(iterable) || typeof iterable[Symbol.iterator] !== 'function') {
            return;
        }

        iterators.push(iterable[Symbol.iterator]());
    }

    while (true) {
        const row = [];

        for (let i = 0; i < iterators.length; i++) {
            const next = iterators[i].next();

            if (next.done) {
                return;
            }

            row.push(next.value);
        }

        yield row;
    }
}


function* range(start, stop, step) {
    let begin;
    let end;
    let stride;

    if (stop === undefined) {
        begin = 0;
        end = Number(start);
        stride = 1;
    } else {
        begin = Number(start);
        end = Number(stop);
        stride = step === undefined ? 1 : Number(step);
    }

    if (!Number.isFinite(begin) || !Number.isFinite(end) || !Number.isFinite(stride) || stride === 0) {
        return;
    }

    if (stride > 0) {
        for (let i = 0; begin + i * stride < end; i++) {
            yield begin + i * stride;
        }
    } else {
        for (let i = 0; begin + i * stride > end; i++) {
            yield begin + i * stride;
        }
    }
}


function* enumerate(iterable, start=0) {
    if (isNil(iterable)) {
        return;
    }

    let i = toInteger(start);

    for (const value of iterable) {
        yield [i, value];
        i += 1;
    }
}


function sameValueZero(a, b) {
    return a === b || (a !== a && b !== b);
}


function* islice(iterable, start, stop, step) {
    if (isNil(iterable)) {
        return;
    }

    let begin;
    let end;
    let stride;

    if (stop === undefined && step === undefined) {
        begin = 0;
        end = start;
        stride = 1;
    } else {
        begin = isNil(start) ? 0 : toInteger(start);
        end = stop;
        stride = step === undefined || isNil(step) ? 1 : toInteger(step);
    }

    if (stride < 1) {
        return;
    }

    const hasEnd = !(end === null || end === undefined);
    const stopAt = hasEnd ? toInteger(end) : Infinity;
    const skip = toInteger(begin);

    if (hasEnd && stopAt <= skip) {
        return;
    }

    let i = 0;
    let nextIndex = skip;

    for (const item of iterable) {
        if (hasEnd && i >= stopAt) {
            return;
        }

        if (i === nextIndex) {
            yield item;
            nextIndex += stride;
        }

        i += 1;
    }
}


function* takewhile(predicate, iterable) {
    if (isNil(iterable) || !isFunction(predicate)) {
        return;
    }

    for (const item of iterable) {
        if (!predicate(item)) {
            return;
        }

        yield item;
    }
}


function* dropwhile(predicate, iterable) {
    if (isNil(iterable) || !isFunction(predicate)) {
        return;
    }

    let dropping = true;

    for (const item of iterable) {
        if (dropping && predicate(item)) {
            continue;
        }

        dropping = false;
        yield item;
    }
}


function* filterfalse(predicate, iterable) {
    if (isNil(iterable) || !isFunction(predicate)) {
        return;
    }

    for (const item of iterable) {
        if (!predicate(item)) {
            yield item;
        }
    }
}


function* zip_longest(...args) {
    let fillvalue;
    let iterables = args;

    if (args.length > 0) {
        const last = args[args.length - 1];

        if (isObject(last) && typeof last[Symbol.iterator] !== 'function' && Object.prototype.hasOwnProperty.call(last, 'fillvalue')) {
            fillvalue = last.fillvalue;
            iterables = args.slice(0, -1);
        }
    }

    if (iterables.length === 0) {
        return;
    }

    const iterators = [];

    for (let i = 0; i < iterables.length; i++) {
        const iterable = iterables[i];

        if (isNil(iterable) || typeof iterable[Symbol.iterator] !== 'function') {
            return;
        }

        iterators.push(iterable[Symbol.iterator]());
    }

    while (true) {
        const row = [];
        let anyAlive = false;

        for (let i = 0; i < iterators.length; i++) {
            if (iterators[i] === null) {
                row.push(fillvalue);
                continue;
            }

            const next = iterators[i].next();

            if (next.done) {
                iterators[i] = null;
                row.push(fillvalue);
            } else {
                anyAlive = true;
                row.push(next.value);
            }
        }

        if (!anyAlive) {
            return;
        }

        yield row;
    }
}


function* product(...iterables) {
    const pools = [];

    for (let i = 0; i < iterables.length; i++) {
        const iterable = iterables[i];

        if (isNil(iterable) || typeof iterable[Symbol.iterator] !== 'function') {
            return;
        }

        pools.push([...iterable]);
    }

    if (pools.length === 0) {
        yield [];
        return;
    }

    for (let i = 0; i < pools.length; i++) {
        if (pools[i].length === 0) {
            return;
        }
    }

    const lengths = [];
    const idx = [];

    for (let i = 0; i < pools.length; i++) {
        lengths.push(pools[i].length);
        idx.push(0);
    }

    while (true) {
        const row = [];

        for (let i = 0; i < pools.length; i++) {
            row.push(pools[i][idx[i]]);
        }

        yield row;

        let k = pools.length - 1;

        while (k >= 0) {
            idx[k] += 1;

            if (idx[k] < lengths[k]) {
                break;
            }

            idx[k] = 0;
            k -= 1;
        }

        if (k < 0) {
            return;
        }
    }
}


function* groupby(iterable, keyFn) {
    if (isNil(iterable)) {
        return;
    }

    const keyer = isFunction(keyFn) ? keyFn : (x) => x;
    let started = false;
    let currentKey;
    let currentGroup = [];

    for (const item of iterable) {
        const k = keyer(item);

        if (!started) {
            started = true;
            currentKey = k;
            currentGroup.push(item);
            continue;
        }

        if (sameValueZero(k, currentKey)) {
            currentGroup.push(item);
        } else {
            yield [currentKey, currentGroup];
            currentKey = k;
            currentGroup = [item];
        }
    }

    if (started) {
        yield [currentKey, currentGroup];
    }
}


function* starmap(fn, iterable) {
    if (!isFunction(fn) || isNil(iterable)) {
        return;
    }

    for (const args of iterable) {
        yield fn.apply(undefined, args);
    }
}


function* batched(iterable, n) {
    if (isNil(iterable)) {
        return;
    }

    const size = toInteger(n);

    if (size < 1) {
        return;
    }

    let batch = [];

    for (const item of iterable) {
        batch.push(item);

        if (batch.length === size) {
            yield batch;
            batch = [];
        }
    }

    if (batch.length > 0) {
        yield batch;
    }
}


function* pairwise(iterable) {
    if (isNil(iterable) || typeof iterable[Symbol.iterator] !== 'function') {
        return;
    }

    const it = iterable[Symbol.iterator]();
    const first = it.next();

    if (first.done) {
        return;
    }

    let prev = first.value;

    while (true) {
        const next = it.next();

        if (next.done) {
            return;
        }

        yield [prev, next.value];
        prev = next.value;
    }
}


function* compress(data, selectors) {
    if (isNil(data) || isNil(selectors) || typeof selectors[Symbol.iterator] !== 'function') {
        return;
    }

    const sel = selectors[Symbol.iterator]();

    for (const item of data) {
        const s = sel.next();

        if (s.done) {
            return;
        }

        if (s.value) {
            yield item;
        }
    }
}


module.exports = {
    count,
    repeat,
    cycle,
    chain,
    take,
    zip,
    range,
    enumerate,
    islice,
    takewhile,
    dropwhile,
    filterfalse,
    zip_longest,
    product,
    groupby,
    starmap,
    batched,
    pairwise,
    compress
};

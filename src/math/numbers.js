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


function toNumber(num) {
    if (isNil(num)) {
        return 0;
    }

    try {
        const r = parseFloat(num);

        if (isNaN(r)) {
            return 0;
        }

        return r;
    } catch (e) {
        return 0;
    }
}


function clamp(value, min, max) {
    const n = Number(value);
    let lo = Number(min);
    let hi = Number(max);

    if (lo > hi) {
        const tmp = lo;
        lo = hi;
        hi = tmp;
    }

    if (n < lo) {
        return lo;
    }

    if (n > hi) {
        return hi;
    }

    return n;
}


function mod(n, m) {
    const a = Number(n);
    const b = Number(m);

    if (!Number.isFinite(a) || !Number.isFinite(b) || b === 0) {
        return 0;
    }

    return a - b * Math.floor(a / b);
}


module.exports = {
    toInteger,
    toNumber,
    clamp,
    mod
}

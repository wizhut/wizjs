const t = require('tap');

const { toInteger, toNumber, clamp, mod } = require('../src/math/numbers.js');


t.test('numbers/toInteger', (t) => {
    t.equal(toInteger(null), 0);
    t.equal(toInteger(undefined), 0);
    t.equal(toInteger(1.0), 1);
    t.equal(toInteger('1'), 1);
    t.equal(toInteger(1), 1);
    t.equal(toInteger('abcde'), 0);
    // parseInt throws on a Symbol; toInteger must swallow it and return 0
    t.equal(toInteger(Symbol('x')), 0);
    t.end();
});


t.test('numbers/toNumber', (t) => {
    t.equal(toNumber(null), 0);
    t.equal(toNumber(undefined), 0);
    t.equal(toNumber(1.5), 1.5);
    t.equal(toNumber('1.5'), 1.5);
    t.equal(toNumber('1.5abc'), 1.5);
    t.equal(toNumber(1), 1);
    t.equal(toNumber('abcde'), 0);
    t.equal(toNumber(Symbol('x')), 0);
    t.end();
});


t.test('numbers/clamp', (t) => {
    t.equal(clamp(5, 0, 10), 5);
    t.equal(clamp(-1, 0, 10), 0);
    t.equal(clamp(11, 0, 10), 10);
    t.equal(clamp(5, 10, 0), 5);
    t.equal(clamp(-3, 10, 0), 0);
    t.equal(clamp(0, 0, 0), 0);
    t.ok(Number.isNaN(clamp(undefined, 0, 10)));
    t.end();
});


t.test('numbers/mod', (t) => {
    t.equal(mod(5, 3), 2);
    t.equal(mod(-1, 5), 4);
    t.equal(mod(-5, 3), 1);
    t.equal(mod(5, -3), -1);
    t.equal(mod(0, 3), 0);
    t.equal(mod(5, 0), 0);
    t.equal(mod(null, 3), 0);
    t.equal(mod(5, null), 0);
    t.equal(mod(NaN, 3), 0);
    t.end();
});

const t = require('tap');

const { toInteger } = require('../src/math/numbers.js');


t.test('numbers/toInteger', (t) => {
    t.equal(toInteger(null), 0);
    t.equal(toInteger(undefined), 0);
    t.equal(toInteger(1.0), 1);
    t.equal(toInteger('1'), 1);
    t.equal(toInteger(1), 1);
    t.end();
});
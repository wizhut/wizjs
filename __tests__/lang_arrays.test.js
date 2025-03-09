const t = require('tap');

const { compact, accumulate, Operator } = require('../src/lang/arrays.js');


t.test('arrays/compact', (t) => {
    t.match(compact([1, 2, 3]), [1, 2, 3]);
    t.match(compact([null, 2, 3]), [2, 3]);
    t.match(compact([1, 2, undefined]), [1, 2]);
    t.match(compact([null, 1, undefined]), [1]);
    t.match(compact(null), []);
    t.match(compact(undefined), []);
    t.end();
});


t.test('arrays/accumulate', (t) => {
    const arr = [1, 2, 3];

    t.equal(accumulate(arr, Operator.plus, 0), 6);
    t.equal(accumulate(arr, Operator.minus, 0), -6);
    t.equal(accumulate(arr, Operator.multiply, 0), 0);
    t.equal(accumulate(arr, Operator.divide, 0), 0);
    t.end();
});
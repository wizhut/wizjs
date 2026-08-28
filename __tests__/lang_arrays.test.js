const t = require('tap');

const { compact, accumulate, Operator, unique, chunk, flatten } = require('../src/lang/arrays.js');


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


t.test('arrays/unique', (t) => {
    t.match(unique([1, 2, 2, 3, 1]), [1, 2, 3]);
    t.match(unique(['a', 'b', 'a']), ['a', 'b']);
    t.match(unique([NaN, NaN, 1]), [NaN, 1]);
    t.match(unique([0, false, 0, false]), [0, false]);
    t.match(unique([]), []);
    t.match(unique(null), []);
    t.match(unique(undefined), []);

    const a = { id: 1 };
    const b = { id: 1 };
    t.match(unique([a, b, a]), [a, b]);
    t.end();
});


t.test('arrays/chunk', (t) => {
    t.match(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
    t.match(chunk([1, 2, 3], 3), [[1, 2, 3]]);
    t.match(chunk([1, 2, 3], 5), [[1, 2, 3]]);
    t.match(chunk([], 2), []);
    t.match(chunk(null, 2), []);
    t.match(chunk(undefined, 2), []);
    t.match(chunk([1, 2, 3], 0), []);
    t.match(chunk([1, 2, 3], -1), []);
    t.match(chunk([1, 2, 3], '2'), [[1, 2], [3]]);
    t.end();
});


t.test('arrays/flatten', (t) => {
    t.match(flatten([1, [2, 3], 4]), [1, 2, 3, 4]);
    t.match(flatten([1, [2, [3]], 4]), [1, 2, [3], 4]);
    t.match(flatten([1, 2, 3]), [1, 2, 3]);
    t.match(flatten([]), []);
    t.match(flatten(null), []);
    t.match(flatten(undefined), []);
    t.match(flatten([[], [1], 2]), [1, 2]);
    t.end();
});

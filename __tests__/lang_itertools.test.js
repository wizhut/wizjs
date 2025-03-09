const t = require('tap');

const { count, fn_count } = require('../src/lang/itertools.js');


t.test('itertools/count', (t) => {
    // simple integer
    const genOne = count(0, 1);
    t.equal(genOne.next().value, 0);
    t.equal(genOne.next().value, 1);
    t.equal(genOne.next().value, 2);

    // simple floating-point
    const genTwo = count(0, 0.5);
    t.equal(genTwo.next().value, 0);
    t.equal(genTwo.next().value, 0.5);
    t.equal(genTwo.next().value, 1);
    t.equal(genTwo.next().value, 1.5);

    t.end();
});

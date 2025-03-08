const t = require('tap');

const { cycle, fn_cycle } = require('../src/lang/itertools.js');


t.test('itertools/cycle', (t) => {
    // simple integer
    const genOne = cycle(0, 1);
    t.equal(genOne.next().value, 0);
    t.equal(genOne.next().value, 1);
    t.equal(genOne.next().value, 2);

    // simple floating-point
    const genTwo = cycle(0, 0.5);
    t.equal(genTwo.next().value, 0);
    t.equal(genTwo.next().value, 0.5);
    t.equal(genTwo.next().value, 1);
    t.equal(genTwo.next().value, 1.5);

    t.end();
});

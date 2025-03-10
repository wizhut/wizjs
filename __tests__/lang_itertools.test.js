const t = require('tap');

const { count, repeat } = require('../src/lang/itertools.js');


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


t.test('itertools/repeat', (t) => {
    // single repeat
    const repeatGen = repeat(10, 1);
    t.equal(repeatGen.next().value, 10);
    t.equal(repeatGen.return().done, true);

    // eternal repeat
    const repeatGenTwo = repeat(15, 0);
    t.equal(repeatGenTwo.next().value, 15);
    t.equal(repeatGenTwo.next().value, 15);

    t.end();
});
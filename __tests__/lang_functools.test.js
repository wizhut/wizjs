const t = require('tap');

const { reflexive } = require('../src/lang/functools.js');


t.test('functools/reflexive', (t) => {
    t.equal(reflexive(null), null);
    t.equal(reflexive(1), 1);
    t.equal(reflexive('abcde'), 'abcde');
    t.equal(reflexive(2.1), 2.1);
    t.end();
});
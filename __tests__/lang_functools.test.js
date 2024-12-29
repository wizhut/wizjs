const t = require('tap');

const { reflexive } = require('../src/lang/functools.js');


t.test('functools/reflexive', (t) => {
    t.equal(reflexive(null), null);
    t.end();
});
const t = require('tap');

const { isNil } = require('../src/lang/checks.js');


t.test('checks/isNil', (t) => {
    t.equal(isNil(null), true);
    t.equal(isNil(undefined), true);
    t.equal(isNil(1), false);
    t.equal(isNil(1.0), false);
    t.equal(isNil('not-null-string'), false);
    t.end();
});
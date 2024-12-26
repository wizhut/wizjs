const t = require('tap');


const { getInstance, singleton } = require('../src/lang/singleton.js');


t.test('singleton/null-test', async (t) => {
    t.equal(await getInstance('invalid-key'), null)
    t.end();
});


t.test('singleton/simple-tests', async (t) => {
    // numbers
    singleton('number-wrapper', async () => 1);
    t.equal(await getInstance('number-wrapper'), 1)

    // null
    singleton('null-wrapper', async () => null);
    t.equal(await getInstance('null-wrapper'), null);

    t.end();
});
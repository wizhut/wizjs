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


t.test('singleton/caches-instance', async (t) => {
    // the wrapper must run once; later calls return the cached instance
    let calls = 0;
    singleton('counter-wrapper', async () => {
        calls += 1;
        return { id: calls };
    });

    const first = await getInstance('counter-wrapper');
    const second = await getInstance('counter-wrapper');

    t.equal(calls, 1);
    t.equal(first, second);

    t.end();
});
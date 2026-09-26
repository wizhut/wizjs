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

t.test('singleton/concurrent-first-calls-share-one-run', async (t) => {
    // calls that arrive while the wrapper is still running must wait for that
    // run and get its instance, not start a second one
    let calls = 0;
    singleton('concurrent-wrapper', async () => {
        calls += 1;
        await new Promise((resolve) => setTimeout(resolve, 10));
        return { id: calls };
    });

    const [first, second] = await Promise.all([
        getInstance('concurrent-wrapper'),
        getInstance('concurrent-wrapper'),
    ]);

    t.equal(calls, 1);
    t.equal(first, second);

    t.end();
});


t.test('singleton/failed-wrapper-is-retried', async (t) => {
    // a wrapper that throws caches nothing, so the next call runs it again
    let calls = 0;
    singleton('flaky-wrapper', async () => {
        calls += 1;
        if (calls === 1) {
            throw new Error('first attempt fails');
        }
        return { id: calls };
    });

    await t.rejects(getInstance('flaky-wrapper'), /first attempt fails/);
    const instance = await getInstance('flaky-wrapper');

    t.equal(calls, 2);
    t.same(instance, { id: 2 });

    t.end();
});

const t = require('tap');

const { if_exception } = require('../src/lang/flow.js');


t.test('flow/if_exception runs the success branch', (t) => {
    const calls = [];

    if_exception(
        () => calls.push('body'),
        () => calls.push('ok'),
        () => calls.push('failed')
    );

    t.same(calls, ['body', 'ok']);
    t.end();
});


t.test('flow/if_exception runs the failure branch with the error', (t) => {
    const calls = [];
    const boom = new Error('boom');
    let seen = null;

    if_exception(
        () => { calls.push('body'); throw boom; },
        () => calls.push('ok'),
        (error) => { calls.push('failed'); seen = error; }
    );

    t.same(calls, ['body', 'failed'], 'the success callback is skipped');
    t.equal(seen, boom, 'the thrown error is handed to the failure callback');
    t.end();
});


t.test('flow/if_exception catches a throw from the success callback', (t) => {
    const boom = new Error('from fn_noexc');
    let seen = null;

    if_exception(
        () => {},
        () => { throw boom; },
        (error) => { seen = error; }
    );

    t.equal(seen, boom, 'fn_noexc runs inside the same try block');
    t.end();
});

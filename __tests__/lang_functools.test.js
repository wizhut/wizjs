const t = require('tap');

const { reflexive, partial, compose, once, memoize, cache, reduce } = require('../src/lang/functools.js');


t.test('functools/reflexive', (t) => {
    t.equal(reflexive(null), null);
    t.equal(reflexive(1), 1);
    t.equal(reflexive('abcde'), 'abcde');
    t.equal(reflexive(2.1), 2.1);
    t.end();
});


t.test('functools/partial', (t) => {
    const add = (a, b, c) => a + b + c;
    const add10 = partial(add, 10);
    t.equal(add10(1, 2), 13);

    const add10and20 = partial(add, 10, 20);
    t.equal(add10and20(3), 33);

    const greet = function (greeting, name) {
        return `${greeting} ${name}, ${this.title}`;
    };
    const hello = partial(greet, 'hello');
    t.equal(hello.call({ title: 'Dr' }, 'Ada'), 'hello Ada, Dr');
    t.end();
});


t.test('functools/compose', (t) => {
    const inc = (n) => n + 1;
    const double = (n) => n * 2;
    t.equal(compose(double, inc)(3), 8);
    t.equal(compose(inc, double)(3), 7);
    t.equal(compose(inc)(3), 4);
    t.equal(compose()(3), 3);

    const first = (...args) => args.join('-');
    const wrap = (s) => `[${s}]`;
    t.equal(compose(wrap, first)('a', 'b'), '[a-b]');
    t.end();
});


t.test('functools/once', (t) => {
    let calls = 0;
    const fn = (x) => {
        calls += 1;
        return x * 2;
    };
    const onceFn = once(fn);

    t.equal(onceFn(4), 8);
    t.equal(onceFn(9), 8);
    t.equal(calls, 1);
    t.end();
});


t.test('functools/memoize', (t) => {
    let calls = 0;
    const fn = (a, b) => {
        calls += 1;
        return a + b;
    };
    const mem = memoize(fn);

    t.equal(mem(1, 2), 3);
    t.equal(mem(1, 2), 3);
    t.equal(calls, 1);
    t.equal(mem(1, 3), 4);
    t.equal(calls, 2);

    // different arity is a different cache entry
    t.equal(mem(1, 2, undefined), 3);
    t.equal(calls, 3);

    // NaN is a valid key (SameValueZero)
    let nanCalls = 0;
    const nanFn = memoize((n) => {
        nanCalls += 1;
        return n;
    });
    t.ok(Number.isNaN(nanFn(NaN)));
    t.ok(Number.isNaN(nanFn(NaN)));
    t.equal(nanCalls, 1);

    // throws are not cached
    let throws = 0;
    const boom = memoize((ok) => {
        throws += 1;
        if (!ok) {
            throw new Error('nope');
        }
        return 'ok';
    });
    t.throws(() => boom(false));
    t.throws(() => boom(false));
    t.equal(throws, 2);
    t.equal(boom(true), 'ok');
    t.equal(boom(true), 'ok');
    t.equal(throws, 3);

    // custom resolver
    let resolved = 0;
    const byName = memoize((obj) => {
        resolved += 1;
        return obj.v;
    }, (obj) => obj.id);
    t.equal(byName({ id: 1, v: 10 }), 10);
    t.equal(byName({ id: 1, v: 99 }), 10);
    t.equal(resolved, 1);

    mem.cache.clear();
    t.equal(mem(1, 2), 3);
    t.equal(calls, 4);
    t.equal(cache, memoize);
    t.end();
});


t.test('functools/reduce', (t) => {
    t.equal(reduce((a, b) => a + b, [1, 2, 3, 4]), 10);
    t.equal(reduce((a, b) => a + b, [1, 2, 3, 4], 10), 20);
    t.equal(reduce((a, b) => a + b, [], 0), 0);
    t.equal(reduce((a, b) => a * b, (function* () { yield 2; yield 3; yield 4; })()), 24);
    t.throws(() => reduce((a, b) => a + b, []));
    t.throws(() => reduce((a, b) => a + b, null));
    t.equal(reduce((a, b) => a + b, null, 5), 5);
    t.end();
});

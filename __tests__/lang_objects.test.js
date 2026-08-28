const t = require('tap');

const { pick, omit, get } = require('../src/lang/objects.js');


t.test('objects/pick', (t) => {
    t.match(pick({ a: 1, b: 2, c: 3 }, ['a', 'c']), { a: 1, c: 3 });
    t.match(pick({ a: 1, b: 2 }, 'a'), { a: 1 });
    t.match(pick({ a: 1 }, ['a', 'missing']), { a: 1 });
    t.match(pick(null, ['a']), {});
    t.match(pick(undefined, ['a']), {});
    t.match(pick(1, ['a']), {});
    t.match(pick({ a: 1 }, []), {});

    const proto = { inherited: 1 };
    const obj = Object.create(proto);
    obj.own = 2;
    t.equal(pick(obj, ['inherited']).inherited, 1);
    t.equal(pick(obj, ['own']).own, 2);

    const src = {};
    Object.defineProperty(src, '__proto__', {
        value: { polluted: true },
        enumerable: true,
        configurable: true
    });
    const picked = pick(src, ['__proto__']);
    t.equal(Object.getPrototypeOf(picked), Object.prototype);
    t.equal(picked.polluted, undefined);
    t.equal(Object.prototype.polluted, undefined);

    const withCtor = pick({ constructor: 1, prototype: 2, a: 3 }, ['constructor', 'prototype', 'a']);
    t.equal(withCtor.constructor, 1);
    t.equal(withCtor.prototype, 2);
    t.equal(withCtor.a, 3);
    t.end();
});


t.test('objects/omit', (t) => {
    t.match(omit({ a: 1, b: 2, c: 3 }, ['b']), { a: 1, c: 3 });
    t.match(omit({ a: 1, b: 2 }, 'a'), { b: 2 });
    t.match(omit({ a: 1 }, ['missing']), { a: 1 });
    t.match(omit(1, ['a']), {});
    t.match(omit(true, ['a']), {});
    t.match(omit(undefined, ['a']), {});
    t.match(omit({ a: 1, b: 2 }, []), { a: 1, b: 2 });
    t.match(omit({ 1: 'one', a: 2 }, [1]), { a: 2 });
    t.end();
});


t.test('objects/get', (t) => {
    const data = { a: { b: { c: 3 } }, n: null, u: undefined };

    t.equal(get(data, 'a.b.c'), 3);
    t.equal(get(data, ['a', 'b', 'c']), 3);
    t.equal(get(data, 'a.b.missing', 'fallback'), 'fallback');
    t.equal(get(data, 'a.missing.c', 'fallback'), 'fallback');
    t.equal(get(data, 'n'), null);
    t.equal(get({ a: 'hello' }, 'a.x', 'fallback'), 'fallback');
    t.equal(get({ a: 1 }, 'a.b', 'fallback'), 'fallback');
    t.equal(get(data, 'u', 'fallback'), 'fallback');
    t.equal(get(null, 'a', 'fallback'), 'fallback');
    t.equal(get(undefined, 'a', 'fallback'), 'fallback');
    t.equal(get(data, ''), data);
    t.equal(get(data, []), data);
    t.equal(get(['x', 'y'], 1), 'y');
    t.equal(get(data, 'a.b'), data.a.b);
    t.end();
});

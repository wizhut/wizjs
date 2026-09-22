const t = require('tap');

const { BadlyInitializedError } = require('../src/internal/exceptions.js');
const root = require('@wizhut_tech/wizjs');


t.test('exceptions/BadlyInitializedError behaves like an Error', (t) => {
    const err = new BadlyInitializedError('not ready');

    t.type(err, Error, 'extends Error');
    t.type(err, BadlyInitializedError);
    t.equal(err.message, 'not ready');
    t.ok(err.stack, 'carries a stack');
    t.end();
});


t.test('exceptions/BadlyInitializedError ignores trailing arguments', (t) => {
    const err = new BadlyInitializedError('only the message', 'extra', 42);

    t.equal(err.message, 'only the message');
    t.end();
});


t.test('exceptions/BadlyInitializedError is the one the root import exposes', (t) => {
    t.equal(root.exceptions.BadlyInitializedError, BadlyInitializedError);
    t.end();
});

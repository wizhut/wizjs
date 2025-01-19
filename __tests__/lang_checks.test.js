const t = require('tap');

const { isNil, isArray, isObject, isNumber, isString } = require('../src/lang/checks.js');



t.test('checks/isNil', (t) => {
    t.equal(isNil(null), true);
    t.equal(isNil(undefined), true);
    t.equal(isNil(1), false);
    t.equal(isNil(1.0), false);
    t.equal(isNil('not-null-string'), false);
    t.end();
});

t.test('checks/isArray', (t) => {
    t.equal(isArray([]), true);
    t.equal(isArray(1), false);
    t.equal(isArray('misc'), false);
    t.equal(isArray(null), false);
    t.equal(isArray(undefined), false);
    t.equal(isArray({}), false);
    t.end();
});

t.test('checks/isObject', (t) => {
    t.equal(isObject(null), false);
    t.equal(isObject(undefined), false);
    t.equal(isObject(1), false);
    t.equal(isObject('misc'), false);
    t.equal(isObject({}), true);
    t.equal(isObject([]), false);
    t.end();
});

t.test('checks/isNumber', (t) => {
    t.equal(isNumber(null), false);
    t.equal(isNumber(undefined), false);
    t.equal(isNumber({}), false);
    t.equal(isNumber([]), false);
    t.equal(isNumber(1), true);
    t.equal(isNumber(1.1), true);
    t.equal(isNumber('misc'), false);
    t.end();
});

t.test('checks/isString', (t) => {
    t.equal(isString(null), false);
    t.equal(isString(undefined), false);
    t.equal(isString({}), false);
    t.equal(isString([]), false);
    t.equal(isString(1), false);
    t.equal(isString(1.1), false);
    t.equal(isString('misc'), true);
    t.end();
})
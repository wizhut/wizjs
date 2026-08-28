const t = require('tap');

const { isNil, isArray, isObject, isNumber, isString, isBoolean, isFunction, isInteger, isEmpty } = require('../src/lang/checks.js');



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
});

t.test('checks/isBoolean', (t) => {
    t.equal(isBoolean(true), true);
    t.equal(isBoolean(false), true);
    t.equal(isBoolean(null), false);
    t.equal(isBoolean(undefined), false);
    t.equal(isBoolean(0), false);
    t.equal(isBoolean(1), false);
    t.equal(isBoolean('true'), false);
    t.equal(isBoolean({}), false);
    t.end();
});

t.test('checks/isFunction', (t) => {
    t.equal(isFunction(function () {}), true);
    t.equal(isFunction(() => 1), true);
    t.equal(isFunction(async () => 1), true);
    t.equal(isFunction(function* () {}), true);
    t.equal(isFunction(class Foo {}), true);
    t.equal(isFunction(null), false);
    t.equal(isFunction(undefined), false);
    t.equal(isFunction(1), false);
    t.equal(isFunction('fn'), false);
    t.equal(isFunction({}), false);
    t.end();
});

t.test('checks/isInteger', (t) => {
    t.equal(isInteger(1), true);
    t.equal(isInteger(0), true);
    t.equal(isInteger(-4), true);
    t.equal(isInteger(1.0), true);
    t.equal(isInteger(1.1), false);
    t.equal(isInteger(NaN), false);
    t.equal(isInteger(Infinity), false);
    t.equal(isInteger('1'), false);
    t.equal(isInteger(null), false);
    t.equal(isInteger(undefined), false);
    t.equal(isInteger(true), false);
    t.end();
});

t.test('checks/isEmpty', (t) => {
    t.equal(isEmpty(null), true);
    t.equal(isEmpty(undefined), true);
    t.equal(isEmpty(''), true);
    t.equal(isEmpty([]), true);
    t.equal(isEmpty({}), true);
    t.equal(isEmpty(new Map()), true);
    t.equal(isEmpty(new Set()), true);

    t.equal(isEmpty(' '), false);
    t.equal(isEmpty([0]), false);
    t.equal(isEmpty({ a: 1 }), false);
    t.equal(isEmpty(new Map([['a', 1]])), false);
    t.equal(isEmpty(new Set([1])), false);
    t.equal(isEmpty(0), false);
    t.equal(isEmpty(false), false);
    t.equal(isEmpty(() => {}), false);
    t.end();
});

const t = require('tap');

const { count, repeat, cycle, chain, take, zip, range, enumerate, islice, takewhile, dropwhile, filterfalse, zip_longest, product, groupby, starmap, batched, pairwise, compress } = require('../src/lang/itertools.js');


t.test('itertools/count', (t) => {
    // simple integer
    const genOne = count(0, 1);
    t.equal(genOne.next().value, 0);
    t.equal(genOne.next().value, 1);
    t.equal(genOne.next().value, 2);

    // simple floating-point
    const genTwo = count(0, 0.5);
    t.equal(genTwo.next().value, 0);
    t.equal(genTwo.next().value, 0.5);
    t.equal(genTwo.next().value, 1);
    t.equal(genTwo.next().value, 1.5);

    t.end();
});


t.test('itertools/repeat', (t) => {
    // single repeat
    const repeatGen = repeat(10, 1);
    t.equal(repeatGen.next().value, 10);
    t.equal(repeatGen.next().done, true);

    // eternal repeat
    const repeatGenTwo = repeat(15, 0);
    t.equal(repeatGenTwo.next().value, 15);
    t.equal(repeatGenTwo.next().value, 15);

    // negative times is clamped to 0, i.e. behaves like eternal repeat
    const repeatGenThree = repeat(7, -3);
    t.equal(repeatGenThree.next().value, 7);
    t.equal(repeatGenThree.next().value, 7);
    t.equal(repeatGenThree.return().done, true);

    t.end();
});


t.test('itertools/cycle', (t) => {
    const cycled = cycle([1, 2, 3]);
    t.equal(cycled.next().value, 1);
    t.equal(cycled.next().value, 2);
    t.equal(cycled.next().value, 3);
    t.equal(cycled.next().value, 1);
    t.equal(cycled.next().value, 2);
    t.equal(cycled.next().value, 3);
    t.equal(cycled.next().value, 1);
    t.equal(cycled.return().done, true);

    const fromGen = cycle((function* () { yield 'a'; yield 'b'; })());
    t.equal(fromGen.next().value, 'a');
    t.equal(fromGen.next().value, 'b');
    t.equal(fromGen.next().value, 'a');
    t.equal(fromGen.return().done, true);

    t.equal(cycle(null).next().done, true);
    t.equal(cycle([]).next().done, true);

    t.end();
});


t.test('itertools/chain', (t) => {
    t.match([...chain([1, 2], [3, 4])], [1, 2, 3, 4]);
    t.match([...chain([1], [], [2, 3])], [1, 2, 3]);
    t.match([...chain(null, [1], undefined, [2])], [1, 2]);
    t.match([...chain()], []);

    const gen = (function* () { yield 9; })();
    t.match([...chain([1], gen)], [1, 9]);

    t.end();
});


t.test('itertools/take', (t) => {
    t.match(take(3, count(0)), [0, 1, 2]);
    t.match(take(2, [10, 20, 30, 40]), [10, 20]);
    t.match(take(10, [1, 2]), [1, 2]);
    t.match(take(0, [1, 2, 3]), []);
    t.match(take(-1, [1, 2, 3]), []);
    t.match(take(3, null), []);
    t.match(take(4, cycle([1, 2])), [1, 2, 1, 2]);
    t.end();
});


t.test('itertools/zip', (t) => {
    t.match([...zip([1, 2, 3], ['a', 'b', 'c'])], [[1, 'a'], [2, 'b'], [3, 'c']]);
    t.match([...zip([1, 2, 3], ['a', 'b'])], [[1, 'a'], [2, 'b']]);
    t.match([...zip([1], ['a'], [true, false])], [[1, 'a', true]]);
    t.match([...zip()], []);
    t.match([...zip(null, [1, 2])], []);
    t.match([...zip(count(0), ['x', 'y'])], [[0, 'x'], [1, 'y']]);
    t.end();
});


t.test('itertools/range', (t) => {
    t.match([...range(5)], [0, 1, 2, 3, 4]);
    t.match([...range(1, 5)], [1, 2, 3, 4]);
    t.match([...range(0, 10, 2)], [0, 2, 4, 6, 8]);
    t.match([...range(5, 0, -1)], [5, 4, 3, 2, 1]);
    t.match([...range(0, 1, 0.5)], [0, 0.5]);
    t.match([...range(0, 0)], []);
    t.match([...range(-3)], []);
    t.match([...range(0, 10, 0)], []);
    t.match([...range()], []);
    t.end();
});


t.test('itertools/enumerate', (t) => {
    t.match([...enumerate(['a', 'b', 'c'])], [[0, 'a'], [1, 'b'], [2, 'c']]);
    t.match([...enumerate(['a', 'b'], 10)], [[10, 'a'], [11, 'b']]);
    t.match([...enumerate([])], []);
    t.match([...enumerate(null)], []);
    t.end();
});


t.test('itertools/islice', (t) => {
    t.match([...islice('ABCDEFG', 2)], ['A', 'B']);
    t.match([...islice('ABCDEFG', 2, 4)], ['C', 'D']);
    t.match([...islice('ABCDEFG', 2, null)], ['C', 'D', 'E', 'F', 'G']);
    t.match([...islice('ABCDEFG', 0, null, 2)], ['A', 'C', 'E', 'G']);
    t.match([...islice('ABCDEFG', 2, 6, 2)], ['C', 'E']);
    t.match([...islice('ABC', null, 2)], ['A', 'B']);
    t.match([...islice('ABCD', 0, 4, null)], ['A', 'B', 'C', 'D']);
    t.match([...islice([1, 2, 3], 0)], []);
    t.match([...islice([1, 2, 3], 2, 2)], []);
    t.match([...islice([1, 2, 3], 0, 3, 0)], []);
    t.match([...islice(null, 3)], []);
    t.end();
});


t.test('itertools/takewhile', (t) => {
    t.match([...takewhile((x) => x < 5, [1, 4, 6, 4, 1])], [1, 4]);
    t.match([...takewhile((x) => x < 0, [1, 2])], []);
    t.match([...takewhile((x) => x < 9, [1, 2])], [1, 2]);
    t.match([...takewhile((x) => x, null)], []);
    t.match([...takewhile(null, [1, 2])], []);
    t.end();
});


t.test('itertools/dropwhile', (t) => {
    t.match([...dropwhile((x) => x < 5, [1, 4, 6, 4, 1])], [6, 4, 1]);
    t.match([...dropwhile((x) => x < 0, [1, 2])], [1, 2]);
    t.match([...dropwhile((x) => x < 9, [1, 2])], []);
    t.match([...dropwhile((x) => x, null)], []);
    t.match([...dropwhile(null, [1, 2])], []);
    t.end();
});


t.test('itertools/filterfalse', (t) => {
    t.match([...filterfalse((x) => x % 2, range(10))], [0, 2, 4, 6, 8]);
    t.match([...filterfalse((x) => x, [0, 1, false, 2, ''])], [0, false, '']);
    t.match([...filterfalse((x) => x, null)], []);
    t.match([...filterfalse(null, [1, 2])], []);
    t.end();
});


t.test('itertools/zip_longest', (t) => {
    t.match([...zip_longest([1, 2, 3], ['a', 'b'])], [[1, 'a'], [2, 'b'], [3, undefined]]);
    t.match([...zip_longest([1, 2], ['a', 'b', 'c'], { fillvalue: '-' })], [[1, 'a'], [2, 'b'], ['-', 'c']]);
    t.match([...zip_longest()], []);
    t.match([...zip_longest(null, [1])], []);
    t.match([...zip_longest([], [1, 2], { fillvalue: 0 })], [[0, 1], [0, 2]]);
    t.end();
});


t.test('itertools/product', (t) => {
    t.match([...product()], [[]]);
    t.match([...product('AB', [1, 2])], [['A', 1], ['A', 2], ['B', 1], ['B', 2]]);
    t.match([...product([1, 2], [3], [4, 5])], [[1, 3, 4], [1, 3, 5], [2, 3, 4], [2, 3, 5]]);
    t.match([...product([1, 2], [])], []);
    t.match([...product(null, [1])], []);
    t.end();
});


t.test('itertools/groupby', (t) => {
    t.match([...groupby('AAAABBBCCDAABBB')], [
        ['A', ['A', 'A', 'A', 'A']],
        ['B', ['B', 'B', 'B']],
        ['C', ['C', 'C']],
        ['D', ['D']],
        ['A', ['A', 'A']],
        ['B', ['B', 'B', 'B']]
    ]);
    t.match([...groupby([1, 2, 3, 4], (x) => x % 2)], [
        [1, [1]],
        [0, [2]],
        [1, [3]],
        [0, [4]]
    ]);
    t.match([...groupby([])], []);
    t.match([...groupby(null)], []);
    t.match([...groupby([NaN, NaN, 1])], [[NaN, [NaN, NaN]], [1, [1]]]);
    t.end();
});


t.test('itertools/starmap', (t) => {
    t.match([...starmap(Math.pow, [[2, 5], [3, 2], [10, 3]])], [32, 9, 1000]);
    t.match([...starmap((a, b) => a + b, zip([1, 2], [3, 4]))], [4, 6]);
    t.match([...starmap(Math.max, null)], []);
    t.match([...starmap(null, [[1]])], []);
    t.end();
});


t.test('itertools/batched', (t) => {
    t.match([...batched('ABCDEFG', 3)], [['A', 'B', 'C'], ['D', 'E', 'F'], ['G']]);
    t.match([...batched([1, 2, 3], 3)], [[1, 2, 3]]);
    t.match([...batched([1, 2, 3], 0)], []);
    t.match([...batched(null, 2)], []);
    t.match([...batched([], 2)], []);
    t.end();
});


t.test('itertools/pairwise', (t) => {
    t.match([...pairwise('ABCDE')], [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'E']]);
    t.match([...pairwise([1])], []);
    t.match([...pairwise([])], []);
    t.match([...pairwise(null)], []);
    t.end();
});


t.test('itertools/compress', (t) => {
    t.match([...compress('ABCDEF', [1, 0, 1, 0, 1, 1])], ['A', 'C', 'E', 'F']);
    t.match([...compress([1, 2, 3], [true, false])], [1]);
    t.match([...compress(null, [1])], []);
    t.match([...compress([1], null)], []);
    t.end();
});

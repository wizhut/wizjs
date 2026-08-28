const t = require('tap');

const { Counter, DefaultDict } = require('../src/lang/collections.js');


t.test('collections/Counter', (t) => {
    const fromString = new Counter('aab');
    t.equal(fromString.get('a'), 2);
    t.equal(fromString.get('b'), 1);
    t.equal(fromString.get('z'), 0);
    t.equal(fromString.total(), 3);
    t.equal(fromString.size, 2);
    t.match([...fromString], ['a', 'b']);
    t.match([...fromString.keys()], ['a', 'b']);
    t.match([...fromString.values()], [2, 1]);
    t.match([...fromString.entries()], [['a', 2], ['b', 1]]);
    t.match([...fromString.elements()], ['a', 'a', 'b']);

    const fromObj = new Counter({ a: 4, b: 2 });
    t.equal(fromObj.get('a'), 4);
    t.match(fromObj.mostCommon(1), [['a', 4]]);
    t.match(fromObj.mostCommon(), [['a', 4], ['b', 2]]);
    t.match(fromObj.mostCommon(0), []);

    const fromArr = new Counter([1, 1, 2]);
    t.equal(fromArr.get(1), 2);
    fromArr.add(1);
    t.equal(fromArr.get(1), 3);
    fromArr.add(3, 5);
    t.equal(fromArr.get(3), 5);
    fromArr.set(2, 0);
    t.equal(fromArr.get(2), 0);
    t.ok(fromArr.delete(2));
    t.equal(fromArr.get(2), 0);

    const zeros = new Counter();
    zeros.set('gone', 0);
    zeros.set('neg', -1);
    zeros.set('keep', 2);
    t.match([...zeros.elements()], ['keep', 'keep']);

    const fromMap = new Counter(new Map([['x', 3], ['y', 1]]));
    t.equal(fromMap.get('x'), 3);

    const copy = new Counter(fromString);
    t.equal(copy.get('a'), 2);
    copy.add('a');
    t.equal(fromString.get('a'), 2);

    const empty = new Counter();
    t.equal(empty.total(), 0);
    t.match([...empty.elements()], []);

    const nan = new Counter([NaN, NaN]);
    t.equal(nan.get(NaN), 2);
    t.end();
});


t.test('collections/DefaultDict', (t) => {
    const groups = new DefaultDict(Array);
    groups.get('a').push(1);
    groups.get('a').push(2);
    groups.get('b').push(3);
    t.match(groups.get('a'), [1, 2]);
    t.match(groups.get('b'), [3]);
    t.equal(groups.size, 2);
    t.ok(groups.has('a'));
    t.equal(groups.peek('missing', 'nope'), 'nope');
    t.match(groups.peek('a'), [1, 2]);
    t.equal(groups.has('missing'), false);

    groups.set('c', [9]);
    t.match(groups.get('c'), [9]);
    t.ok(groups.delete('c'));
    t.equal(groups.has('c'), false);

    t.match([...groups.keys()], ['a', 'b']);
    t.equal([...groups.values()].length, 2);
    t.equal([...groups.entries()].length, 2);

    const lists = new DefaultDict(() => []);
    lists.get('k').push('x');
    t.match(lists.get('k'), ['x']);

    const noFactory = new DefaultDict();
    t.equal(noFactory.get('x'), undefined);
    t.equal(noFactory.has('x'), false);
    t.end();
});

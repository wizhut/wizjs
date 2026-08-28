# Lang / collections

Python `collections` types that JS is missing.

## Counter

Count hashable items. Keys use `Map` equality (`SameValueZero`), so objects and `NaN` work.

* **new Counter(source)**: *source* may be an iterable (each item counted once per occurrence — `new Counter('aab')` has `a: 2`), a plain object of counts (`{ a: 2 }`), a `Map`, another `Counter`, or omitted for an empty counter.
* **get(item)**: count of *item*, or `0` if unseen (does not insert — Python `Counter.__missing__`).
* **add(item, n=1)**: add *n* to the count; returns the new count.
* **set(item, n)**: set the count; returns the counter.
* **delete(item)**: drop *item*.
* **mostCommon(n)**: `[item, count]` pairs, highest count first. Omit *n* for every item. Ties keep insertion order.
* **total()**: sum of counts (Python 3.10 `Counter.total`).
* **elements()**: generator that yields each item as many times as its positive count (Python `Counter.elements`).
* **keys() / values() / entries() / size**: `Map`-like views. The counter itself is iterable over keys (`for (const k of counter)`).

## DefaultDict

* **new DefaultDict(factory)**: *factory* is called to fill missing keys (Python `collections.defaultdict`). `new DefaultDict(Array)` / `new DefaultDict(() => [])` are the usual list-of-groups pattern.
* **get(key)**: like Python `d[key]` — inserts `factory()` if missing, then returns the value. If *factory* is not a function, missing keys return `undefined` and are not inserted.
* **peek(key, defaultValue)**: like Python `dict.get` — does **not** insert.
* **set(key, value)** / **has(key)** / **delete(key)** / **size** / **keys()** / **values()** / **entries()**.

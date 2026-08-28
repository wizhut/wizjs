## lang / functools

Python `functools`, plus a couple of everyday function helpers.

* **reflexive(arg)**: Just a dumb method that returns `arg` as provided. (Python identity: `lambda x: x`.)
* **partial(fn, ...args)**: Returns a function that invokes *fn* with *args* prepended to whatever arguments it later receives. Preserves `this`. (Python `functools.partial`.)
* **compose(...fns)**: Right-to-left function composition. `compose(f, g, h)(x)` is `f(g(h(x)))`. With no functions, returns `reflexive`.
* **once(fn)**: Returns a function that invokes *fn* at most once. Later calls return the first result (including `undefined` if the first call threw after being marked as called).
* **memoize(fn, resolver)** / **cache(fn, resolver)**: Returns a function that caches *fn* results (`cache` is the Python `functools.cache` name). With no *resolver*, arguments are compared with `SameValueZero` in a nested `Map` (so `memoize(fn)(1, 2)` and `memoize(fn)(1, 2, undefined)` are distinct, and `NaN` is a valid key). With a *resolver*, the cache key is `resolver(...args)`. Failed calls are not cached. The cache is exposed as `.cache` (`Map`); call `.cache.clear()` to drop entries.
* **reduce(fn, iterable, initializer)**: Fold *iterable* left-to-right with *fn* (Python `functools.reduce`). If *initializer* is omitted, the first item is the start value. An empty iterable with no initializer throws `TypeError`.

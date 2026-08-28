# Lang / itertools

Python `itertools` (plus a few builtins that belong with it: `zip`, `range`, `enumerate`) as lazy generators.

* **count(start, step=1)**: A generator that counts from *start* with a specified *step*. Default stepping is *1*.
* **repeat(arg, times=0)**: A generator that repeats *arg* for *times* times. If times is 0 then it returns *arg* forever.
* **cycle(iterable)**: A generator that cycles through *iterable* forever. Values are buffered on the first pass so the source is consumed only once. Empty or `null`/`undefined` iterables yield nothing.
* **chain(...iterables)**: A generator that yields the items of each iterable in order. `null`/`undefined` arguments are skipped.
* **take(n, iterable)**: Consumes the first *n* items from *iterable* and returns them as an array. Stops early if the iterable is exhausted. If *n* is less than `1` or *iterable* is `null`/`undefined`, returns an empty array.
* **zip(...iterables)**: A generator that yields arrays of aligned items, stopping when the shortest iterable is exhausted (Python `zip`). Returns an empty generator if called with no arguments or if any argument is not iterable.
* **range(start, stop, step=1)**: A generator of numbers with an exclusive end, matching Python `range`. `range(stop)` counts from `0`. `range(start, stop)` and `range(start, stop, step)` are also supported, including negative steps. A non-finite bound or a `0` step yields nothing. The index form `start + i * step` is used so float steps do not accumulate rounding error.
* **enumerate(iterable, start=0)**: A generator that yields `[index, value]` pairs, starting at *start* (Python `enumerate`). `null`/`undefined` iterables yield nothing.
* **islice(iterable, stop)** / **islice(iterable, start, stop, step=1)**: Slice an iterator (Python `itertools.islice`). Negative indices are not supported. `stop` of `null` means "until exhausted". A `step` less than `1` yields nothing.
* **takewhile(predicate, iterable)**: Yield items as long as *predicate* is truthy, then stop (Python `itertools.takewhile`).
* **dropwhile(predicate, iterable)**: Skip items as long as *predicate* is truthy, then yield the rest (Python `itertools.dropwhile`).
* **filterfalse(predicate, iterable)**: Yield items for which *predicate* is falsy (Python `itertools.filterfalse`).
* **zip_longest(...iterables, { fillvalue })**: Like `zip`, but continues until the longest iterable is exhausted. Missing values are *fillvalue* (default `undefined`). Pass `{ fillvalue }` as the last argument (Python `itertools.zip_longest`).
* **product(...iterables)**: Cartesian product. `product()` with no arguments yields one empty array, matching Python. An empty input iterable yields nothing.
* **groupby(iterable, key)**: Consecutive grouping (Python `itertools.groupby`): a new group starts only when the key *changes*, so the input is not sorted. Each yield is `[key, items]` where *items* is an array (consumed immediately, unlike Python's shared group iterator). Without *key*, the item itself is the key. Equality is `SameValueZero`.
* **starmap(fn, iterable)**: `fn(...args)` for each argument array in *iterable* (Python `itertools.starmap`).
* **batched(iterable, n)**: Yield arrays of length *n*; the last batch may be shorter (Python 3.12 `itertools.batched`). *n* less than `1` yields nothing.
* **pairwise(iterable)**: Overlapping pairs `(s0, s1), (s1, s2), ...` (Python 3.10 `itertools.pairwise`).
* **compress(data, selectors)**: Yield items from *data* whose matching *selector* is truthy (Python `itertools.compress`). Stops when either input is exhausted.

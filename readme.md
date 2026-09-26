# Wizjs

A Javascript library that ports selected Python idioms and stdlib helpers (`itertools`, `functools`, `collections`) to everyday JS. No runtime dependencies. No, this library will not become another `lodash` :).

Use by importing the area you need:

```js
const { isNil } = require('@wizhut_tech/wizjs/lang/checks');
const { Counter } = require('@wizhut_tech/wizjs/lang/collections');
const { clamp } = require('@wizhut_tech/wizjs/math/numbers');
```

Every area listed below is reachable as `@wizhut_tech/wizjs/<namespace>/<area>`.
The subpath form needs Node 14.13 or newer.

The whole library is also available from a single root import --
`const wizjs = require('@wizhut_tech/wizjs')` -- which returns an object
structured like:

```
{
    io: {
        files: [functions]
    },
    lang: {
        arrays: [functions],
        checks: [functions],
        flow: [functions],
        singleton: [functions],
        functools: [functions],
        itertools: [functions],
        objects: [functions],
        collections: [functions]
    },
    math: {
        numbers: [functions]
    },
    exceptions: {
        BadlyInitializedError
    }
}
```

Individual functions can be destructured out of that as well, though it nests
three levels deep:

`const { lang: { checks : { isNil } } }  = require('@wizhut_tech/wizjs');`

Both forms hand back the same objects, so they mix freely. Library internals
(under `src/internal/`) are deliberately not reachable as subpaths --
`BadlyInitializedError` is re-exported from the root import instead.

### I/O

* **Files** utility functions ... [[docs](https://github.com/wizhut/wizjs/blob/main/docs/io_files.md)]

### Language

* **Arrays** utility functions ... [[docs](https://github.com/wizhut/wizjs/blob/main/docs/lang_arrays.md)]
* **Check** utility functions ... [[docs](https://github.com/wizhut/wizjs/blob/main/docs/lang_checks.md)]
* Control-**Flow** utilities ... [[docs](https://github.com/wizhut/wizjs/blob/main/docs/lang_flow.md)]
* **functools** ... [[docs](https://github.com/wizhut/wizjs/blob/main/docs/lang_functools.md)]
* **itertools** ... [[docs](https://github.com/wizhut/wizjs/blob/main/docs/lang_itertools.md)]
* **Objects** utility functions ... [[docs](https://github.com/wizhut/wizjs/blob/main/docs/lang_objects.md)]
* **collections** (`Counter`, `DefaultDict`) ... [[docs](https://github.com/wizhut/wizjs/blob/main/docs/lang_collections.md)]
* **Singleton** hack ... [[docs](https://github.com/wizhut/wizjs/blob/main/docs/lang_singleton.md)]

### Math

* Utilities around **numbers** ... [[docs](https://github.com/wizhut/wizjs/blob/main/docs/math_numbers.md)]

## Contact

This library is actively developed and maintained by [wizhut.tech](http://wizhut.tech)

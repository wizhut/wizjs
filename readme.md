# Wizjs

A Javascript library that ports selected Python idioms and stdlib helpers (`itertools`, `functools`, `collections`) to everyday JS. A few selected dependencies only. No, this library will not become another `lodash` :).

Use by importing:

`const wizjs = require('@wizhut_tech/wizjs')`. Returns an object structured like:

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
    }
}
```

You can also import individual functions from that root object:

`const { lang: { checks : { isNil } } }  = require('@wizhut_tech/wizjs');`

Or require a single namespace area directly, which keeps the destructuring flat
when you need helpers from more than one area:

```js
const { isNil } = require('@wizhut_tech/wizjs/lang/checks');
const { Counter } = require('@wizhut_tech/wizjs/lang/collections');
const { clamp } = require('@wizhut_tech/wizjs/math/numbers');
```

Every area listed below is reachable as `@wizhut_tech/wizjs/<namespace>/<area>`,
and resolves to the very same object the root import exposes, so the two styles
mix freely. The subpath form needs Node 14.13 or newer. Library internals (under
`src/internal/`) are deliberately not reachable this way — `BadlyInitializedError`
is re-exported from the root import instead.

### I/O

* **Files** utility functions ... [[docs](docs/io_files.md)]

### Language

* **Arrays** utility functions ... [[docs](docs/lang_arrays.md)]
* **Check** utility functions ... [[docs](docs/lang_checks.md)]
* Control-**Flow** utilities ... [[docs](docs/lang_flow.md)]
* **functools** ... [[docs](docs/lang_functools.md)]
* **itertools** ... [[docs](docs/lang_itertools.md)]
* **Objects** utility functions ... [[docs](docs/lang_objects.md)]
* **collections** (`Counter`, `DefaultDict`) ... [[docs](docs/lang_collections.md)]
* **Singleton** hack ... [[docs](docs/lang_singleton.md)]

### Math

* Utilities around **numbers** ... [[docs](docs/math_numbers.md)]

## Contact

This library is actively developed and maintained by [wizhut.tech](http://wizhut.tech)

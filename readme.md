# Wizjs

A Javascript library (a few selected dependencies only) that contains utilities for enjoy-full every day programming. No, this library will not become another `lodash` :).

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
        functools: [functions]
    },
    math: {
        numbers: [functions]
    }
}
```

You can also import individual functions like the following snippet:

`const { lang: { checks : { isNil } } }  = require('@wizhut_tech/wizjs');`

### I/O

* **Files** utility functions ... [[docs](docs/io_files.md)]

### Language

* **Arrays** utility functions ... [[docs](docs/lang_arrays.md)]
* **Check** utility functions ... [[docs](docs/lang_checks.md)]
* Control-**Flow** utilities ... [[docs](docs/lang_flow.md)]
* **functools** ... [[docs](docs/lang_functools.md)]
* **itertools** ... [[docs](docs/lang_itertools.md)]
* **Singleton** hack ... [[docs](docs/lang_singleton.md)]

### Math

* Utilities around **numbers** ... [[docs](docs/math_numbers.md)]

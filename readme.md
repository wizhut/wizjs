# Wizjs

A Javascript library (a few selected dependencies only) that contains utilities for enjoy-full every day programming. No, this library will not become another `lodash` :).

Use by importing:

`const wizjs = require('@wizhut_tech/wizjs')`. Returns an object structured like:

```
{
    lang: {
        checks: [functions],
        singleton: [functions],
        functools: [functions]
    },
    math: {
        numbers: [functions]
    }
}
```

### Language

* **Check** utility functions ... [[docs](docs/lang_checks.md)]
* Control-**Flow** utilities ... [[docs](docs/lang_flow.md)] -- *still in development* --
* **functools** ... [[docs](docs/lang_functools.md)]
* **Singleton** hack ... [[docs](docs/lang_singleton.md)]

### Math

* Utilities around **numbers** ... [[docs](docs/math_numbers.md)]

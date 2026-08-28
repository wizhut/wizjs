# Lang / Objects

* **pick(obj, keys)**: returns a new object with only the listed *keys* (an array, or a single key). Missing keys are skipped. If *obj* is `null`/`undefined` or not an object, returns `{}`. Assignments of `__proto__` / `prototype` / `constructor` use `defineProperty` so the result is not prototype-polluted.
* **omit(obj, keys)**: returns a new object with the listed *keys* removed. If *obj* is `null`/`undefined` or not an object, returns `{}`.
* **get(obj, path, defaultValue)**: reads a nested value. *path* may be a dotted string (`'a.b.c'`), an array of keys (`['a', 'b', 'c']`), or a single key. If any step is missing, or the resolved value is `undefined`, returns *defaultValue*. An existing `null` is returned as `null`, not as the default. If *path* is an empty string or empty array, returns *obj* itself.

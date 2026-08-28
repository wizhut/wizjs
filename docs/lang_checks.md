# Lang / Checks

* **isNil(arg)**: Checks if the `arg` is `undefined` or `null` and returns `true` (or `false` otherwise).
* **isArray(arg)**: Checks if the `arg` is an `array` and return `true` else `false`
* **isObject(arg)**: Checks if the `arg` is an `object` and return `true` else `false`
* **isString(arg)**: Checks if the `arg` is a `string` and return `true` else `false`
* **isNumber(arg)**: Checks if the `arg` is a `number` and return `true` else `false`
* **isBoolean(arg)**: Checks if the `arg` is a `boolean` and return `true` else `false`
* **isFunction(arg)**: Checks if the `arg` is a `function` (including async functions, generators, and classes) and return `true` else `false`
* **isInteger(arg)**: Checks if the `arg` is an integer number (`Number.isInteger`) and return `true` else `false`. `NaN`, `Infinity` and floats return `false`.
* **isEmpty(arg)**: Returns `true` for `null`/`undefined`, empty strings, empty arrays, empty `Map`/`Set`, and objects with no own enumerable keys. Numbers, booleans and functions are never empty.

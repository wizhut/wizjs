# Math / Numbers

* **toInteger(arg)**: Attempts to convert `arg` to `Integer`. Return `0` if the arg is `zero` or invalid value.
* **toNumber(arg)**: Attempts to convert `arg` to a number via `parseFloat`. Return `0` if the arg is `null`/`undefined` or not numeric. Unlike `toInteger`, fractional values are kept (`toNumber('1.5')` is `1.5`).
* **clamp(value, min, max)**: Constrains *value* to the inclusive range `[*min*, *max*]`. If *min* is greater than *max*, the bounds are swapped. Non-numeric *value* yields `NaN` (the same as `Number(value)`).
* **mod(n, m)**: Mathematical modulo whose sign follows the divisor (Python `%` / floored division). `mod(-1, 5)` is `4`; JavaScript's `%` would return `-1`. Return `0` if either argument is not finite or if *m* is `0`.

# Lang / Arrays

* **compact(arg)**: removes *null* and *undefined* values from an array, returns always an array. If the *arg* is invalid, it returns an empty array.
* **accumulate(operator, a, b)**: applies the operator to *a* and *b* then returns the result.
* **unique(arr)**: returns a new array with duplicate values removed, preserving first-seen order. Uses `SameValueZero` equality (so `NaN` matches `NaN`). If *arr* is `null`/`undefined`, returns an empty array.
* **chunk(arr, size)**: splits *arr* into arrays of length *size*. The last chunk may be shorter. If *arr* is `null`/`undefined` or *size* is less than `1`, returns an empty array.
* **flatten(arr)**: flattens *arr* by one level. Nested non-arrays are left as-is. If *arr* is `null`/`undefined`, returns an empty array.

## Classes

* **Operator**: Static class that configures *accumulate* method. Support *addition (Operator.plus)*, *subtraction (Operator.minus)*, *multiplication (Operator.multiply)* and *division (Operator.division)*. 

# Lang / Arrays

* **compact(arg)**: removes *null* and *undefined* values from an array, returns always an array. If the *arg* is invalid, it returns an empty array.
* **accumulate(operator, a, b)**: applies the operator to *a* and *b* then returns the result.

## Classes

* **Operator**: Static class that configures *accumulate* method. Support *addition (Operator.plus)*, *subtraction (Operator.minus)*, *multiplication (Operator.multiply)* and *division (Operator.division)*. 
# Lang / Singleton

In-memory caching of an async function's result, ensuring that it will be called only once. Mimics similar python decorators. It can easily, be used to store class instance variables.

### Module API

* **singleton(name, fn)**: register an `async` function (`fn`) by name.
* **getInstance(name)**: returns the instance for a specific `name`. Note that the `fn` is executed only when this method is called.

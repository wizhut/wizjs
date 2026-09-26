# Lang / Singleton

In-memory caching of an async function's result, so that it runs once and every later call gets the same result. Mimics similar Python decorators, and can hold a single shared instance of a class.

### Module API

* **singleton(name, fn)**: register an `async` function (`fn`) by name.
* **getInstance(name)**: returns the instance for `name`, running `fn` on the first call. Calls that arrive while that first run is still in progress wait for it and get the same instance. If `fn` throws, or resolves to `null` or `undefined`, nothing is cached and the next call runs it again. Returns `null` for a name that was never registered.

# Lang / itertools

* **count(start, step=1)**: A generator that counts from *start* with a specified *step*. Default stepping is *1*.
* **fn_count(start, step=1, fn)**: A generator that counts from *start* with a specified *step*. Default stepping is *1*. For each iteration the *fn* is called. To continue to the next iteration, the *fn* should return *true*. If not the iteration breaks,. 
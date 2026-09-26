const { isNil } = require('./checks.js');


const instances = {};
const wrappers = {};
const pending = {};



function singleton(name, fn) {
    wrappers[name] = fn;
}


async function getInstance(name){
    if (!isNil(instances[name])) {
        return instances[name];
    }

    if (isNil(wrappers[name])) {
        return null;
    }

    // Calls that arrive while the wrapper is still running share that run:
    // the first one starts it, the rest await the same promise. A wrapper that
    // throws, or resolves to null/undefined, leaves nothing cached, so the
    // next call runs it again.
    if (isNil(pending[name])) {
        pending[name] = (async () => {
            try {
                const instance = await wrappers[name]();
                instances[name] = instance;
                return instance;
            } finally {
                delete pending[name];
            }
        })();
    }

    return pending[name];
}


module.exports = {
    singleton,
    getInstance
}
const { isNil } = require('./checks.js');


const instances = {};
const wrappers = {};



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

    const wrapperFn = wrappers[name];
    const instance = await wrapperFn();

    instances[name] = instance;

    return instance;
}


module.exports = {
    singleton,
    getInstance
}
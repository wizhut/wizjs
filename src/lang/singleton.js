

const instances = {};
const wrappers = {};



function addSingleton(name, fn) {
    wrappers[name] = fn;
}


async function getInstance(name){
    if (instances[name] !== undefined) {
        return instances[name];
    }

    if (wrappers[name] === undefined) {
        return null;
    }

    const wrapperFn = wrappers[name];
    const instance = await wrapperFn();

    instances[name] = instance;

    return instance;
}


module.exports = {
    addSingleton,
    getInstance
}
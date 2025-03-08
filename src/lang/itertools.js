
const {toInteger} = require("../math/numbers");


function* cycle(start=0, step=1) {
    let iCount = toInteger(start);
    const iStep = toInteger(step);

    while (true) {
        yield iCount;
        iCount += step;
    }
}

function fn_cycle(start, fn, step=1) {
    const cycleGenerator = cycle(start, step);

    while (fn(cycleGenerator.next().value)) { }
}


module.exports = {
    cycle,
    fn_cycle
};

const {toInteger} = require("../math/numbers");


function* count(start=0, step=1) {
    let iCount = toInteger(start);
    const iStep = toInteger(step);

    while (true) {
        yield iCount;
        iCount += step;
    }
}

function fn_count(start, fn, step=1) {
    const countGenerator = count(start, step);

    while (fn(countGenerator.next().value)) { }
}


module.exports = {
    count,
    fn_count
};
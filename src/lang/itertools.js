const { toInteger } = require('../math/numbers.js');


function* count(start=0, step=1) {
    let iCount = toInteger(start);

    while (true) {
        yield iCount;
        iCount += step;
    }
}

function *repeat(arg, times=0) {
    let iTimes = toInteger(times);

    if (iTimes < 0) {
        iTimes = 0;
    }

    let iTimesLeft = iTimes;

    while (true) {
        if (iTimes === 0) {
            yield arg;
        }

        if (iTimesLeft > 0) {
            iTimesLeft -= 1;
            yield arg;
        }
    }
}

module.exports = {
    count,
    repeat
};
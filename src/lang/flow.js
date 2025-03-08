

function if_exception(fn, fn_noexc, fn_exc) {
    try {
        fn();
        fn_noexc();
    } catch (error) {
        fn_exc(error);
    }
}


module.exports = {
    if_exception
};
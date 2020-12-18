"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is_number = function (val) {
    return Number.isFinite(val) && !Number.isNaN(val);
};
exports.is_integer = function (num, loud) {
    if (loud === void 0) { loud = false; }
    var is_int = exports.is_number(num) && (num === 0 || (Math.round(num) / num) === 1);
    if (!is_int && loud)
        throw new Error("Not integer: " + num);
    return is_int;
};
exports.is_0_or_greater = function (num, loud) {
    if (loud === void 0) { loud = false; }
    var is_0_or_more = num >= 0;
    if (!is_0_or_more && loud)
        throw new Error("Not >= 0: " + num);
    return is_0_or_more;
};
exports.is_positive_integer = function (num, loud) {
    if (loud === void 0) { loud = false; }
    var isPosInt = exports.is_integer(num, false) && num > 0;
    if (!isPosInt && loud)
        throw new Error("Not positive integer: " + num);
    return isPosInt;
};
exports.is_0_or_greater_integer = function (num, loud) {
    if (loud === void 0) { loud = false; }
    var is_0_or_more_int = exports.is_integer(num, false) && exports.is_0_or_greater(num, false);
    if (!is_0_or_more_int && loud)
        throw new Error("Not integer >= 0: " + num);
    return is_0_or_more_int;
};
exports.integer_parser = function (val) {
    var value = parseInt(val, 10);
    return exports.is_integer(value) ? value : undefined;
};
exports.float_parser = function (val) {
    var value = parseFloat(val);
    return exports.is_number(value) ? value : undefined;
};
exports.integer_positive_parser = function (val) {
    var value = parseInt(val, 10);
    return exports.is_positive_integer(value) ? value : undefined;
};
exports.integer_0_or_more_parser = function (val) {
    var value = parseInt(val, 10);
    return exports.is_0_or_greater_integer(value) ? value : undefined;
};
//# sourceMappingURL=number.js.map
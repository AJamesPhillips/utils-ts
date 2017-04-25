"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function random_string(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
exports.random_string = random_string;
/**
 * @method bounded  Returns double
 * @param lower_bound inclusive
 * @param upper_bound exclusive
 */
function bounded(lower_bound, upper_bound) {
    return Math.random() * (upper_bound - lower_bound) + lower_bound;
}
exports.bounded = bounded;
//# sourceMappingURL=random.js.map
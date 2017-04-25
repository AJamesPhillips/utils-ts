"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
/**
 * Provide some light weight testing utils
 */
function expect_to_equal(value1, value2, test_name, throws) {
    if (test_name === void 0) { test_name = ""; }
    if (throws === void 0) { throws = true; }
    if (value1 !== value2) {
        var msg = "FAILED: \"" + test_name + "\" Values are not equal to each other: \"" + value1 + "\" !== \"" + value2 + "\"";
        if (throws) {
            throw new Error(msg);
        }
        else {
            console.error(msg);
        }
    }
    else {
        console.log("PASSED: \"" + test_name + "\"");
    }
}
exports.expect_to_equal = expect_to_equal;
function expect_to_contain(list_of_values, value, test_name) {
    if (test_name === void 0) { test_name = ''; }
    if (!_.includes(list_of_values, value)) {
        throw new Error("FAILED: \"" + test_name + "\" Value not contained in list: \"" + value + "\" not in \"" + list_of_values.map(function (v) { return v.toString(); }).join(', ') + "\"");
    }
    else {
        console.log("PASSED: \"" + test_name + "\"");
    }
}
exports.expect_to_contain = expect_to_contain;
//# sourceMappingURL=test_utils.js.map
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var correlation_1 = require("./correlation");
var standard_deviation_1 = require("./standard_deviation");
function linear_regression(data) {
    var result = correlation_1.sample_correlation(data);
    var x_standard_deviation = standard_deviation_1.sample_standard_deviation(result.x_stats);
    var y_standard_deviation = standard_deviation_1.sample_standard_deviation(result.y_stats);
    // Note again, OR'd with 0 incase result of calculation is NaN, e.g. when only
    // one data point and correlation, x and y standard_deviations are all 0
    var slope = ((result.correlation * y_standard_deviation) / x_standard_deviation) || 0;
    var intercept = result.y_stats.mean - (slope * result.x_stats.mean);
    var predict = function (x) { return (slope * x) + intercept; };
    return __assign({}, result, { x_standard_deviation: x_standard_deviation,
        y_standard_deviation: y_standard_deviation,
        slope: slope,
        intercept: intercept,
        predict: predict });
}
exports.linear_regression = linear_regression;
//# sourceMappingURL=linear_regression.js.map
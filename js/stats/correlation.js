"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var variance_1 = require("./variance");
/**
 * http://onlinestatbook.com/2/describing_bivariate_data/calculation.html
 */
function sample_correlation(data) {
    var x_stats = variance_1.sample_variance(data.map(function (v) { return v.x; }));
    var y_stats = variance_1.sample_variance(data.map(function (v) { return v.y; }));
    var x_sq_deviation_sum = x_stats.squared_deviation_from_mean.reduce(function (accum, v) { return accum + v; }, 0);
    var y_sq_deviation_sum = y_stats.squared_deviation_from_mean.reduce(function (accum, v) { return accum + v; }, 0);
    var xy_sum = x_stats.deviation_from_mean.reduce(function (accum, v, i) { return accum + (v * y_stats.deviation_from_mean[i]); }, 0);
    // OR'd with 0 as straight lines showing no correlation of x with y cause
    // `(0 ** 0.5)` which is NaN
    var correlation = (xy_sum / (Math.pow((x_sq_deviation_sum * y_sq_deviation_sum), 0.5))) || 0;
    return {
        x_stats: x_stats,
        y_stats: y_stats,
        x_sq_deviation_sum: x_sq_deviation_sum,
        y_sq_deviation_sum: y_sq_deviation_sum,
        xy_sum: xy_sum,
        correlation: correlation,
    };
}
exports.sample_correlation = sample_correlation;
//# sourceMappingURL=correlation.js.map
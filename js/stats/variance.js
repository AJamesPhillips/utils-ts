"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
/**
 * http://onlinestatbook.com/2/summarizing_distributions/variability.html
 */
function sample_variance(data, eplison) {
    if (eplison === void 0) { eplison = 1; }
    var mean = lodash_1.mean(data);
    var deviation_from_mean = data.map(function (v) { return v - mean; });
    var squared_deviation_from_mean = deviation_from_mean.map(function (d) { return d * d; });
    // calculate variance, aka sigma squared.  (sigma is the mean of the deviation_from_mean array)
    // Note: variance is OR'd with 0 here to give a reasonable default when
    // eplison is 1 and there is only one value in the data (otherwise
    // `n / (1-1)` gives NaN)
    var variance = (lodash_1.sum(squared_deviation_from_mean) / (data.length - eplison)) || 0;
    return {
        mean: mean,
        deviation_from_mean: deviation_from_mean,
        squared_deviation_from_mean: squared_deviation_from_mean,
        variance: variance,
    };
}
exports.sample_variance = sample_variance;
function population_variance(data) {
    return sample_variance(data, 0);
}
exports.population_variance = population_variance;
//# sourceMappingURL=variance.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
/**
 * http://onlinestatbook.com/2/summarizing_distributions/variability.html
 */
function sample_variance(data) {
    var mean = lodash_1.mean(data);
    var deviation_from_mean = data.map(function (v) { return v - mean; });
    var squared_deviation_from_mean = deviation_from_mean.map(function (d) { return d * d; });
    // calc_mean(deviation_from_mean) aka sigma
    var variance = lodash_1.mean(squared_deviation_from_mean); // aka sigma squared
    return {
        mean: mean,
        deviation_from_mean: deviation_from_mean,
        squared_deviation_from_mean: squared_deviation_from_mean,
        variance: variance,
    };
}
exports.sample_variance = sample_variance;
//# sourceMappingURL=variance.js.map
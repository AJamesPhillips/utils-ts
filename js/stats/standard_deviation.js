"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var variance_1 = require("./variance");
/**
 * http://onlinestatbook.com/2/summarizing_distributions/variability.html
 */
function sample_standard_deviation(data) {
    return Math.pow(variance_1.sample_variance(data).variance, 0.5);
}
exports.sample_standard_deviation = sample_standard_deviation;
//# sourceMappingURL=standard_deviation.js.map
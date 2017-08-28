"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var variance_1 = require("./variance");
function sample_standard_deviation(data) {
    if (data.length) {
        return Math.pow(variance_1.sample_variance(data).variance, 0.5);
    }
    return Math.pow(data.variance, 0.5);
}
exports.sample_standard_deviation = sample_standard_deviation;
//# sourceMappingURL=standard_deviation.js.map
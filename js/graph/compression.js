"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var linear_regression_1 = require("../stats/linear_regression");
var default_options = {
    //   min_points_to_assess: 500,
    max_points_per_line: 500,
    second_try_points_per_line: 16,
    search_depth: 5,
    threshold: 1,
};
function linear_compress(data, options) {
    if (options === void 0) { options = {}; }
    var opts = lodash_1.merge({}, default_options, options);
    var compressed_lines = [];
    if (data.length === 0)
        return compressed_lines;
    var reached_index = undefined;
    do {
        var start_data_index = reached_index || 0;
        var result = _linear_compress(data, start_data_index, opts);
        reached_index = result.reached_index;
        compressed_lines.push(result.compressed_line);
    } while (reached_index < (data.length - 1)); // && (data.length - start_data_index) >= opts.min_points_to_assess) {)
    return compressed_lines;
}
exports.linear_compress = linear_compress;
function _linear_compress(data, start_data_index, options) {
    /**
     * loop through the data from the start_data_index calculating mean, variance
     * standard deviation, until linear fit falls outside threshold, then
     * return compressed_line
     */
    var upper_end_data_index = Math.min(start_data_index + options.max_points_per_line - 1, data.length - 1);
    var line = get_compressed_line(data, { start_data_index: start_data_index, end_data_index: upper_end_data_index }, options);
    if (line)
        return line;
    var second_try_upper_end_data_index = Math.min(start_data_index + options.second_try_points_per_line - 1, data.length - 1);
    line = get_compressed_line(data, { start_data_index: start_data_index, end_data_index: second_try_upper_end_data_index }, options);
    var lower_end_data_index = line ? second_try_upper_end_data_index : start_data_index + 1;
    upper_end_data_index = line ? upper_end_data_index : second_try_upper_end_data_index;
    var tries = 2;
    while (tries < options.search_depth || !line) {
        var next_try_end_data_index = Math.ceil((upper_end_data_index - lower_end_data_index) / 2);
        line = get_compressed_line(data, { start_data_index: start_data_index, end_data_index: next_try_end_data_index }, options);
        lower_end_data_index = line ? next_try_end_data_index : lower_end_data_index;
        upper_end_data_index = line ? upper_end_data_index : (next_try_end_data_index - 1);
        tries += 1;
    }
    return line;
}
function get_compressed_line(data, kwargs, options) {
    var start_data_index = kwargs.start_data_index, end_data_index = kwargs.end_data_index;
    var result = linear_regression_1.linear_regression(data.slice(start_data_index, end_data_index));
    /**
     * max_diff should take into account slope of line, increasing as slope increases
     */
    var max_diff = ((Math.abs(result.slope) * options.threshold) / 2) + options.threshold;
    var good = all_points_are_close_to_fitted_line(result.predict, data, {
        start_data_index: start_data_index,
        end_data_index: end_data_index,
        max_diff: max_diff,
    });
    if (good) {
        return {
            reached_index: end_data_index,
            compressed_line: {
                start_point: data[start_data_index],
                end_point: data[end_data_index],
                count: (end_data_index - start_data_index) + 1
            }
        };
    }
    else {
        return null;
    }
}
function all_points_are_close_to_fitted_line(predict, data, kwargs) {
    var start_data_index = kwargs.start_data_index, end_data_index = kwargs.end_data_index, max_diff = kwargs.max_diff;
    /**
     * calculate difference between all points and fit line.  If any are
     * significantly different then reject this set of data and try a small set
     */
    for (var i = start_data_index; i < end_data_index; ++i) {
        var point = data[i];
        var y = predict(point.x);
        var diff = Math.abs(y - point.y);
        if (diff > max_diff) {
            return false;
        }
    }
    return true;
}
//# sourceMappingURL=compression.js.map
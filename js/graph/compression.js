"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var linear_regression_1 = require("../stats/linear_regression");
var default_options = {
    //   min_points_to_assess: 500,
    max_points_per_line: 500,
    second_try_points_per_line: 16,
    search_depth: 10,
    threshold: 1,
};
function linear_compress(data, options) {
    if (options === void 0) { options = {}; }
    var opts = lodash_1.merge({}, default_options, options);
    var compressed_lines = [];
    if (data.length === 0)
        return { compressed_lines: compressed_lines, reached_index: null };
    var reached_index = undefined;
    do {
        var start_data_index = reached_index || 0;
        var result = _linear_compress(data, start_data_index, opts);
        reached_index = result.reached_index;
        compressed_lines.push(result.compressed_line);
    } while (reached_index < (data.length - 1)); // && (data.length - start_data_index) >= opts.min_points_to_assess) {)
    return { compressed_lines: compressed_lines, reached_index: reached_index };
}
exports.linear_compress = linear_compress;
function _linear_compress(data, start_data_index, options) {
    /**
     * loop through the data from the start_data_index calculating mean, variance
     * standard deviation, until linear fit falls outside threshold, then
     * return compressed_line
     */
    var upper_end_data_index = Math.min(start_data_index + options.max_points_per_line - 1, data.length - 1);
    var line = get_compressed_line({ data: data, start_data_index: start_data_index, end_data_index: upper_end_data_index, options: options });
    if (line)
        return line;
    var second_try_upper_end_data_index = Math.min(start_data_index + options.second_try_points_per_line - 1, data.length - 1);
    line = get_compressed_line({ data: data, start_data_index: start_data_index, end_data_index: second_try_upper_end_data_index, options: options });
    // `start_data_index + 1` for lower_end_data_index when we don't get a line
    // because it is always possible to make a perfect fit with 2 points.
    var lower_end_data_index = line ? second_try_upper_end_data_index : start_data_index + 1;
    // `-1` because the line was unsuccessful at these upper limits
    upper_end_data_index = line ? upper_end_data_index : (second_try_upper_end_data_index - 1);
    var tries = 2;
    while (!line || (tries < options.search_depth && lower_end_data_index !== upper_end_data_index)) {
        var next_try_end_data_index = Math.floor((upper_end_data_index - lower_end_data_index) / 2) + lower_end_data_index;
        var latest_line = get_compressed_line({ data: data, start_data_index: start_data_index, end_data_index: next_try_end_data_index, options: options });
        lower_end_data_index = latest_line ? next_try_end_data_index : lower_end_data_index;
        upper_end_data_index = latest_line ? upper_end_data_index : (next_try_end_data_index - 1);
        // Update with latest_line if available, otherwise use older line
        line = latest_line || line;
        tries += 1;
    }
    return line;
}
function get_compressed_line(_a) {
    var data = _a.data, start_data_index = _a.start_data_index, end_data_index = _a.end_data_index, options = _a.options;
    var result = linear_regression_1.linear_regression(data.slice(start_data_index, end_data_index + 1));
    // max_diff takes into account slope of line by increasing as slope increases
    var max_diff = (Math.abs(result.slope) * options.threshold) + options.threshold;
    var good = all_points_are_close_to_fitted_line({
        predict: result.predict,
        data: data,
        start_data_index: start_data_index,
        end_data_index: end_data_index,
        max_diff: max_diff,
    });
    var count = (end_data_index - start_data_index) + 1;
    // Edge case: Test for count == 2 because when threshold is 0, even with only
    // two points in a line, the diff value can erroneously be > 0 and thus the
    // line is apparently never good even though by definition to should be perfect
    if (good || count == 2) {
        return {
            reached_index: end_data_index,
            compressed_line: {
                start_point: data[start_data_index],
                end_point: data[end_data_index],
                count: count
            }
        };
    }
    else {
        return null;
    }
}
function all_points_are_close_to_fitted_line(_a) {
    var predict = _a.predict, data = _a.data, start_data_index = _a.start_data_index, end_data_index = _a.end_data_index, max_diff = _a.max_diff;
    /**
     * calculate difference between all points and fit line.  If any are
     * significantly different then reject this set of data and try a small set
     */
    for (var i = start_data_index; i <= end_data_index; ++i) {
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
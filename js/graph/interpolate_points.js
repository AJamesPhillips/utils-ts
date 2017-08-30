"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var number_1 = require("../number");
/**
 * TODO: remove this from here and place in a `data` directory
 */
function interpolate_points(data, options) {
    if (options === void 0) { options = {}; }
    var previous_value_index;
    var next_value_index;
    var new_data = data.slice(0);
    var regions = [];
    var modified_start = false;
    var modified_end = false;
    if (new_data.length) {
        if (number_1.is_number(options.start) && !number_1.is_number(new_data[0])) {
            new_data[0] = options.start;
            modified_start = true;
        }
        if (number_1.is_number(options.end) && !number_1.is_number(new_data[new_data.length - 1])) {
            new_data[new_data.length - 1] = options.end;
            modified_end = true;
        }
    }
    var open_region;
    new_data.forEach(function (value, i) {
        if (number_1.is_number(value)) {
            if (modified_start && i === 0) {
                open_region = { start: i };
            }
            else {
                if (modified_end && i === new_data.length - 1 && !open_region) {
                    open_region = { start: previous_value_index };
                }
                // close any open region
                if (open_region) {
                    open_region.end = i;
                    regions.push(open_region);
                    open_region = undefined;
                }
            }
            previous_value_index = i;
            return;
        }
        // calculate previousValue
        if (!number_1.is_number(previous_value_index)) {
            new_data[i] = null;
            return;
        }
        var previous_value = new_data[previous_value_index];
        if (!number_1.is_number(previous_value)) {
            new_data[i] = null;
            return;
        }
        // calculate nextValue
        // update nextValueIndex if now redundant
        if (!number_1.is_number(next_value_index) || i > next_value_index) {
            next_value_index = undefined;
            // search forwards to find nextValueIndex
            for (var j = i + 1; j < new_data.length; ++j) {
                if (number_1.is_number(new_data[j])) {
                    next_value_index = j;
                    break;
                }
            }
        }
        if (!number_1.is_number(next_value_index)) {
            new_data[i] = null;
            return;
        }
        var next_value = new_data[next_value_index];
        if (!number_1.is_number(next_value)) {
            new_data[i] = null;
            return;
        }
        // linear interpolation
        var index_diff = next_value_index - previous_value_index;
        var index_progress = i - previous_value_index;
        var index_ratio = index_progress / index_diff;
        var value_diff = next_value - previous_value;
        new_data[i] = previous_value + (value_diff * index_ratio);
        // open a new region
        if (!open_region) {
            open_region = { start: i - 1 };
        }
    });
    if (open_region) {
        open_region.end = new_data.length - 1;
        regions.push(open_region);
    }
    return {
        data: new_data,
        regions: regions.map(function (r) { r.style = "dashed"; return r; })
    };
}
exports.interpolate_points = interpolate_points;
//# sourceMappingURL=interpolate_points.js.map
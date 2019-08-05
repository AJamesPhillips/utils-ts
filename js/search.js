"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function binary_search(list, predicate) {
    if (list.length === 0)
        return undefined;
    var low = 0;
    var high = list.length - 1;
    function next_mid() {
        return Math.round(((high - low) / 2) + low);
    }
    var mid = next_mid();
    var match = predicate(list[mid]);
    while (match !== 0) {
        if (match === -1) {
            high = mid - 1;
        }
        else {
            low = mid + 1;
        }
        if (low > high)
            return undefined;
        mid = next_mid();
        match = predicate(list[mid]);
    }
    return { index: mid, value: list[mid] };
}
exports.binary_search = binary_search;
function make_value_predicate(value) {
    return function (v) { return v === value ? 0 : (v > value ? -1 : 1); };
}
exports.make_value_predicate = make_value_predicate;
function binary_search_for_value(list, value) {
    var predicate = make_value_predicate(value);
    return binary_search(list, predicate);
}
exports.binary_search_for_value = binary_search_for_value;
function binary_search_for_value_in_range(list, value) {
    var transformed_list = list.map(function (v, index) { return ({
        min: index === 0 ? undefined : list[index - 1],
        max: v
    }); });
    var predicate = function (v) {
        var result = 0;
        if (v.max < value) {
            result = 1;
        }
        else if (v.min !== undefined && value <= v.min) {
            result = -1;
        }
        return result;
    };
    var result = binary_search(transformed_list, predicate);
    return result ? { index: result.index, value: result.value.max } : undefined;
}
exports.binary_search_for_value_in_range = binary_search_for_value_in_range;
function binary_search_vlookup(list, value) {
    var transformed_list = list.map(function (v, index) { return ({
        value: v.value,
        min: index === 0 ? undefined : list[index - 1].lookup_max,
        max: v.lookup_max
    }); });
    var predicate = function (v) {
        var result = 0;
        if (v.max < value) {
            result = 1;
        }
        else if (v.min !== undefined && value <= v.min) {
            result = -1;
        }
        return result;
    };
    var result = binary_search(transformed_list, predicate);
    return result ? { index: result.index, value: list[result.index] } : undefined;
}
exports.binary_search_vlookup = binary_search_vlookup;
//# sourceMappingURL=search.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
function copy_list_with_replace(list_t, index, new_obj) {
    return list_t
        .slice(0, index)
        .concat([new_obj])
        .concat(list_t.slice(index + 1, list_t.length));
}
exports.copy_list_with_replace = copy_list_with_replace;
function copy_list_excluding_index(list_t, index) {
    return list_t.slice(0, index).concat(list_t.slice(index + 1, list_t.length));
}
exports.copy_list_excluding_index = copy_list_excluding_index;
function find_index_by_predicate(list, predicate) {
    return _.findIndex(list, predicate);
}
exports.find_index_by_predicate = find_index_by_predicate;
function update_entry_by_predicate_and_copy_list(list_t, predicate, update) {
    var index = find_index_by_predicate(list_t, predicate);
    if (index === -1)
        throw new Error("No entry found with predicate");
    var updated_obj = _.assign({}, list_t[index], update);
    return copy_list_with_replace(list_t, index, updated_obj);
}
exports.update_entry_by_predicate_and_copy_list = update_entry_by_predicate_and_copy_list;
function update_entries_by_predicate_and_copy_list(list_t, predicate, update_fn) {
    var new_list = [];
    var changed_list = false;
    for (var i = 0, len = list_t.length; i < len; ++i) {
        var item = list_t[i];
        if (predicate(item)) {
            changed_list = true;
            new_list.push(update_fn(item));
        }
        else {
            new_list.push(item);
        }
    }
    if (!changed_list)
        new_list = list_t;
    return new_list;
}
exports.update_entries_by_predicate_and_copy_list = update_entries_by_predicate_and_copy_list;
//# sourceMappingURL=array.js.map
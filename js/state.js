"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var reduce_reducers_1 = require("reduce-reducers");
function typed_reduce_reducers() {
    var functions = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        functions[_i] = arguments[_i];
    }
    return reduce_reducers_1.default.apply(void 0, functions);
}
exports.typed_reduce_reducers = typed_reduce_reducers;
/** Returns a typed function useful inside reducer functions.  It safely takes
 * the old state and the new partial state and creates a new object.
 * This makes it easier to ensure the reducer function is pure and free from
 * side effects (in this case
 * mutating the object passed into the reducer as the current state argument).
 */
function make_new_state_generic() {
    var make_new_state = function (old_state, new_partial_state) {
        return _.assign({}, old_state, new_partial_state);
    };
    return make_new_state;
}
exports.make_new_state_generic = make_new_state_generic;
//# sourceMappingURL=state.js.map
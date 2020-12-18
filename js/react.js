"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var React = require("react");
// Note the large number of  "// tslint:disable-line" and "tslint:disable-next-line" should be removed and
// replaced with the correct types (or just made shorter)
var ReactComponentBase = /** @class */ (function (_super) {
    __extends(ReactComponentBase, _super);
    function ReactComponentBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReactComponentBase.prototype.updateState = function (partial_state) {
        var merged = Object.assign({}, this.state, partial_state);
        this.setState(merged, undefined, false);
    };
    ReactComponentBase.prototype.setState = function (state, callback, warn) {
        if (warn === void 0) { warn = true; }
        if (warn) {
            console.warn("Currently we store all state in Redux store.");
        }
        _super.prototype.setState.call(this, state, callback);
    };
    return ReactComponentBase;
}(React.Component));
exports.ReactComponentBase = ReactComponentBase;
function route_props_to_string(route_props) {
    return route_props.location.pathname + route_props.location.search;
}
exports.route_props_to_string = route_props_to_string;
function key_in_query(props, key) {
    var query = props.location.query; // tslint:disable-line
    return lodash_1.has(query, key);
}
exports.key_in_query = key_in_query;
function value_from_query(props, key) {
    return props.location.query[key]; // tslint:disable-line
}
exports.value_from_query = value_from_query;
//# sourceMappingURL=react.js.map
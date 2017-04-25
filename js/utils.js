"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
exports.capitalize_first_letter = function (val) {
    return val.charAt(0).toUpperCase() + val.slice(1);
};
exports.is_browser = function () { return typeof window !== "undefined"; };
function to_pojo(obj) {
    var pojo = {};
    if (obj instanceof Array) {
        pojo = obj.map(to_pojo);
    }
    else {
        pojo = {};
        Object.getOwnPropertyNames(obj).forEach(function (name) {
            var value = obj[name];
            if (value === null || value === undefined)
                return;
            if (typeof value === "object") {
                value = to_pojo(value);
            }
            // console.log("+defining property....", name, {value: value}, pojo)
            Object.defineProperty(pojo, name, { value: value, writable: true, enumerable: true });
            // console.log("-defining property....", name, {value: value}, pojo)
        });
    }
    // console.log("to_pojo", JSON.stringify(obj), Object.getOwnPropertyNames(obj))
    return pojo;
}
exports.to_pojo = to_pojo;
function handle_error(handler_name) {
    return function (error) {
        console.error("ERROR: " + handler_name + ": " + error.toString());
        throw error;
    };
}
exports.handle_error = handle_error;
function simple_objects_equal(props) {
    return function (obj1, obj2) {
        if (obj1 === obj2)
            return true;
        if (!obj1 || !obj2)
            return false;
        for (var i = 0; i < props.length; ++i) {
            var key = props[i];
            if (_.isDate(obj1[key])) {
                if (obj1[key].toString() !== obj2[key].toString())
                    return false;
            }
            else {
                if (obj1[key] !== obj2[key])
                    return false;
            }
        }
        return true;
    };
}
exports.simple_objects_equal = simple_objects_equal;
function parse_query_params(query_params) {
    // remove beginning ?
    query_params = query_params.slice(1);
    return query_params.split(",").reduce(function (accum, p) {
        var _a = p.split("="), key = _a[0], value = _a[1];
        accum[key] = value;
        return accum;
    }, {});
}
exports.parse_query_params = parse_query_params;
/**
 * Converts a raw string into a base64 encoded string
 */
function node_btoa(raw) {
    var base64;
    if (exports.is_browser()) {
        base64 = window.btoa(raw);
    }
    else {
        base64 = new Buffer(raw).toString("base64");
    }
    return base64;
}
exports.node_btoa = node_btoa;
/**
 * Converts a base64 encoded string back into a utf8 string
 */
function node_atob(b64_encoded) {
    var decoded;
    if (exports.is_browser()) {
        decoded = window.atob(b64_encoded);
    }
    else {
        decoded = new Buffer(b64_encoded, "base64").toString();
    }
    return decoded;
}
exports.node_atob = node_atob;
function encode_details(details) {
    var details_str = JSON.stringify(details);
    var base64_details = node_btoa(details_str);
    return encodeURIComponent(base64_details);
}
exports.encode_details = encode_details;
/**
 * Utility function to create a K:V from a list of strings
 * @see {@link https://basarat.gitbooks.io/typescript/docs/types/literal-types.html}
 */
function str_enum(o) {
    return o.reduce(function (res, key) {
        res[key] = key;
        return res;
    }, Object.create(null));
}
exports.str_enum = str_enum;
//# sourceMappingURL=utils.js.map
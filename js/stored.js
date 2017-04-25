"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parse_date(value) {
    return value && new Date(value.toString());
}
exports.parse_date = parse_date;
function parse_bool(value) {
    return value && (value.toString() === "true");
}
exports.parse_bool = parse_bool;
//# sourceMappingURL=stored.js.map
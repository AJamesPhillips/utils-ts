"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
describe("str_enum", function () {
    it("should provide values", function () {
        var DOUBLES = utils_1.str_enum(['AA', 'BB']);
        expect(DOUBLES.AA).toBe('AA');
        var bb = { kind: 'BB' };
        expect(bb.kind).toBe(DOUBLES.BB);
    });
});
describe("parse_query_params", function () {
    it("should no parameters or empty string", function () {
        var result = utils_1.parse_query_params('?');
        expect(result).toEqual({});
        result = utils_1.parse_query_params('');
        expect(result).toEqual({});
    });
    it("should handle 1 parameters", function () {
        var result = utils_1.parse_query_params('?limit=1d');
        expect(result).toEqual({ limit: '1d' });
    });
    it("should handle 2 parameters", function () {
        var result = utils_1.parse_query_params('?threshold=1&limit=1d');
        expect(result).toEqual({ threshold: '1', limit: '1d' });
    });
});
//# sourceMappingURL=utils.test.js.map
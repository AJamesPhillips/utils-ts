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
//# sourceMappingURL=utils.test.js.map
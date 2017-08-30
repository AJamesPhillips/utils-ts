"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var compression_1 = require("../../graph/compression");
describe("graph linear_compress", function () {
    it("single point", function () {
        var result = compression_1.linear_compress([{ x: 1, y: 1 }]);
        expect(result).toEqual([{ start_point: { x: 1, y: 1 }, end_point: { x: 1, y: 1 }, count: 1 }]);
    });
    it("two points", function () {
        var result = compression_1.linear_compress([{ x: 1, y: 1 }, { x: 3, y: 3 }]);
        expect(result).toEqual([{ start_point: { x: 1, y: 1 }, end_point: { x: 3, y: 3 }, count: 2 }]);
        result = compression_1.linear_compress([{ x: 1, y: 1 }, { x: 3, y: -3 }]);
        expect(result).toEqual([{ start_point: { x: 1, y: 1 }, end_point: { x: 3, y: -3 }, count: 2 }]);
        result = compression_1.linear_compress([{ x: 1, y: 1 }, { x: -3, y: -3 }]);
        expect(result).toEqual([{ start_point: { x: 1, y: 1 }, end_point: { x: -3, y: -3 }, count: 2 }]);
    });
    it("three linear points", function () {
        var result = compression_1.linear_compress([{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }]);
        expect(result).toEqual([{ start_point: { x: 1, y: 1 }, end_point: { x: 3, y: 3 }, count: 3 }]);
        result = compression_1.linear_compress([{ x: 1, y: 1 }, { x: 2, y: -2 }, { x: 3, y: -3 }]);
        expect(result).toEqual([{ start_point: { x: 1, y: 1 }, end_point: { x: 3, y: -3 }, count: 3 }]);
        result = compression_1.linear_compress([{ x: 1, y: 1 }, { x: -2, y: -2 }, { x: -3, y: -3 }]);
        expect(result).toEqual([{ start_point: { x: 1, y: 1 }, end_point: { x: -3, y: -3 }, count: 3 }]);
    });
    it("three nonlinear points outside threshold", function () {
        var result = compression_1.linear_compress([{ x: 1, y: 1 }, { x: 2, y: -2 }, { x: 3, y: 3 }], { threshold: 0 });
        expect(result).toEqual([
            { start_point: { x: 1, y: 1 }, end_point: { x: 2, y: -2 }, count: 2 },
            { start_point: { x: 2, y: -2 }, end_point: { x: 3, y: 3 }, count: 2 }
        ]);
    });
    it("three nonlinear points inside threshold", function () {
        var result = compression_1.linear_compress([{ x: 1, y: 1 }, { x: 2, y: -2 }, { x: 3, y: 3 }], { threshold: 10 });
        expect(result).toEqual([{ start_point: { x: 1, y: 1 }, end_point: { x: 3, y: 3 }, count: 3 }]);
    });
});
//# sourceMappingURL=compression.test.js.map
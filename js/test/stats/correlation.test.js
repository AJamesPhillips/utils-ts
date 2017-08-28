"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var correlation_1 = require("../../stats/correlation");
describe("sample_correlation", function () {
    it("works with a list of numbers", function () {
        var result = correlation_1.sample_correlation([{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 3 }]);
        expect(result.correlation).toEqual(1);
        result = correlation_1.sample_correlation([{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 1 }]);
        expect(result.correlation).toEqual(0);
        var data = [
            { x: 1, y: 4 },
            { x: 3, y: 6 },
            { x: 5, y: 10 },
            { x: 5, y: 12 },
            { x: 6, y: 13 },
        ];
        result = correlation_1.sample_correlation(data);
        expect(result.correlation).toEqual(0.9682458365518541);
        data = [
            { x: 12, y: 10 },
            { x: 9, y: 9 },
            { x: 12, y: 12 },
            { x: 7, y: 6 },
            { x: 10, y: 8 },
            { x: 10, y: 8 },
            { x: 10, y: 9 },
            { x: 11, y: 11 },
            { x: 10, y: 9 },
            { x: 9, y: 11 },
            { x: 9, y: 12 },
            { x: 10, y: 6 },
            { x: 7, y: 10 },
            { x: 12, y: 12 },
            { x: 10, y: 9 },
            { x: 10, y: 13 },
            { x: 11, y: 12 },
            { x: 11, y: 7 },
            { x: 11, y: 11 },
            { x: 7, y: 11 },
            { x: 8, y: 9 },
            { x: 12, y: 8 },
            { x: 13, y: 10 },
            { x: 11, y: 12 },
            { x: 9, y: 8 },
        ];
        result = correlation_1.sample_correlation(data);
        expect(result.correlation).toEqual(0.23513557036544702);
    });
});
//# sourceMappingURL=correlation.test.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var linear_regression_1 = require("../../stats/linear_regression");
describe("linear_regression", function () {
    it("works with a list of numbers", function () {
        var data = [
            { x: 1.00, y: 1.00 },
            { x: 2.00, y: 2.00 },
            { x: 3.00, y: 1.30 },
            { x: 4.00, y: 3.75 },
            { x: 5.00, y: 2.25 },
        ];
        var result = linear_regression_1.linear_regression(data);
        expect(result.slope).toEqual(0.425);
        expect(result.intercept).toEqual(0.7850000000000001);
    });
});
//# sourceMappingURL=linear_regression.test.js.map
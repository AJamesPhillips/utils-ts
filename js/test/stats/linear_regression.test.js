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
    it("correct mean of x and y", function () {
        var data = [
            { x: 1, y: 1 },
            { x: 2, y: 2 },
            { x: 3, y: 1 },
        ];
        var result = linear_regression_1.linear_regression(data);
        expect(result.x_stats.mean).toEqual(2);
        expect(result.y_stats.mean).toEqual(1.3333333333333333);
        expect(result.slope).toEqual(0);
        expect(result.intercept).toEqual(1.3333333333333333);
    });
    it("correct predict function with 1 value", function () {
        var data = [{ x: 1, y: 1 }];
        var result = linear_regression_1.linear_regression(data);
        expect(result.x_stats.mean).toEqual(1);
        expect(result.y_stats.mean).toEqual(1);
        expect(result.slope).toEqual(0);
        expect(result.intercept).toEqual(1);
        expect(result.predict(1)).toEqual(1);
        expect(result.predict(2)).toEqual(1);
        expect(result.predict(3)).toEqual(1);
    });
    it("correct predict function with 3 values", function () {
        var data = [
            { x: 1, y: 1 },
            { x: 2, y: 1 },
            { x: 3, y: 1 },
        ];
        var result = linear_regression_1.linear_regression(data);
        expect(result.x_stats.mean).toEqual(2);
        expect(result.y_stats.mean).toEqual(1);
        expect(result.slope).toEqual(0);
        expect(result.intercept).toEqual(1);
        expect(result.predict(1)).toEqual(1);
        expect(result.predict(2)).toEqual(1);
        expect(result.predict(3)).toEqual(1);
    });
});
//# sourceMappingURL=linear_regression.test.js.map
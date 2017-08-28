"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var variance_1 = require("../../stats/variance");
describe("sample_variance", function () {
    it("works with a list of numbers", function () {
        var result = variance_1.sample_variance([1, 2, 2, 3]);
        expect(result.variance).toEqual(0.5);
        result = variance_1.sample_variance([1, 2, 3, 4, 5]);
        expect(result.variance).toEqual(2);
        result = variance_1.sample_variance([-2, -1, 0, 1, 2]);
        expect(result.variance).toEqual(2);
        result = variance_1.sample_variance([9, 9, 9, 8, 8, 8, 8, 7, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 5, 5]);
        expect(result.variance).toEqual(1.5);
    });
});
//# sourceMappingURL=variance.test.js.map
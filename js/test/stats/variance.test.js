"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var variance_1 = require("../../stats/variance");
describe("sample_variance", function () {
    it("works with a list of numbers", function () {
        /** http://onlinestatbook.com/2/regression/intro.html */
        var result = variance_1.sample_variance([1.00, 2.00, 1.30, 3.75, 2.25]);
        expect(result.variance).toEqual(1.14925); //  1.14925 comes from 1.072 ** 2
    });
});
describe("population_variance", function () {
    it("works with a list of numbers", function () {
        var result = variance_1.population_variance([1, 2, 2, 3]);
        expect(result.variance).toEqual(0.5);
        result = variance_1.population_variance([1, 2, 3, 4, 5]);
        expect(result.variance).toEqual(2);
        result = variance_1.population_variance([-2, -1, 0, 1, 2]);
        expect(result.variance).toEqual(2);
        /** http://onlinestatbook.com/2/summarizing_distributions/variability.html */
        result = variance_1.population_variance([9, 9, 9, 8, 8, 8, 8, 7, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 5, 5]);
        expect(result.variance).toEqual(1.5);
    });
});
//# sourceMappingURL=variance.test.js.map
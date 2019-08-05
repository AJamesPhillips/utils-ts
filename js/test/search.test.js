"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var search_1 = require("../search");
describe("binary_search", function () {
    it("no values", function () {
        expect(search_1.binary_search([], function () { return 0; })).toEqual(undefined);
    });
    it("no matching value", function () {
        expect(search_1.binary_search([1], function () { return -1; })).toEqual(undefined);
        expect(search_1.binary_search([1], function () { return 1; })).toEqual(undefined);
    });
    it("no matching value if array not sorted", function () {
        var find_one = search_1.make_value_predicate(1);
        expect(search_1.binary_search([10, 9, 8, 1], find_one)).toEqual(undefined);
    });
    it("matching value", function () {
        var find_one = search_1.make_value_predicate(2);
        expect(search_1.binary_search([2], find_one)).toEqual({ index: 0, value: 2 });
        expect(search_1.binary_search([1, 2], find_one)).toEqual({ index: 1, value: 2 });
        expect(search_1.binary_search([1, 2, 3], find_one)).toEqual({ index: 1, value: 2 });
    });
});
describe("binary_search_for_value_in_range", function () {
    it("matching value", function () {
        expect(search_1.binary_search_for_value_in_range([2], 2)).toEqual({ index: 0, value: 2 });
        expect(search_1.binary_search_for_value_in_range([1, 2], 2)).toEqual({ index: 1, value: 2 });
        expect(search_1.binary_search_for_value_in_range([1, 2, 3], 2)).toEqual({ index: 1, value: 2 });
    });
    it("sets min correctly", function () {
        expect(search_1.binary_search_for_value_in_range([-2], -2)).toEqual({ index: 0, value: -2 });
    });
});
//# sourceMappingURL=search.test.js.map
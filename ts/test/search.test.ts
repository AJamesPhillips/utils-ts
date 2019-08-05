import {
    binary_search,
    make_value_predicate,
    // binary_search_for_value,
    binary_search_for_value_in_range,
    binary_search_vlookup,
} from "../search"

describe("binary_search", function() {
    it("no values", function() {
        expect(binary_search([], () => 0)).toEqual(undefined)
    })

    it("no matching value", function() {
        expect(binary_search([1], () => -1)).toEqual(undefined)
        expect(binary_search([1], () => 1)).toEqual(undefined)
    })

    it("no matching value if array not sorted", function() {
        const find_one = make_value_predicate(1)
        expect(binary_search([10, 9, 8, 1], find_one)).toEqual(undefined)
    })

    it("matching value", function() {
        const find_one = make_value_predicate(2)
        expect(binary_search([2], find_one)).toEqual({ index: 0, value: 2 })
        expect(binary_search([1, 2], find_one)).toEqual({ index: 1, value: 2 })
        expect(binary_search([1, 2, 3], find_one)).toEqual({ index: 1, value: 2 })
    })
})

describe("binary_search_for_value_in_range", function() {
    it("matching value", function() {
        expect(binary_search_for_value_in_range([2], 2)).toEqual({ index: 0, value: 2 })
        expect(binary_search_for_value_in_range([1, 2], 2)).toEqual({ index: 1, value: 2 })
        expect(binary_search_for_value_in_range([1, 2, 3], 2)).toEqual({ index: 1, value: 2 })
        expect(binary_search_for_value_in_range([1, 2, 3], 1)).toEqual({ index: 0, value: 1 })
    })

    it("sets min correctly", function() {
        expect(binary_search_for_value_in_range([-2], -2)).toEqual({ index: 0, value: -2 })
    })
})

describe("binary_search_vlookup", function() {
    function e<E> (value: E, lookup_max: number) {
        return { value, lookup_max }
    }

    it("matching value", function() {
        expect(binary_search_vlookup([e("two", 2)], 2)).toEqual({ index: 0, value: e("two", 2) })
        expect(binary_search_vlookup([e("one", 1), e("two", 2)], 2)).toEqual({ index: 1, value: e("two", 2) })
        expect(binary_search_vlookup([e("one", 1), e("two", 2), e("three", 3)], 2)).toEqual({ index: 1, value: e("two", 2) })
        expect(binary_search_vlookup([e("one", 1), e("two", 2), e("three", 3)], 1)).toEqual({ index: 0, value: e("one", 1) })
    })

    it("sets min correctly", function() {
        expect(binary_search_vlookup([e("-two", -2)], -2)).toEqual({ index: 0, value: e("-two", -2) })
    })
})

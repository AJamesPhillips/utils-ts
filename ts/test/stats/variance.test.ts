import { sample_variance, population_variance } from "../../stats/variance";

describe("sample_variance", () => {

    it("works with a list of numbers", () => {

        /** http://onlinestatbook.com/2/regression/intro.html */
        let result = sample_variance([1.00, 2.00, 1.30, 3.75, 2.25])
        expect(result.variance).toEqual(1.14925)  //  1.14925 comes from 1.072 ** 2

    })
})

describe("population_variance", () => {

    it("works with a list of numbers", () => {

        let result = population_variance([1, 2, 2, 3])
        expect(result.variance).toEqual(0.5)

        result = population_variance([1, 2, 3, 4, 5])
        expect(result.variance).toEqual(2)

        result = population_variance([-2, -1, 0, 1, 2])
        expect(result.variance).toEqual(2)

        /** http://onlinestatbook.com/2/summarizing_distributions/variability.html */
        result = population_variance([9, 9, 9, 8, 8, 8, 8, 7, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 5, 5])
        expect(result.variance).toEqual(1.5)
    })
})

import { sample_variance } from "../../stats/variance";

describe("sample_variance", () => {

    it("works with a list of numbers", () => {
        let result = sample_variance([1, 2, 2, 3])
        expect(result.variance).toEqual(0.5)

        result = sample_variance([1, 2, 3, 4, 5])
        expect(result.variance).toEqual(2)

        result = sample_variance([-2, -1, 0, 1, 2])
        expect(result.variance).toEqual(2)

        result = sample_variance([9, 9, 9, 8, 8, 8, 8, 7, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 5, 5])
        expect(result.variance).toEqual(1.5)
    })
})

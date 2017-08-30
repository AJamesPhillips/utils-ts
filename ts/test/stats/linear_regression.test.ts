import { linear_regression } from "../../stats/linear_regression";

describe("linear_regression", () => {

    it("works with a list of numbers", () => {

        const data = [
            {x: 1.00, y: 1.00},
            {x: 2.00, y: 2.00},
            {x: 3.00, y: 1.30},
            {x: 4.00, y: 3.75},
            {x: 5.00, y: 2.25},
        ]

        const result = linear_regression(data)

        expect(result.slope).toEqual(0.425)
        expect(result.intercept).toEqual(0.7850000000000001)
    })
})

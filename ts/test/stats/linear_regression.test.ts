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

    it("correct mean of x and y", () => {

        const data = [
            {x: 1, y: 1},
            {x: 2, y: 2},
            {x: 3, y: 1},
        ]

        const result = linear_regression(data)

        expect(result.x_stats.mean).toEqual(2)
        expect(result.y_stats.mean).toEqual(1.3333333333333333)
        expect(result.slope).toEqual(0)
        expect(result.intercept).toEqual(1.3333333333333333)
    })

    it("correct predict function with 1 value", () => {

        const data = [{x: 1, y: 1}]
        const result = linear_regression(data)

        expect(result.x_stats.mean).toEqual(1)
        expect(result.y_stats.mean).toEqual(1)
        expect(result.slope).toEqual(0)
        expect(result.intercept).toEqual(1)
        expect(result.predict(1)).toEqual(1)
        expect(result.predict(2)).toEqual(1)
        expect(result.predict(3)).toEqual(1)
    })

    it("correct predict function with 3 values", () => {

        const data = [
            {x: 1, y: 1},
            {x: 2, y: 1},
            {x: 3, y: 1},
        ]

        const result = linear_regression(data)

        expect(result.x_stats.mean).toEqual(2)
        expect(result.y_stats.mean).toEqual(1)
        expect(result.slope).toEqual(0)
        expect(result.intercept).toEqual(1)
        expect(result.predict(1)).toEqual(1)
        expect(result.predict(2)).toEqual(1)
        expect(result.predict(3)).toEqual(1)
    })
})

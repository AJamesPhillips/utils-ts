import { linear_compress } from "../../graph/compression";

describe("graph linear_compress", () => {

    it("single point", () => {
        let result = linear_compress([{x: 1, y: 1}])
        expect(result).toEqual([{start_point: {x: 1, y: 1}, end_point: {x: 1, y: 1}, count: 1}])
    })

    it("two points", () => {
        let result = linear_compress([{x: 1, y: 1}, {x: 3, y: 3}])
        expect(result).toEqual([{start_point: {x: 1, y: 1}, end_point: {x: 3, y: 3}, count: 2}])

        result = linear_compress([{x: 1, y: 1}, {x: 3, y: -3}])
        expect(result).toEqual([{start_point: {x: 1, y: 1}, end_point: {x: 3, y: -3}, count: 2}])

        result = linear_compress([{x: 1, y: 1}, {x: -3, y: -3}])
        expect(result).toEqual([{start_point: {x: 1, y: 1}, end_point: {x: -3, y: -3}, count: 2}])
    })

    it("three linear points", () => {
        let result = linear_compress([{x: 1, y: 1}, {x: 2, y: 2}, {x: 3, y: 3}])
        expect(result).toEqual([{start_point: {x: 1, y: 1}, end_point: {x: 3, y: 3}, count: 3}])

        result = linear_compress([{x: 1, y: 1}, {x: 2, y: -2}, {x: 3, y: -3}])
        expect(result).toEqual([{start_point: {x: 1, y: 1}, end_point: {x: 3, y: -3}, count: 3}])

        result = linear_compress([{x: 1, y: 1}, {x: -2, y: -2}, {x: -3, y: -3}])
        expect(result).toEqual([{start_point: {x: 1, y: 1}, end_point: {x: -3, y: -3}, count: 3}])
    })

    it("three nonlinear points outside threshold", () => {
        let result = linear_compress([{x: 1, y: 1}, {x: 2, y: -2}, {x: 3, y: 3}], {threshold: 0})
        expect(result).toEqual([
            {start_point: {x: 1, y: 1}, end_point: {x: 2, y: -2}, count: 2},
            {start_point: {x: 2, y: -2}, end_point: {x: 3, y: 3}, count: 2}
        ])
    })

    it("three nonlinear points inside threshold", () => {
        let result = linear_compress([{x: 1, y: 1}, {x: 2, y: -2}, {x: 3, y: 3}], {threshold: 10})
        expect(result).toEqual([{start_point: {x: 1, y: 1}, end_point: {x: 3, y: 3}, count: 3}])
    })

})

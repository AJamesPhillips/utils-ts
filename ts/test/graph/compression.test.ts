import { linear_compress } from "../../graph/compression";

describe("graph linear_compress", () => {

    it("single point", () => {
        let result = linear_compress([{x: 1, y: 1}])
        expect(result).toEqual({
            reached_index: 0,
            compressed_lines: [{start_point: {x: 1, y: 1}, end_point: {x: 1, y: 1}, count: 1}]
        })
    })

    it("two points", () => {
        let result = linear_compress([{x: 1, y: 1}, {x: 3, y: 3}])
        expect(result).toEqual({
            reached_index: 1,
            compressed_lines: [{start_point: {x: 1, y: 1}, end_point: {x: 3, y: 3}, count: 2}]
        })

        result = linear_compress([{x: 1, y: 1}, {x: 3, y: -3}])
        expect(result).toEqual({
            reached_index: 1,
            compressed_lines: [{start_point: {x: 1, y: 1}, end_point: {x: 3, y: -3}, count: 2}]
        })

        result = linear_compress([{x: 1, y: 1}, {x: -3, y: -3}])
        expect(result).toEqual({
            reached_index: 1,
            compressed_lines: [{start_point: {x: 1, y: 1}, end_point: {x: -3, y: -3}, count: 2}]
        })
    })

    it("three linear points", () => {
        let result = linear_compress([{x: 1, y: 1}, {x: 2, y: 2}, {x: 3, y: 3}])
        expect(result).toEqual({
            reached_index: 2,
            compressed_lines: [{start_point: {x: 1, y: 1}, end_point: {x: 3, y: 3}, count: 3}]
        })

        result = linear_compress([{x: 1, y: 1}, {x: 2, y: -2}, {x: 3, y: -3}])
        expect(result).toEqual({
            reached_index: 2,
            compressed_lines: [{start_point: {x: 1, y: 1}, end_point: {x: 3, y: -3}, count: 3}]
        })

        result = linear_compress([{x: 1, y: 1}, {x: -2, y: -2}, {x: -3, y: -3}])
        expect(result).toEqual({
            reached_index: 2,
            compressed_lines: [{start_point: {x: 1, y: 1}, end_point: {x: -3, y: -3}, count: 3}]
        })
    })

    it("handles 0 threshold", () => {
        let result = linear_compress([{x: 1, y: 1}, {x: 2, y: -2}], {threshold: 0})
        expect(result).toEqual({
            reached_index: 1,
            compressed_lines: [{start_point: {x: 1, y: 1}, end_point: {x: 2, y: -2}, count: 2}]
        })
    })

    it("three nonlinear points inside threshold", () => {
        let result = linear_compress([{x: 1, y: 1}, {x: 2, y: 2}, {x: 3, y: 1}], {threshold: 0.66667})
        expect(result).toEqual({
            reached_index: 2,
            compressed_lines: [{start_point: {x: 1, y: 1}, end_point: {x: 3, y: 1}, count: 3}]
        })
    })

    it("three nonlinear points outside threshold", () => {
        let result = linear_compress([{x: 1, y: 1}, {x: 2, y: -2}, {x: 3, y: 3}], {threshold: 0})
        expect(result).toEqual({
            reached_index: 2,
            compressed_lines: [
                {start_point: {x: 1, y: 1}, end_point: {x: 2, y: -2}, count: 2},
                {start_point: {x: 2, y: -2}, end_point: {x: 3, y: 3}, count: 2}
            ]
        })

        result = linear_compress([{x: 1, y: 1}, {x: 2, y: 2}, {x: 3, y: 1}], {threshold: 0.66})
        expect(result).toEqual({
            reached_index: 2,
            compressed_lines: [
                {start_point: {x: 1, y: 1}, end_point: {x: 2, y: 2}, count: 2},
                {start_point: {x: 2, y: 2}, end_point: {x: 3, y: 1}, count: 2}
            ]
        })
    })

    it("respects max points per line", () => {
        let result = linear_compress([{x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}], {max_points_per_line: 2})
        expect(result).toEqual({
            reached_index: 2,
            compressed_lines: [
                {start_point: {x: 1, y: 1}, end_point: {x: 2, y: 1}, count: 2},
                {start_point: {x: 2, y: 1}, end_point: {x: 3, y: 1}, count: 2}
            ]
        })

        result = linear_compress([{x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}, {x: 4, y: 1}], {max_points_per_line: 3})
        expect(result).toEqual({
            reached_index: 3,
            compressed_lines: [
                {start_point: {x: 1, y: 1}, end_point: {x: 3, y: 1}, count: 3},
                {start_point: {x: 3, y: 1}, end_point: {x: 4, y: 1}, count: 2}
            ]
        })
    })

    it("uses second_try_points_per_line and respects search_depth but still returns a line", () => {
        let result = linear_compress([
            {x: 1, y: 1},
            {x: 2, y: 1},
            {x: 3, y: 1},
            {x: 4, y: 1},
            {x: 5, y: 10}
        ], {second_try_points_per_line: 3, search_depth: 2, threshold: 0.1})
        expect(result).toEqual({
            reached_index: 4,
            compressed_lines: [
                // Tries to use all 5, fails, uses `second_try_points_per_line`, succeeds,
                // could grow to 4 but respects search_depth and returns line with 3 points.
                {start_point: {x: 1, y: 1}, end_point: {x: 3, y: 1}, count: 3},
                {start_point: {x: 3, y: 1}, end_point: {x: 4, y: 1}, count: 2},
                {start_point: {x: 4, y: 1}, end_point: {x: 5, y: 10}, count: 2}
            ]
        })
    })

    it("uses second_try_points_per_line but grows from there", () => {
        let result = linear_compress([
            {x: 1, y: 1},
            {x: 2, y: 1},
            {x: 3, y: 1},
            {x: 4, y: 1},
            {x: 5, y: 10}
        ], {second_try_points_per_line: 3, search_depth: 10, threshold: 0.1})
        expect(result).toEqual({
            reached_index: 4,
            compressed_lines: [
                // Tries to use all 5, fails, uses `second_try_points_per_line`, succeeds,
                // grows from there to include 4 points.
                {start_point: {x: 1, y: 1}, end_point: {x: 4, y: 1}, count: 4},
                {start_point: {x: 4, y: 1}, end_point: {x: 5, y: 10}, count: 2}
            ]
        })
    })

    it("compresses using minimum number of lines necessary", () => {
        let result = linear_compress([
            { x: 1, y: 1 },
            { x: 2, y: 2 },
            { x: 3, y: 3 },
            { x: 4, y: 4 },
            { x: 5, y: 100 }
        ], {max_points_per_line: 10, search_depth: 10, threshold: 0.25})

        expect(result).toEqual({
            reached_index: 4,
            compressed_lines: [
                {start_point: {x: 1, y: 1}, end_point: {x: 4, y: 4}, count: 4},
                {start_point: {x: 4, y: 4}, end_point: {x: 5, y: 100}, count: 2}
            ]
        })
    })

})

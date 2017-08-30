import { interpolate_points } from "../../graph/interpolate_points";

describe("graph interpolate_points", () => {

    it("interpolates points", () => {
        let result = interpolate_points([1, null, 3])
        expect(result.data).toEqual([1, 2, 3])
        expect(result.regions).toEqual([{start: 0, end: 2, style: 'dashed'}])

        result = interpolate_points([1, null, null, 4])
        expect(result.data).toEqual([1, 2, 3, 4])
        expect(result.regions).toEqual([{start: 0, end: 3, style: 'dashed'}])

        result = interpolate_points([1, null, null, null, 5])
        expect(result.data).toEqual([1, 2, 3, 4, 5])
        expect(result.regions).toEqual([{start: 0, end: 4, style: 'dashed'}])
    });


    it('does not interpolate start or end points', () => {
        let result = interpolate_points([null, 1, null])
        expect(result.data).toEqual([null, 1, null])
        expect(result.regions).toEqual([])

        result = interpolate_points([null, null, 1, null, null])
        expect(result.data).toEqual([null, null, 1, null, null])
        expect(result.regions).toEqual([])

        result = interpolate_points([null, 1, 2, null])
        expect(result.data).toEqual([null, 1, 2, null])
        expect(result.regions).toEqual([])
    })

    it('interpolates start or end points when given options', () => {
        let result = interpolate_points([null, 1, null], {start: 0, end: 2})
        expect(result.data).toEqual([0, 1, 2])
        expect(result.regions).toEqual([
            {start: 0, end: 1, style: 'dashed'},
            {start: 1, end: 2, style: 'dashed'}
        ])

        result = interpolate_points([null, null, 1, null, null], {start: 0, end: 2})
        expect(result.data).toEqual([0, 0.5, 1, 1.5, 2])
        expect(result.regions).toEqual([
            {start: 0, end: 2, style: 'dashed'},
            {start: 2, end: 4, style: 'dashed'}
        ])

        result = interpolate_points([null, 1, 2, null], {start: 0, end: 3})
        expect(result.data).toEqual([0, 1, 2, 3])
        expect(result.regions).toEqual([
            {start: 0, end: 1, style: 'dashed'},
            {start: 2, end: 3, style: 'dashed'}
        ])
    })

})

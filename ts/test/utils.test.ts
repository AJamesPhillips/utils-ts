import { str_enum, parse_query_params } from '../utils'

describe("str_enum", function() {
    it("should provide values", function() {
        const DOUBLES = str_enum(['AA', 'BB'])
        expect(DOUBLES.AA).toBe('AA')

        type DOUBLE = keyof typeof DOUBLES

        var bb: {kind: DOUBLE} = {kind: 'BB'}
        expect(bb.kind).toBe(DOUBLES.BB)
    })
})

describe("parse_query_params", function() {
    it("should no parameters or empty string", function() {
        let result = parse_query_params('?')
        expect(result).toEqual({})

        result = parse_query_params('')
        expect(result).toEqual({})
    })

    it("should handle 1 parameters", function() {
        const result = parse_query_params('?limit=1d')
        expect(result).toEqual({ limit: '1d' })
    })

    it("should handle 2 parameters", function() {
        const result = parse_query_params('?threshold=1&limit=1d')
        expect(result).toEqual({ threshold: '1', limit: '1d' })
    })
})

import {str_enum} from '../utils';

describe("str_enum", function() {
    it("should provide values", function() {
        const DOUBLES = str_enum(['AA', 'BB']);
        expect(DOUBLES.AA).toBe('AA');

        type DOUBLE = keyof typeof DOUBLES;

        var bb: {kind: DOUBLE} = {kind: 'BB'};
        expect(bb.kind).toBe(DOUBLES.BB);
    });
});

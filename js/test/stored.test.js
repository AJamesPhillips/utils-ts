"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stored_1 = require("../stored");
// TODO add typescript definition test to check that:
// let a: Date = parse_date(undefined);  // errors
// let b: Date = parse_date(new Date());  // ok
// let c: Date | undefined = parse_date(undefined);  // ok
// let d: Date | undefined = parse_date(new Date());  // ok
describe("stored", function () {
    describe("parse_date", function () {
        it("should return undefined when value is not present", function () {
            var optional_date_or_string = undefined;
            expect(undefined).toEqual(stored_1.parse_date(optional_date_or_string));
        });
        it("should return a date when value is a string", function () {
            var optional_date_as_string = "2017-03-20 12:20:30Z+3";
            var expected_date = new Date("2017-03-20 12:20:30Z+3");
            expect(expected_date.getTime()).toEqual(stored_1.parse_date(optional_date_as_string).getTime());
        });
        it("should return a date when value is a date", function () {
            var optional_date_as_date = new Date("2017-03-20 12:20:30Z+3");
            var expected_date = new Date("2017-03-20 12:20:30Z+3");
            expect(expected_date.getTime()).toEqual(stored_1.parse_date(optional_date_as_date).getTime());
        });
        it("should return undefined when value is a malformed string", function () {
            var optional_date_as_bad_string = "2017-03-20 1";
            var result = stored_1.parse_date(optional_date_as_bad_string);
            expect(isNaN(result.getTime())).toBeTruthy();
        });
    });
    describe("parse_bool", function () {
        it("should return undefined when value is not present", function () {
            var optional_bool_or_string = undefined;
            expect(undefined).toEqual(stored_1.parse_bool(optional_bool_or_string));
        });
        it("should return a boolean when value is a string", function () {
            var optional_true_bool_as_string = "true";
            var optional_false_bool_as_string = "false";
            var optional_malformed_bool_as_string = "tru";
            expect(stored_1.parse_bool(optional_true_bool_as_string)).toBeTruthy();
            expect(stored_1.parse_bool(optional_false_bool_as_string)).toBeFalsy();
            expect(stored_1.parse_bool(optional_malformed_bool_as_string)).toBeFalsy();
        });
        it("should return a boolean when value is a boolean", function () {
            var optional_true_bool_as_boolean = true;
            var optional_false_bool_as_boolean = false;
            expect(stored_1.parse_bool(optional_true_bool_as_boolean)).toBeTruthy();
            expect(stored_1.parse_bool(optional_false_bool_as_boolean)).toBeFalsy();
        });
    });
});
//# sourceMappingURL=stored.test.js.map
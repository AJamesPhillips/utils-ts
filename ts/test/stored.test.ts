
import {parse_date, parse_bool} from "../stored";


// TODO add typescript definition test to check that:
// let a: Date = parse_date(undefined);  // errors
// let b: Date = parse_date(new Date());  // ok
// let c: Date | undefined = parse_date(undefined);  // ok
// let d: Date | undefined = parse_date(new Date());  // ok

describe("stored", function() {
    describe("parse_date", function() {
        it("should return undefined when value is not present", function() {
            let optional_date_or_string: Date | string | undefined = undefined;
            expect(parse_date(optional_date_or_string)).toBeUndefined();
        });

        it("should return null when value is not present", function() {
            let optional_date_or_string: Date | string | null = null;
            expect(parse_date(optional_date_or_string)).toBeNull();
        });

        it("should return a date when value is a string", function() {
            let optional_date_as_string: Date | string | undefined = "2017-03-20 12:20:30Z+3";

            let expected_date = new Date("2017-03-20 12:20:30Z+3")
            expect(parse_date(optional_date_as_string).getTime()).toEqual(expected_date.getTime());
        });

        it("should return a date when value is a date", function() {
            let optional_date_as_date: Date | string | undefined = new Date("2017-03-20 12:20:30Z+3");

            let expected_date = new Date("2017-03-20 12:20:30Z+3")
            expect(parse_date(optional_date_as_date).getTime()).toEqual(expected_date.getTime());
        });

        it("should return undefined when value is a malformed string", function() {
            let optional_date_as_bad_string: Date | string | undefined = "2017-03-20 1";

            let result = parse_date(optional_date_as_bad_string);
            expect(isNaN(result.getTime())).toBeTruthy();
        });
    });

    describe("parse_bool", function() {
        it("should return undefined when value is not present", function() {
            let optional_bool_or_string: string | boolean | undefined = undefined;
            expect(parse_bool(optional_bool_or_string)).toBeUndefined();
        });

        it("should return null when value is not present", function() {
            let optional_bool_or_string: string | boolean | null = null;
            expect(parse_bool(optional_bool_or_string)).toBeNull();
        });

        it("should return a boolean when value is a string", function() {
            let optional_true_bool_as_string: string | boolean | undefined = "true";
            let optional_false_bool_as_string: string | boolean | undefined = "false";
            let optional_malformed_bool_as_string: string | boolean | undefined = "tru";

            expect(parse_bool(optional_true_bool_as_string)).toBeTruthy();
            expect(parse_bool(optional_false_bool_as_string)).toBeFalsy();
            expect(parse_bool(optional_malformed_bool_as_string)).toBeFalsy();
        });

        it("should return a boolean when value is a boolean", function() {
            let optional_true_bool_as_boolean: string | boolean | undefined = true;
            let optional_false_bool_as_boolean: string | boolean | undefined = false;

            expect(parse_bool(optional_true_bool_as_boolean)).toBeTruthy();
            expect(parse_bool(optional_false_bool_as_boolean)).toBeFalsy();
        });
    });
});

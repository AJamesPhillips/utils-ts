
import {valid_email_address} from "../email";

describe("email", function() {
    describe("valid_email_address", function() {
        it("should return false when value is undefined", function() {
            expect(valid_email_address(undefined)).toEqual(false);
        });
    });
});

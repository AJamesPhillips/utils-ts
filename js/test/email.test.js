"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var email_1 = require("../email");
describe("email", function () {
    describe("valid_email_address", function () {
        it("should return false when value is undefined", function () {
            expect(email_1.valid_email_address(undefined)).toEqual(false);
        });
    });
});
//# sourceMappingURL=email.test.js.map
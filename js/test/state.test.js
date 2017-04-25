"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var state_1 = require("../state");
describe("state", function () {
    describe("make_new_state_generic", function () {
        it("should return a function to add making a new state object", function () {
            var make_new_state = state_1.make_new_state_generic();
            expect(make_new_state instanceof Function).toBeTruthy();
        });
        it("the returned function should make a new state object", function () {
            var make_new_state = state_1.make_new_state_generic();
            var current_state = {
                attr: "1",
                attr2: "2"
            };
            var partial_state = {
                attr2: "3"
            };
            var new_state = make_new_state(current_state, partial_state);
            expect(new_state).not.toBe(current_state);
            expect(new_state).toEqual({ attr: "1", attr2: "3" });
        });
    });
});
//# sourceMappingURL=state.test.js.map
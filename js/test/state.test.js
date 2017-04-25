"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var state_1 = require("../state");
var reduce_reducers = require("reduce-reducers");
describe("reduce_reducers", function () {
    it("should work", function () {
        var functions = [];
        reduce_reducers.apply(void 0, functions);
    });
});
describe("typed_reduce_reducers", function () {
    it("should work", function () {
        function add_thing_reducer(state, action) {
            if (action.kind == 'AddThing' && !state.things[action.thing]) {
                state = _.cloneDeep(state);
                state.things[action.thing] = true;
            }
            return state;
        }
        function other_reducer(state, action) {
            return state;
        }
        var reducer = state_1.typed_reduce_reducers(add_thing_reducer, other_reducer);
        var old_state = { things: { 3: true } };
        var new_state = reducer(old_state, { kind: 'AddThing', thing: 4 });
        expect(old_state).not.toEqual(new_state);
        expect(new_state).toEqual({ things: { 3: true, 4: true } });
    });
});
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
//# sourceMappingURL=state.test.js.map
import * as assert from "assert";

import {make_new_state_generic} from "../state";


describe("state", function() {
    interface IPartialState {
        attr?: string;
        attr2?: string;
    }

    interface IState extends IPartialState {
        attr: string;
        attr2: string;
    }

    describe("make_new_state_generic", function() {
        it("should return a function to add making a new state object", function() {
            let make_new_state = make_new_state_generic<IState, IPartialState>();

            assert(make_new_state instanceof Function);
        });

        it("the returned function should make a new state object", function() {
            let make_new_state = make_new_state_generic<IState, IPartialState>();

            let current_state: IState = {
                attr: "1",
                attr2: "2"
            }
            let partial_state: IPartialState = {
                attr2: "3"
            }
            let new_state = make_new_state(current_state, partial_state);

            assert.notEqual(new_state, current_state);
            assert.deepEqual(new_state, {attr: "1", attr2: "3"});
        });
    });
});

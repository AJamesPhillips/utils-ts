import * as _ from 'lodash';
import {typed_reduce_reducers, make_new_state_generic} from "../state";
import reduce_reducers = require("reduce-reducers");

describe("reduce_reducers", function() {
    it("should work", function() {
        var functions: any[] = [];
        (reduce_reducers as any)(...functions);
    });
});

describe("typed_reduce_reducers", function() {
    it("should work", function() {
        interface AppState {
            things: {[index: number]: boolean};
        }
        interface Action {
            kind: string;
        }
        interface AddThingAction extends Action {
            kind: 'AddThing';
            thing: number;
        }

        function add_thing_reducer(state: AppState, action: AddThingAction) {
            if (action.kind == 'AddThing' && !state.things[action.thing]) {
                state = _.cloneDeep(state);
                state.things[action.thing] = true;
            }
            return state;
        }
        function other_reducer(state: AppState, action: Action) {
            return state;
        }
        let reducer = typed_reduce_reducers<AppState, Action>(
            add_thing_reducer,
            other_reducer
        );

        let old_state = {things: {3: true}};
        let new_state = reducer(old_state, {kind: 'AddThing', thing: 4} as Action);
        expect(old_state).not.toEqual(new_state);
        expect(new_state).toEqual({things: {3: true, 4: true}});
    })
});


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

        expect(make_new_state instanceof Function).toBeTruthy();
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

        expect(new_state).not.toBe(current_state);
        expect(new_state).toEqual({attr: "1", attr2: "3"});
    });
});

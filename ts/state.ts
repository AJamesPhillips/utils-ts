import reduce_reducers = require("reduce-reducers");

export interface IReducerFunction<T, A> {
    (state: T, action?: A): T;
}

export function typed_reduce_reducers<T, A>(...functions: IReducerFunction<T, A>[]): IReducerFunction<T, A> {
    return (reduce_reducers as any)(...functions);
}

/** Returns a typed function useful inside reducer functions.  It safely takes
 * the old state and the new partial state and creates a new object.
 * This makes it easier to ensure the reducer function is pure and free from
 * side effects (in this case
 * mutating the object passed into the reducer as the current state argument).
 */
export function make_new_state_generic<State, PartialState>() {
    let make_new_state = function(old_state: State, new_partial_state: PartialState): State {
        return Object.assign({}, old_state, new_partial_state);
    };
    return make_new_state;
}

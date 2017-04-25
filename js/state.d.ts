export interface IReducerFunction<T, A> {
    (state: T, action?: A): T;
}
export declare function typed_reduce_reducers<T, A>(...functions: IReducerFunction<T, A>[]): IReducerFunction<T, A>;
/** Returns a typed function useful inside reducer functions.  It safely takes
 * the old state and the new partial state and creates a new object.
 * This makes it easier to ensure the reducer function is pure and free from
 * side effects (in this case
 * mutating the object passed into the reducer as the current state argument).
 */
export declare function make_new_state_generic<State, PartialState>(): (old_state: State, new_partial_state: PartialState) => State;

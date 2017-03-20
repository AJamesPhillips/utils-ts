import * as _ from 'lodash';
var reduceReducers = require('reduce-reducers');


export interface IReducerFunction<T, A> {
  (state: T, action?: A): T;
}

export function typed_reduce_reducers<T, A>(...functions: IReducerFunction<T, A>[]): IReducerFunction<T, A> {
  return reduceReducers(...functions);
}


export function new_state_generic<State, PartialState>() {
  return function(old_state: State, new_partial_state: PartialState): State {
    return _.assign<{}, State, PartialState>({}, old_state, new_partial_state);
  };
}


// Broken
// export function newXnStateGeneric<State, PartialSubState>(xn: string) {
//   return function(old_state: State, newPartialXnState: PartialSubState): State {
//     var oldSubState = <PartialSubState> old_state[xn];
//     var subState = _.assign<{}, PartialSubState>({}, oldSubState, newPartialXnState);
//     return _.assign<{}, State>({}, old_state, subState);
//   };
// }

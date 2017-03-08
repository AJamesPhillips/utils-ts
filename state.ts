import * as _ from 'lodash';
var reduceReducers = require('reduce-reducers');


export interface IReducerFunction<T, A> {
  (state: T, action?: A): T;
}

export function typedReduceReducers<T, A>(...functions: IReducerFunction<T, A>[]): IReducerFunction<T, A> {
  return reduceReducers(...functions);
}


export function newStateGeneric<State, PartialState>() {
  return function(oldState: State, newPartialState: PartialState): State {
    return _.assign<{}, State>({}, oldState, newPartialState);
  };
}


// Broken
// export function newXnStateGeneric<State, PartialSubState>(xn: string) {
//   return function(oldState: State, newPartialXnState: PartialSubState): State {
//     var oldSubState = <PartialSubState> oldState[xn];
//     var subState = _.assign<{}, PartialSubState>({}, oldSubState, newPartialXnState);
//     return _.assign<{}, State>({}, oldState, subState);
//   };
// }

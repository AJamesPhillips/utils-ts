import * as _ from 'lodash';
import * as React from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';


export class ReactComponentBase<IRxProps, IRxState> extends React.Component<IRxProps, IRxState> {
  updateState(partial_state: any) {
    this.setState(_.assign<IRxState>({}, this.state, partial_state), undefined, false);
  }

  setState(state: any, callback?: () => any, warn: boolean = true) {
    if(warn) console.warn('Currently we store all state in Redux store.');
    super.setState(state, callback);
  }
}

export interface IInjectedProps<IAppState> {
  dispatch?: {(action: {type: string}): void};

  // Note this should be guarenteed from the `<Provider>` in main.tsx
  // but don't have correct Redux-React typing implemented yet.
  app_state?: IAppState;
}

export function connect_component<IAppState>(RxComponent: new(p?: any) => React.Component<any, any>) {
  // Which props do we want to inject, given the global state?
  // Note: use https://github.com/faassen/reselect for better performance.
  function select(state: IAppState): IInjectedProps<IAppState> {
    return {app_state: state}
  }

  // Wrap the component to inject dispatch and state into it
  return connect(select)(RxComponent);
}


export interface IRouteProps extends RouteComponentProps<{}, {}> {}

export function route_props_to_string(route_props: IRouteProps): string {
  return route_props.location.pathname + route_props.location.search;
}

import * as _ from 'lodash';
import * as React from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';


export class ReactComponentBase<IRxProps, IRxState> extends React.Component<IRxProps, IRxState> {
  updateState(partialState: any) {
    this.setState(_.assign<IRxState>({}, this.state, partialState), undefined, false);
  }

  setState(state: any, callback?: () => any, warnMe: boolean = true) {
    if(warnMe) console.warn('Currently we store all state in Redux store.');
    super.setState(state, callback);
  }
}

export interface IInjectedProps<IAppState> {
  dispatch?: {(action: {type: string}): void};

  // Note this should be guarenteed from the `<Provider>` in main.tsx
  // but don't have correct Redux-React typing implemented yet.
  appState?: IAppState;
}

export function connectComponent<IAppState>(RxComponent: new(p?: any) => React.Component<any, any>) {
  // Which props do we want to inject, given the global state?
  // Note: use https://github.com/faassen/reselect for better performance.
  function select(state: IAppState): IInjectedProps<IAppState> {
    return {appState: state}
  }

  // Wrap the component to inject dispatch and state into it
  return connect(select)(RxComponent);
}


export interface IRouteProps extends RouteComponentProps<{}, {}> {}

export function routePropsToString(routeProps: IRouteProps): string {
  return routeProps.location.pathname + routeProps.location.search;
}

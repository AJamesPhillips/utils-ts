import { has } from "lodash";
import * as React from "react";
// import {connect} from "react-redux";
import {RouteComponentProps} from "react-router";

// Note the large number of  "// tslint:disable-line" and "tslint:disable-next-line" should be removed and
// replaced with the correct types (or just made shorter)

export class ReactComponentBase<IRxProps, IRxState> extends React.Component<IRxProps, IRxState> {
    updateState(partial_state: any) { // tslint:disable-line
        const merged = Object.assign({}, this.state, partial_state)
        this.setState(merged, undefined, false);
    }

    setState(state: any, callback?: () => any, warn: boolean = true) { // tslint:disable-line
        if (warn) { console.warn("Currently we store all state in Redux store."); }
        super.setState(state, callback);
    }
}

// interface IRouteAndStateMappedToProps extends RouteComponentProps<{}>, IMappedState

// tslint:disable-next-line
// export function connect_component<IMappedState, IAppState, IRouteAndStateMappedToProps extends RouteComponentProps<{}> & IMappedState>(map_state_to_props: (state: IAppState) => IMappedState, RxComponent: new(p?: IRouteAndStateMappedToProps) => React.Component<IRouteAndStateMappedToProps, {}>) {
//   // Wrap the component to inject dispatch and state into it
//   return connect(map_state_to_props)(RxComponent);
// }

// tslint:disable-next-line
// type IGenericConnectedRxComponent<IRouteAndStateMappedToProps> = new(p: IRouteAndStateMappedToProps) => React.Component<IRouteAndStateMappedToProps, {}>;

// tslint:disable-next-line
// export function connect_component<IAppState2, IStateMappedToProps2, IRouteAndStateMappedToProps2 extends RouteComponentProps<{}> & IStateMappedToProps2>(
//   map_state_to_props: (state: IAppState2) => IStateMappedToProps2,
// tslint:disable-next-line
//   RxComponent: IGenericConnectedRxComponent<IRouteAndStateMappedToProps2>): IGenericConnectedRxComponent<IRouteAndStateMappedToProps2> {
//   // Wrap the component to inject dispatch and state into it
//   var a = connect(map_state_to_props);
//   return a(RxComponent);
// }

export interface IRouteProps extends RouteComponentProps<{}> {}

export function route_props_to_string(route_props: IRouteProps): string {
    return route_props.location.pathname + route_props.location.search;
}

export function key_in_query(props: RouteComponentProps<{}>, key: string): boolean {
    var query =  (props.location as any).query; // tslint:disable-line
    return has(query, key);
}

export function value_from_query(props: RouteComponentProps<{}>, key: string): string {
    return (props.location as any).query[key]; // tslint:disable-line
}

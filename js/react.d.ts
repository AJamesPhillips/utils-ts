/// <reference types="react" />
import * as React from "react";
import { RouteComponentProps } from "react-router";
export declare class ReactComponentBase<IRxProps, IRxState> extends React.Component<IRxProps, IRxState> {
    updateState(partial_state: any): void;
    setState(state: any, callback?: () => any, warn?: boolean): void;
}
export interface IRouteProps extends RouteComponentProps<{}> {
}
export declare function route_props_to_string(route_props: IRouteProps): string;
export declare function key_in_query(props: RouteComponentProps<{}>, key: string): boolean;
export declare function value_from_query(props: RouteComponentProps<{}>, key: string): string;

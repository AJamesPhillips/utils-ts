export declare var capitalize_first_letter: (val: string) => string;
export interface toStringInterface {
    toString: () => string;
}
export declare var is_browser: () => boolean;
export declare function to_pojo(obj: any): any;
export declare function handle_error(handler_name: string): (error: string) => never;
export interface IndexableByString<T> {
    [key: string]: T;
}
export declare function simple_objects_equal<T extends IndexableByString<any>>(props: string[]): (obj1: T, obj2: T) => boolean;
export interface IQueryParams {
    [key: string]: string;
}
export declare function parse_query_params(query_params: string): IQueryParams;
/**
 * Converts a raw string into a base64 encoded string
 */
export declare function node_btoa(raw: string): string;
/**
 * Converts a base64 encoded string back into a utf8 string
 */
export declare function node_atob(b64_encoded: string): string;
export declare function encode_details(details: any): string;
/**
 * Utility function to create a K:V from a list of strings
 * @see {@link https://basarat.gitbooks.io/typescript/docs/types/literal-types.html}
 */
export declare function str_enum<T extends string>(o: Array<T>): {
    [K in T]: K;
};

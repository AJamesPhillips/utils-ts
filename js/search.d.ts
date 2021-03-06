export declare function binary_search<E>(list: E[], predicate: (v: E) => 1 | 0 | -1): {
    index: number;
    value: E;
} | undefined;
export declare function make_value_predicate<E>(value: E): (v: E) => 0 | 1 | -1;
export declare function binary_search_for_value<E>(list: E[], value: E): {
    index: number;
    value: E;
} | undefined;
export declare function binary_search_vlookup<E>(list: {
    value: E;
    lookup_max: number;
}[], lookup_value: number): {
    index: number;
    value: {
        value: E;
        lookup_max: number;
    };
} | undefined;
export declare function binary_search_for_value_in_range(list: number[], value: number): {
    index: number;
    value: number;
} | undefined;

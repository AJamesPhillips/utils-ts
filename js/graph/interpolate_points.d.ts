export interface Options {
    start?: number;
    end?: number;
}
export interface Region {
    start?: number;
    end?: number;
    style?: string;
}
/**
 * TODO: remove this from here and place in a `data` directory
 */
export declare function interpolate_points(data: (number | null)[], options?: Options): {
    data: (number | null)[];
    regions: Region[];
};

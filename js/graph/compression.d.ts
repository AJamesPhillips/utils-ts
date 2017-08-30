export interface Point {
    x: number;
    y: number;
}
export interface Options {
    max_points_per_line: number;
    second_try_points_per_line: number;
    search_depth: number;
    threshold: number;
}
export interface CompressedLine {
    start_point: Point;
    end_point: Point;
    count: number;
}
export declare function linear_compress(data: Point[], options?: Partial<Options>): CompressedLine[];

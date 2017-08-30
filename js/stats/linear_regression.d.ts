export interface Point {
    x: number;
    y: number;
}
export declare function linear_regression(data: Point[]): {
    x_standard_deviation: number;
    y_standard_deviation: number;
    slope: number;
    intercept: number;
    predict: (x: number) => number;
    x_stats: {
        mean: number;
        deviation_from_mean: number[];
        squared_deviation_from_mean: number[];
        variance: number;
    };
    y_stats: {
        mean: number;
        deviation_from_mean: number[];
        squared_deviation_from_mean: number[];
        variance: number;
    };
    x_sq_deviation_sum: number;
    y_sq_deviation_sum: number;
    xy_sum: number;
    correlation: number;
};

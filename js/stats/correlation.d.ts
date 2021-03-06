export interface Data {
    x: number;
    y: number;
}
/**
 * http://onlinestatbook.com/2/describing_bivariate_data/calculation.html
 */
export declare function sample_correlation(data: Data[]): {
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

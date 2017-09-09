import { sample_variance } from "./variance"

export interface Data {
    x: number
    y: number
}

/**
 * http://onlinestatbook.com/2/describing_bivariate_data/calculation.html
 */
export function sample_correlation(data: Data[]) {

    const x_stats = sample_variance(data.map(v => v.x))
    const y_stats = sample_variance(data.map(v => v.y))
    const x_sq_deviation_sum = x_stats.squared_deviation_from_mean.reduce((accum, v) => accum + v, 0)
    const y_sq_deviation_sum = y_stats.squared_deviation_from_mean.reduce((accum, v) => accum + v, 0)
    const xy_sum = x_stats.deviation_from_mean.reduce((accum, v, i) => accum + (v * y_stats.deviation_from_mean[i]), 0)

    // OR'd with 0 as straight lines showing no correlation of x with y cause
    // `(0 ** 0.5)` which is NaN
    const correlation = (xy_sum / ((x_sq_deviation_sum * y_sq_deviation_sum) ** 0.5)) || 0

    return {
        x_stats,
        y_stats,
        x_sq_deviation_sum,
        y_sq_deviation_sum,
        xy_sum,
        correlation,
    }
}

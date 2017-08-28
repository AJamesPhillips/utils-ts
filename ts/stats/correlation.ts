import { sample_variance } from "./variance"

/**
 * http://onlinestatbook.com/2/describing_bivariate_data/calculation.html
 */
export function sample_correlation(data: {x: number, y: number}[]) {

    const x_stats = sample_variance(data.map(v => v.x))
    const y_stats = sample_variance(data.map(v => v.y))
    const x_sq_deviation_sum = x_stats.squared_deviation_from_mean.reduce((accum, v) => accum + v, 0)
    const y_sq_deviation_sum = y_stats.squared_deviation_from_mean.reduce((accum, v) => accum + v, 0)
    const xy_sum = x_stats.deviation_from_mean.reduce((accum, v, i) => accum + (v * y_stats.deviation_from_mean[i]), 0)

    const correlation = xy_sum / ((x_sq_deviation_sum * y_sq_deviation_sum) ** 0.5)

    return {
      x_stats,
      y_stats,
      x_sq_deviation_sum,
      y_sq_deviation_sum,
      xy_sum,
      correlation,
    }
}

import { sample_correlation } from "./correlation"
import { sample_standard_deviation } from "./standard_deviation"

export interface Point {
    x: number
    y: number
}

export function linear_regression(data: Point[]) {

    const result = sample_correlation(data)
    const x_standard_deviation = sample_standard_deviation(result.x_stats)
    const y_standard_deviation = sample_standard_deviation(result.y_stats)
    // Note again, OR'd with 0 incase result of calculation is NaN, e.g. when only
    // one data point and correlation, x and y standard_deviations are all 0
    const slope = ((result.correlation * y_standard_deviation) / x_standard_deviation) || 0
    const intercept = result.y_stats.mean - (slope * result.x_stats.mean)
    const predict = (x: number) => (slope * x) + intercept

    return {
        ...result,
        x_standard_deviation,
        y_standard_deviation,
        slope,
        intercept,
        predict,
    }
}

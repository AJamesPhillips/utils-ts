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
    const slope = (result.correlation * y_standard_deviation) / x_standard_deviation
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

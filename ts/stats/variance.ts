import { mean as calc_mean } from "lodash"

/**
 * http://onlinestatbook.com/2/summarizing_distributions/variability.html
 */
export function sample_variance (data: number[]) {

    const mean = calc_mean(data)
    const deviation_from_mean = data.map((v) => v - mean)
    const squared_deviation_from_mean = deviation_from_mean.map(d => d * d)
    // calc_mean(deviation_from_mean) aka sigma
    const variance = calc_mean(squared_deviation_from_mean) // aka sigma squared
    return {
        mean,
        deviation_from_mean,
        squared_deviation_from_mean,
        variance,
    }
}

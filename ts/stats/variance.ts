import { mean as calc_mean, sum } from "lodash"

/**
 * http://onlinestatbook.com/2/summarizing_distributions/variability.html
 */
export function sample_variance (data: number[], eplison = 1) {

    const mean = calc_mean(data)
    const deviation_from_mean = data.map((v) => v - mean)
    const squared_deviation_from_mean = deviation_from_mean.map(d => d * d)
    // calculate variance, aka sigma squared.  (sigma is the mean of the deviation_from_mean array)
    // Note: variance is OR'd with 0 here to give a reasonable default when
    // eplison is 1 and there is only one value in the data (otherwise
    // `n / (1-1)` gives NaN)
    const variance = (sum(squared_deviation_from_mean) / (data.length - eplison)) || 0
    return {
        mean,
        deviation_from_mean,
        squared_deviation_from_mean,
        variance,
    }
}

export function population_variance (data: number[]) {

    return sample_variance(data, 0)
}

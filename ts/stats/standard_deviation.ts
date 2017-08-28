import { sample_variance } from "./variance"

/**
 * http://onlinestatbook.com/2/summarizing_distributions/variability.html
 */
export function sample_standard_deviation (data: number[]) {

    return sample_variance(data).variance ** 0.5
}

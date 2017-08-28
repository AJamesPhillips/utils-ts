import { sample_variance } from "./variance"

/**
 * http://onlinestatbook.com/2/summarizing_distributions/variability.html
 */
export function sample_standard_deviation (data: {variance: number}): number
export function sample_standard_deviation (data: number[]): number
export function sample_standard_deviation (data: (number[]) & {variance: number}): number {

    if (data.length) {
        return sample_variance(data).variance ** 0.5
    }

    return data.variance ** 0.5
}

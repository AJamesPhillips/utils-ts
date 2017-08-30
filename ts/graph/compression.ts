import { merge } from "lodash"
import { linear_regression } from "../stats/linear_regression"

export interface Point {
    x: number;
    y: number;
}

export interface Options {
    // min_points_to_assess: number;
    max_points_per_line: number;
    second_try_points_per_line: number;
    search_depth: number;
    threshold: number;
}

const default_options: Options = {
    //   min_points_to_assess: 500,
    max_points_per_line: 500,
    second_try_points_per_line: 16,
    search_depth: 5,
    threshold: 1,
}

export interface CompressedLine {
    start_point: Point;
    end_point: Point;
    count: number;
}

export function linear_compress (data: Point[], options: Partial<Options> = {}): CompressedLine[] {

    const opts: Options = merge({}, default_options, options)

    let compressed_lines: CompressedLine[] = []
    if (data.length === 0) return compressed_lines

    let reached_index = undefined
    do {
        let start_data_index = reached_index || 0
        const result = _linear_compress(data, start_data_index, opts)
        reached_index = result.reached_index
        compressed_lines.push(result.compressed_line)
    } while (reached_index < (data.length - 1)) // && (data.length - start_data_index) >= opts.min_points_to_assess) {)

    return compressed_lines
}

interface LinearCompressionResult {
    reached_index: number
    compressed_line: CompressedLine
}

function _linear_compress (data: Point[], start_data_index: number, options: Options): LinearCompressionResult {

    /**
     * loop through the data from the start_data_index calculating mean, variance
     * standard deviation, until linear fit falls outside threshold, then
     * return compressed_line
     */
    let upper_end_data_index = Math.min(start_data_index + options.max_points_per_line - 1, data.length - 1)

    let line = get_compressed_line(data, {start_data_index, end_data_index: upper_end_data_index}, options)
    if (line) return line

    let second_try_upper_end_data_index = Math.min(start_data_index + options.second_try_points_per_line - 1, data.length - 1)
    line = get_compressed_line(data, {start_data_index, end_data_index: second_try_upper_end_data_index}, options)
    let lower_end_data_index = line ? second_try_upper_end_data_index : start_data_index + 1
    upper_end_data_index = line ? upper_end_data_index : second_try_upper_end_data_index

    let tries = 2
    while (tries < options.search_depth || !line) {

        let next_try_end_data_index = Math.ceil((upper_end_data_index - lower_end_data_index) / 2)
        line = get_compressed_line(data, {start_data_index, end_data_index: next_try_end_data_index}, options)
        lower_end_data_index = line ? next_try_end_data_index : lower_end_data_index
        upper_end_data_index = line ? upper_end_data_index : (next_try_end_data_index - 1)

        tries += 1
    }

    return line
}

function get_compressed_line (data: Point[], kwargs: {start_data_index: number, end_data_index: number}, options: Options): LinearCompressionResult | null {

    const {start_data_index, end_data_index} = kwargs
    const result = linear_regression(data.slice(start_data_index, end_data_index))

    /**
     * max_diff should take into account slope of line, increasing as slope increases
     */
    const max_diff = ((Math.abs(result.slope) * options.threshold) / 2) + options.threshold

    const good = all_points_are_close_to_fitted_line(result.predict, data, {
        start_data_index,
        end_data_index,
        max_diff,
    })

    if (good) {
        return {
            reached_index: end_data_index,
            compressed_line: {
                start_point: data[start_data_index],
                end_point: data[end_data_index],
                count: (end_data_index - start_data_index) + 1
            }
        }
    } else {
        return null
    }
}

function all_points_are_close_to_fitted_line (predict: (x: number) => number, data: Point[], kwargs: {start_data_index: number, end_data_index: number, max_diff: number}) {

    let {start_data_index, end_data_index, max_diff} = kwargs

    /**
     * calculate difference between all points and fit line.  If any are
     * significantly different then reject this set of data and try a small set
     */
    for (let i = start_data_index; i < end_data_index; ++i) {

        const point = data[i]
        const y = predict(point.x)
        const diff = Math.abs(y - point.y)
        if (diff > max_diff) {
            return false
        }
    }

    return true
}

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
    search_depth: 10,
    threshold: 1,
}

export interface CompressedLine {
    start_point: Point;
    end_point: Point;
    count: number;
}

export interface CompressedLineGroup {
    reached_index: number | null;
    compressed_lines: CompressedLine[];
}

export function linear_compress (data: Point[], options: Partial<Options> = {}): CompressedLineGroup {

    const opts: Options = merge({}, default_options, options)

    let compressed_lines: CompressedLine[] = []
    if (data.length === 0) return {compressed_lines, reached_index: null}

    let reached_index = undefined
    do {
        let start_data_index = reached_index || 0
        const result = _linear_compress(data, start_data_index, opts)
        reached_index = result.reached_index
        compressed_lines.push(result.compressed_line)
    } while (reached_index < (data.length - 1)) // && (data.length - start_data_index) >= opts.min_points_to_assess) {)

    return {compressed_lines, reached_index}
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

    let line = get_compressed_line({data, start_data_index, end_data_index: upper_end_data_index, options})
    if (line) return line

    let second_try_upper_end_data_index = Math.min(start_data_index + options.second_try_points_per_line - 1, data.length - 1)
    line = get_compressed_line({data, start_data_index, end_data_index: second_try_upper_end_data_index, options})
    // `start_data_index + 1` for lower_end_data_index when we don't get a line
    // because it is always possible to make a perfect fit with 2 points.
    let lower_end_data_index = line ? second_try_upper_end_data_index : start_data_index + 1
    // `-1` because the line was unsuccessful at these upper limits
    upper_end_data_index = line ? upper_end_data_index : (second_try_upper_end_data_index - 1)

    let tries = 2
    while (!line || (tries < options.search_depth && lower_end_data_index !== upper_end_data_index)) {

        let next_try_end_data_index = Math.floor((upper_end_data_index - lower_end_data_index) / 2) + lower_end_data_index
        const latest_line = get_compressed_line({data, start_data_index, end_data_index: next_try_end_data_index, options})
        lower_end_data_index = latest_line ? next_try_end_data_index : lower_end_data_index
        upper_end_data_index = latest_line ? upper_end_data_index : (next_try_end_data_index - 1)
        // Update with latest_line if available, otherwise use older line
        line = latest_line || line

        tries += 1
    }

    return line
}

interface GetCompressedLineArgs {
    data: Point[];
    start_data_index: number;
    end_data_index: number;
    options: Options;
}

function get_compressed_line ({data, start_data_index, end_data_index, options}: GetCompressedLineArgs): LinearCompressionResult | null {

    const result = linear_regression(data.slice(start_data_index, end_data_index + 1))

    // max_diff takes into account slope of line by increasing as slope increases
    const max_diff = (Math.abs(result.slope) * options.threshold) + options.threshold

    const good = all_points_are_close_to_fitted_line({
        predict: result.predict,
        data,
        start_data_index,
        end_data_index,
        max_diff,
    })

    const count = (end_data_index - start_data_index) + 1
    // Edge case: Test for count == 2 because when threshold is 0, even with only
    // two points in a line, the diff value can erroneously be > 0 and thus the
    // line is apparently never good even though by definition to should be perfect
    if (good || count == 2) {
        return {
            reached_index: end_data_index,
            compressed_line: {
                start_point: data[start_data_index],
                end_point: data[end_data_index],
                count
            }
        }
    } else {
        return null
    }
}

interface AllPointsAreCloseToFittedLineArgs {
    predict: (x: number) => number;
    data: Point[];
    start_data_index: number;
    end_data_index: number;
    max_diff: number;
}

function all_points_are_close_to_fitted_line ({predict, data, start_data_index, end_data_index, max_diff}: AllPointsAreCloseToFittedLineArgs) {

    /**
     * calculate difference between all points and fit line.  If any are
     * significantly different then reject this set of data and try a small set
     */
    for (let i = start_data_index; i <= end_data_index; ++i) {

        const point = data[i]
        const y = predict(point.x)
        const diff = Math.abs(y - point.y)
        if (diff > max_diff) {
            return false
        }
    }

    return true
}

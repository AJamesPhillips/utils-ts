import { is_number as is_num } from "../number"

export interface Options {
    start?: number
    end?: number
}

export interface Region {
    start?: number
    end?: number
    style?: string
}

/**
 * TODO: remove this from here and place in a `data` directory
 */
export function interpolate_points (data: (number | null)[], options: Options = {}) {
    let previous_value_index: number
    let next_value_index: number | undefined

    let new_data = data.slice(0)
    let regions: Region[] = []
    let modified_start = false
    let modified_end = false

    if (new_data.length) {
        if (is_num(options.start) && !is_num(new_data[0])) {
            new_data[0] = options.start
            modified_start = true
        }
        if (is_num(options.end) && !is_num(new_data[new_data.length - 1])) {
            new_data[new_data.length - 1] = options.end
            modified_end = true
        }
    }

    let open_region: Region | undefined

    new_data.forEach((value, i) => {
        if (is_num(value)) {
            if (modified_start && i === 0) {
                open_region = {start: i}
            } else {
                if (modified_end && i === new_data.length - 1 && !open_region) {
                    open_region = {start: previous_value_index}
                }
                // close any open region
                if (open_region) {
                    open_region.end = i
                    regions.push(open_region)
                    open_region = undefined
                }
            }
            previous_value_index = i
            return
        }

        // calculate previousValue
        if (!is_num(previous_value_index)) {
            new_data[i] = null
            return
        }
        let previous_value = new_data[previous_value_index]
        if (!is_num(previous_value)) {
            new_data[i] = null
            return
        }

        // calculate nextValue
        // update nextValueIndex if now redundant
        if (!is_num(next_value_index) || i > next_value_index) {
            next_value_index = undefined
            // search forwards to find nextValueIndex
            for (let j = i + 1; j < new_data.length; ++j) {
                if (is_num(new_data[j])) {
                    next_value_index = j
                    break
                }
            }
        }

        if (!is_num(next_value_index)) {
            new_data[i] = null
            return
        }
        const next_value = new_data[next_value_index]
        if (!is_num(next_value)) {
            new_data[i] = null
            return
        }

        // linear interpolation
        const index_diff = next_value_index - previous_value_index
        const index_progress = i - previous_value_index
        const index_ratio = index_progress / index_diff
        const value_diff = next_value - previous_value
        new_data[i] = previous_value + (value_diff * index_ratio)

        // open a new region
        if (!open_region) {
            open_region = {start: i - 1}
        }
    })

    if (open_region) {
        open_region.end = new_data.length - 1
        regions.push(open_region)
    }

    return {
        data: new_data,
        regions: regions.map(r => { r.style = "dashed"; return r })
    }
}

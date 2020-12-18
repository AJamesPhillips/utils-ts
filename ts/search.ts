
export function binary_search<E> (list: E[], predicate: (v: E) => 1 | 0 | -1) {
	if (list.length === 0) return undefined

	let low = 0
	let high = list.length - 1
    function next_mid () {
        return Math.round(((high - low) / 2) + low)
    }

	let mid = next_mid()
	let match = predicate(list[mid])

	while (match !== 0) {
		if (match === -1)
		{
			high = mid - 1
		}
		else
		{
			low = mid + 1
		}

		if (low > high) return undefined

		mid = next_mid()
		match = predicate(list[mid])
	}

	return { index: mid, value: list[mid] }
}

export function make_value_predicate<E> (value: E) {
    return (v: E) => v === value ? 0 : (v > value ? -1 : 1)
}

export function binary_search_for_value<E> (list: E[], value: E) {
	const predicate = make_value_predicate(value)
	return binary_search(list, predicate)
}

export function binary_search_vlookup<E> (list: { value: E, lookup_max: number }[], lookup_value: number) {
	interface T {
		value: E
		min?: number
		max: number
	}
	const transformed_list: T[] = list.map((v, index) => ({
		value: v.value,
		min: index === 0 ? undefined : list[index - 1].lookup_max,
		max: v.lookup_max
	}))

	const predicate = (v: T) => {
		let result: 1 | 0 | -1 = 0

		if (v.max < lookup_value)
		{
			result = 1
		}
		else if (v.min !== undefined && lookup_value <= v.min)
		{
			result = -1
		}

		return result
	}

	const result = binary_search(transformed_list, predicate)
	return result ? { index: result.index, value: list[result.index] } : undefined
}

export function binary_search_for_value_in_range (list: number[], value: number) {
	const transformed_list = list.map(v => ({ value: v, lookup_max: v }))
	const result = binary_search_vlookup(transformed_list, value)

	return result && {
		index: result.index,
		value: list[result.index],
	}
}


export interface IPredicate<T> {
    (t: T): boolean;
}

export function copy_list_with_replace<T>(list_t: T[], index: number, new_obj: T) {
    return list_t
        .slice(0, index)
        .concat([new_obj])
        .concat(list_t.slice(index + 1, list_t.length));
}

export function copy_list_excluding_index<T>(list_t: T[], index: number): T[] {
    return list_t.slice(0, index).concat(list_t.slice(index + 1, list_t.length));
}

export function find_index_by_predicate<T>(list: T[], predicate: IPredicate<T>): number {
    return list.findIndex(predicate);
}

export function update_entry_by_predicate_and_copy_list<T, TPartial>(
    list_t: T[], predicate: IPredicate<T>, update: TPartial): T[] {
    var index = find_index_by_predicate(list_t, predicate);
    if(index === -1) throw new Error("No entry found with predicate");

    var updated_obj = Object.assign({}, list_t[index], update);

    return copy_list_with_replace<T>(list_t, index, updated_obj);
}

export function update_entries_by_predicate_and_copy_list<T>(
    list_t: T[], predicate: IPredicate<T>, update_fn: ((item: T) => T)): T[] {
    var new_list: T[] = [];
    var changed_list = false;
    for(var i = 0, len = list_t.length; i < len; ++i) {
        var item = list_t[i];
        if(predicate(item)) {
            changed_list = true;
            new_list.push(update_fn(item));
        } else {
            new_list.push(item);
        }
    }
    if(!changed_list) new_list = list_t;
    return new_list;
}

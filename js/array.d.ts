export interface IPredicate<T> {
    (t: T): boolean;
}
export declare function copy_list_with_replace<T>(list_t: T[], index: number, new_obj: T): T[];
export declare function copy_list_excluding_index<T>(list_t: T[], index: number): T[];
export declare function find_index_by_predicate<T>(list: T[], predicate: IPredicate<T>): number;
export declare function update_entry_by_predicate_and_copy_list<T, TPartial>(list_t: T[], predicate: IPredicate<T>, update: TPartial): T[];
export declare function update_entries_by_predicate_and_copy_list<T>(list_t: T[], predicate: IPredicate<T>, update_fn: ((item: T) => T)): T[];

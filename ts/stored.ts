
// Given a date or string, return a date
// Given an optional date or optional string, return an optional date
export function parse_date(value: Date | string): Date;
export function parse_date(value: Date | string | undefined): Date | undefined;
export function parse_date(value: Date): Date {
    return value && new Date(value.toString());
}

// Given a boolean or string, return a boolean
// Given an optional boolean or optional string, return an optional boolean
export function parse_bool(value: boolean | string): boolean;
export function parse_bool(value: boolean | string | undefined): boolean | undefined;
export function parse_bool(value: boolean): boolean {
    return value && (value.toString() === "true");
}

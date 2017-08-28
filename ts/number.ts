import * as _ from "lodash";


export var is_number = (val: any): val is number => {
    return _.isNumber(val) && !_.isNaN(val);
}

export var is_integer = (num: number, loud: boolean = false): boolean => {
    var is_int = is_number(num) && (num === 0 || (Math.round(num)/num) === 1);
    if(!is_int && loud) throw new Error(`Not integer: ${num}`);
    return is_int;
}

export var is_0_or_greater = (num: number, loud: boolean = false): boolean => {
    var is_0_or_more = num >= 0;
    if(!is_0_or_more && loud) throw new Error(`Not >= 0: ${num}`);
    return is_0_or_more;
}

export var is_positive_integer = (num: number, loud: boolean = false): boolean => {
    var isPosInt = is_integer(num, false) && num > 0;
    if(!isPosInt && loud) throw new Error(`Not positive integer: ${num}`);
    return isPosInt;
}

export var is_0_or_greater_integer = (num: number, loud: boolean = false): boolean => {
    var is_0_or_more_int = is_integer(num, false) && is_0_or_greater(num, false);
    if(!is_0_or_more_int && loud) throw new Error(`Not integer >= 0: ${num}`);
    return is_0_or_more_int;
}

export var integer_parser = (val: string): number | undefined => {
    var value = parseInt(val, 10);
    return is_integer(value) ? value : undefined;
}

export var float_parser = (val: string): number | undefined => {
    var value = parseFloat(val);
    return is_number(value) ? value : undefined;
}


export var integer_positive_parser = (val: string): number | undefined => {
    var value = parseInt(val, 10);
    return is_positive_integer(value) ? value : undefined;
}

export var integer_0_or_more_parser = (val: string): number | undefined => {
    var value = parseInt(val, 10);
    return is_0_or_greater_integer(value) ? value : undefined;
}

import * as _ from 'lodash';


export var isNumber = (val: any): boolean => {
  return _.isNumber(val) && !_.isNaN(val);
}

export var isInteger = (num: number, loud: boolean = false): boolean => {
  var isInt = isNumber(num) && (num === 0 || (Math.round(num)/num) === 1);
  if(!isInt && loud) throw new Error(`Not integer: ${num}`);
  return isInt;
}

export var is0OrGreater = (num: number, loud: boolean = false): boolean => {
  var is0OrMore = num >= 0;
  if(!is0OrMore && loud) throw new Error(`Not >= 0: ${num}`);
  return is0OrMore;
}

export var isPositiveInteger = (num: number, loud: boolean = false): boolean => {
  var isPosInt = isInteger(num, false) && num > 0;
  if(!isPosInt && loud) throw new Error(`Not positive integer: ${num}`);
  return isPosInt;
}

export var is0OrGreaterInteger = (num: number, loud: boolean = false): boolean => {
  var is0OrMoreInt = isInteger(num, false) && is0OrGreater(num, false);
  if(!is0OrMoreInt && loud) throw new Error(`Not integer >= 0: ${num}`);
  return is0OrMoreInt;
}

export var integerParser = (val: string): number => {
  var value = parseInt(val, 10);
  return isInteger(value) ? value : undefined;
}

export var floatParser = (val: string): number => {
  var value = parseFloat(val);
  return isNumber(value) ? value : undefined;
}


export var integerPositiveParser = (val: string): number => {
  var value = parseInt(val, 10);
  return isPositiveInteger(value) ? value : undefined;
}

export var integer0OrMoreParser = (val: string): number => {
  var value = parseInt(val, 10);
  return is0OrGreaterInteger(value) ? value : undefined;
}

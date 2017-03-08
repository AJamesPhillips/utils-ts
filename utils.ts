import * as _ from 'lodash';


export var capitalizeFirstLetter = (val: string) => {
  return val.charAt(0).toUpperCase() + val.slice(1);
}

export interface toStringInterface {
  toString: () => string;
}

export var isBrowser = () => typeof window !== 'undefined';

export function toPojo(obj: any): any {
  var pojo = {};
  if(obj instanceof Array) {
    pojo = obj.map(toPojo);
  } else {
    pojo = {};
    Object.getOwnPropertyNames(obj).forEach(function(name: string) {
      var value = obj[name];
      if(value === null || value === undefined) return;
      if(typeof value === 'object') {
        value = toPojo(value);
      }
      // console.log('+defining property....', name, {value: value}, pojo)
      Object.defineProperty(pojo, name, {value: value, writable: true, enumerable: true});
      // console.log('-defining property....', name, {value: value}, pojo)
    });
  }
  // console.log('toPojo', JSON.stringify(obj), Object.getOwnPropertyNames(obj))
  return pojo;
}


export function handleError(handlerName: string) {
  return (error: string) => {
    console.error(`ERROR: ${handlerName}: ${error.toString()}`);
    throw error;
  }
}


export interface IndexableByString {
  [key: string]: any;
}

export function simpleObjectsEqual<T extends IndexableByString>(props: string[]) {
  return function(obj1: T, obj2: T): boolean {
    if(obj1 === obj2) return true;
    if(!obj1 || !obj2) return false;
    for(var i=0; i < props.length; ++i) {
      var key = props[i];
      if(_.isDate(obj1[key])) {
        if(obj1[key].toString() !== obj2[key].toString()) return false;
      } else {
        if(obj1[key] !== obj2[key]) return false;
      }
    }
    return true;
  }
}

interface IQueryParams {
  [key: string]: string;
}

export function parseQueryParams(queryParams: string): IQueryParams {
  // remove beginning ?
  queryParams = queryParams.slice(1);
  return queryParams.split(',').reduce<IQueryParams>((accum: IQueryParams, p: string) => {
    var [key, value] = p.split('=');
    accum[key] = value;
    return accum;
  }, {});
}


/**
 * Converts a raw string into a base64 encoded string
 */
export function nodeBtoa(raw: string) {
  var base64: string;
  if(isBrowser()) {
    base64 = window.btoa(raw);
  } else {
    base64 = new Buffer(raw).toString('base64');
  }
  return base64;
}

/**
 * Converts a base64 encoded string back into a utf8 string
 */
export function nodeAtob(b64Encoded: string) {
  var decoded: string;
  if(isBrowser()) {
    decoded = window.atob(b64Encoded);
  } else {
    decoded = new Buffer(b64Encoded, 'base64').toString();
  }
  return decoded;
}

import * as _ from 'lodash';


export var capitalize_first_letter = (val: string) => {
  return val.charAt(0).toUpperCase() + val.slice(1);
}

export interface toStringInterface {
  toString: () => string;
}

export var is_browser = () => typeof window !== 'undefined';

export function to_pojo(obj: any): any {
  var pojo = {};
  if(obj instanceof Array) {
    pojo = obj.map(to_pojo);
  } else {
    pojo = {};
    Object.getOwnPropertyNames(obj).forEach(function(name: string) {
      var value = obj[name];
      if(value === null || value === undefined) return;
      if(typeof value === 'object') {
        value = to_pojo(value);
      }
      // console.log('+defining property....', name, {value: value}, pojo)
      Object.defineProperty(pojo, name, {value: value, writable: true, enumerable: true});
      // console.log('-defining property....', name, {value: value}, pojo)
    });
  }
  // console.log('to_pojo', JSON.stringify(obj), Object.getOwnPropertyNames(obj))
  return pojo;
}


export function handle_error(handler_name: string) {
  return (error: string) => {
    console.error(`ERROR: ${handler_name}: ${error.toString()}`);
    throw error;
  }
}


export interface IndexableByString<T> {
  [key: string]: T;
}

export function simple_objects_equal<T extends IndexableByString<any>>(props: string[]) {
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

export function parse_query_params(query_params: string): IQueryParams {
  // remove beginning ?
  query_params = query_params.slice(1);
  return query_params.split(',').reduce<IQueryParams>((accum: IQueryParams, p: string) => {
    var [key, value] = p.split('=');
    accum[key] = value;
    return accum;
  }, {});
}


/**
 * Converts a raw string into a base64 encoded string
 */
export function node_btoa(raw: string) {
  var base64: string;
  if(is_browser()) {
    base64 = window.btoa(raw);
  } else {
    base64 = new Buffer(raw).toString('base64');
  }
  return base64;
}

/**
 * Converts a base64 encoded string back into a utf8 string
 */
export function node_atob(b64_encoded: string) {
  var decoded: string;
  if(is_browser()) {
    decoded = window.atob(b64_encoded);
  } else {
    decoded = new Buffer(b64_encoded, 'base64').toString();
  }
  return decoded;
}


export function encode_details(details: any) {
  var details_str = JSON.stringify(details);
  var base64_details = node_btoa(details_str);
  return encodeURIComponent(base64_details);
}

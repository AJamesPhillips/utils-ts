
export function random_string(length: number) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for(var i=0; i < length; i++ ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

/**
 * @method bounded  Returns double
 * @param lower_bound inclusive
 * @param upper_bound exclusive
 */
export function bounded(lower_bound: number, upper_bound: number) {
  return Math.random() * (upper_bound - lower_bound) + lower_bound;
}

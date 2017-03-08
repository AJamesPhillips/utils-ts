
export function randomString(length: number) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for(var i=0; i < length; i++ ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

/**
 * @method bounded  Returns double
 * @param lowerBound inclusive
 * @param upperBound exclusive
 */
export function bounded(lowerBound: number, upperBound: number) {
  return Math.random() * (upperBound - lowerBound) + lowerBound;
}

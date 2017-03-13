import * as _ from 'lodash';

/**
 * Provide some light weight testing utils
 */

export function expectToEqual(value1: any, value2: any, testName: string = '', throws: boolean = true) {
  if(value1 !== value2) {
    let msg = `FAILED: "${testName}" Values are not equal to each other: "${value1}" !== "${value2}"`;
    if(throws) {
      throw new Error(msg);
    } else {
      console.error(msg);
    }
  } else {
    console.log(`PASSED: "${testName}"`);
  }
}

export function expectToContain<T>(listOfValues: T[], value: T, testName: string = '') {
  if(!_.includes(listOfValues, value)) {
    throw new Error(`FAILED: "${testName}" Value not contained in list: "${value}" not in "${listOfValues.map((v) => v.toString()).join(', ')}"`);
  } else {
    console.log(`PASSED: "${testName}"`);
  }
}



/**
 * Provide some light weight testing utils
 */

export function expect_to_equal(value1: any, value2: any, test_name: string = "", throws: boolean = true) {
   if(value1 !== value2) {
      let msg = `FAILED: "${test_name}" Values are not equal to each other: "${value1}" !== "${value2}"`;
      if(throws) {
          throw new Error(msg);
      } else {
          console.error(msg);
      }
   } else {
      console.log(`PASSED: "${test_name}"`);
   }
}

export function expect_to_contain<T>(list_of_values: T[], value: T, test_name: string = "") {
   if (list_of_values.indexOf(value) > -1) {
      throw new Error(`FAILED: "${test_name}" Value not contained in list: "${value}" not in "${list_of_values.map(v => `${v}`).join(", ")}"`);
   } else {
      console.log(`PASSED: "${test_name}"`);
   }
}


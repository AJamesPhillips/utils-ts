
import * as assert from 'assert';

import {from_pojo_date} from '../json';


// TODO add typescript definition test to check that:
// var a: Date = from_pojo_date(undefined);  // errors
// var b: Date = from_pojo_date(new Date());  // ok
// var c: Date | undefined = from_pojo_date(undefined);  // ok
// var d: Date | undefined = from_pojo_date(new Date());  // ok

describe('json', function() {
  describe('from_pojo_date', function() {
    it('should return undefined when value is not present', function() {
      var optional_date_or_string: Date | string | undefined = undefined;
      assert.equal(undefined, from_pojo_date(optional_date_or_string));
    });

    it('should return a date when value is a string', function() {
      var optional_date_as_string: Date | string | undefined = '2017-03-20 12:20:30Z+3';
      var optional_date_as_date: Date | string | undefined = new Date('2017-03-20 12:20:30Z+3');

      let expected_date = new Date('2017-03-20 12:20:30Z+3')
      assert.equal(expected_date.getTime(), from_pojo_date(optional_date_as_string).getTime());
      assert.equal(expected_date.getTime(), from_pojo_date(optional_date_as_date).getTime());
    });

    it('should return undefined when value is a malformed string', function() {
      let optional_date_as_bad_string: Date | string | undefined = '2017-03-20 1';

      let result = from_pojo_date(optional_date_as_bad_string);
      assert.equal(true, isNaN(result.getTime()));
    });
  });
});

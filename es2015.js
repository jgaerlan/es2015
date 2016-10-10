var assert = require('assert');

describe('Arrows', function () {
  it('should increment each element of the array', function() {
    var increment = [1,2,3].map(v => v + 1);
    assert.deepEqual(increment, [2, 3, 4]);
  });
});

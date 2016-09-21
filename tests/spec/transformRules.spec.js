var emptyFn = function () {};

describe('transformRules', function () {
  it('should correctly transform array of rules to object', () => {
    transformRules([
      { id: 1, title: 'test1', body: emptyFn, passed: 2, failed: null },
      { id: 2, title: 'test2', body: emptyFn, passed: null, failed: null }
    ]).should.be.deep.equal({
      1: { title: 'test1', body: emptyFn, passed: 2, failed: null },
      2: { title: 'test2', body: emptyFn, passed: null, failed: null }
    });
  });

  it('should fail if rule id is missing', () => {
    (function () {
      transformRules([
        { title: 'test1', body: emptyFn, passed: null, failed: null }
      ])
    }).should.throw(Error, 'Rule id is not defined at index = 0');
  });

  it('should fail if rule id is already defined', () => {
    (function () {
      transformRules([
        { id: 1, title: 'test1', body: emptyFn, passed: null, failed: null },
        { id: 1, title: 'test1', body: emptyFn, passed: null, failed: null },
      ])
    }).should.throw(Error, 'Rule with id 1 is already defined');
  });

  it('should fail if rule with id 1 is missing', () => {
    (function () {
      transformRules([
        { id: 2, title: 'test1', body: emptyFn, passed: null, failed: null },
      ])
    }).should.throw(Error, 'Start rule 1 was not found');
  });

  it('should fail if rule has wrong dependency on passed flow', () => {
    (function () {
      transformRules([
        { id: 1, title: 'test1', body: emptyFn, passed: 2, failed: null },
      ])
    }).should.throw(Error, 'Wrong rule dependency detected (passed) for rule 1');
  });

  it('should fail if rule has wrong dependency on failed flow', () => {
    (function () {
      transformRules([
        { id: 1, title: 'test1', body: emptyFn, passed: null, failed: 2 },
      ])
    }).should.throw(Error, 'Wrong rule dependency detected (failed) for rule 1');
  });
});

var emptyFn = function () {};

describe('runFlow', function () {
  it('should correctly run flow', () => {
    var OBJ = { hello: 'world' };

    var fn1 = function (obj) {
      obj.should.deep.equal(OBJ);
      return true;
    };

    var fn2 = function (obj) {
      obj.should.deep.equal(OBJ);
      return false;
    };

    var log = sinon.spy();

    runFlow({
      1: { title: 'test1', body: fn1, passed: 2, failed: null },
      2: { title: 'test2', body: fn2, passed: null, failed: null }
    }, OBJ, log);

    log.callCount.should.be.equal(2);

    log.firstCall.args.should.be.deep.equal([
      '%c #%d %s - %s. %s',
      'color: #3a3',
      1,
      'test1',
      'passed',
      ''
    ]);

    log.secondCall.args.should.be.deep.equal([
      '%c #%d %s - %s. %s',
      'color: #a33',
      2,
      'test2',
      'failed',
      'End.'
    ]);
  });

  it('should fail if rules contain circulaer dependency', () => {
    var OBJ = { hello: 'world' };

    var fn1 = function (obj) {
      obj.should.deep.equal(OBJ);
      return true;
    };

    var log = sinon.spy();

    (function () {
      runFlow({
        1: { title: 'test1', body: fn1, passed: 1, failed: null },
      }, OBJ, log);
    }).should.throw(Error, 'Circular rule dependency detected. Rule #1 was already visited before');

    log.callCount.should.be.equal(1);

    log.firstCall.args.should.be.deep.equal([
      '%c #%d %s - %s. %s',
      'color: #3a3',
      1,
      'test1',
      'passed',
      ''
    ]);
  });
});

var assert = require('assert');
var once = require('func').once;
var throttle = require('func').throttle;
var debounce = require('func').debounce;

describe('once(fn)', function(){
  describe('without a receiver', function(){
    it('should invoke the function only once', function(){
      var calls = 0;

      function hey() {
        ++calls;
      }

      var fn = once(hey);
      fn();
      fn();
      fn();
      fn();
      assert(1 == calls);
    })

    it('should pass arguments', function(){
      var args = [];

      function hey(name) {
        args.push(name);
      }

      var fn = once(hey);
      fn('tobi');
      fn('loki');
      assert(1 == args.length);
      assert('tobi' == args[0]);
    })
  })

  describe('with a receiver', function(){
    it('should invoke once per receiver', function(){
      var calls = [];

      function print() {
        calls.push(this.name);
      }

      var tobi = { name: 'tobi', print: once(print) };
      var loki = { name: 'loki', print: once(print) };

      tobi.print();
      tobi.print();
      tobi.print();
      loki.print();
      loki.print();
      loki.print();

      assert(2 == calls.length);
      assert('tobi' == calls[0]);
      assert('loki' == calls[1]);
    })
  })
})


describe('throttle', function(){

  var invoked = 0;
  var interval;
  function count(){
    invoked++;
  }

  afterEach(function(){
    invoked = 0;
    clearInterval(interval);
  });

  it('should throttle a function', function(done){
    var wait = 100;
    var total = 1000;
    var fn = throttle(count, wait);
    interval = setInterval(fn, 20);
    setTimeout(function(){
      assert(invoked === (total / wait));
      done();
    }, total + 5);
  });

  it('should throttle with a max', function(done){
    var wait = 100;
    var max = 3;
    var total = 1000;
    var fn = throttle(count, wait, max);
    interval = setInterval(fn, 20);
    setTimeout(function(){
      var invoked = (total/wait) * max;
      assert(invoked === invoked);
      done();
    }, total + 5);
  });
});

describe('debounce', function () {

  var invoked = 0;
  function count(){
    invoked++;
  }

  afterEach(function(){
    invoked = 0;
  });

  it('should debounce only once', function (done) {
    var fn = debounce(count, 50);
    var interval = setInterval(fn, 20);
    setTimeout(function() {
      clearInterval(interval);
    }, 500);
    setTimeout(function() {
      assert(invoked === 1);
      done();
    }, 1000);
  })

  it('should debounce debounce at beginning', function (done) {
    var fn = debounce(count, 50, true);
    var interval = setInterval(fn, 20);
    setTimeout(function() {
      assert(invoked === 1);
      done();
    }, 1000);
  })
})

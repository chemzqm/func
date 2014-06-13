
/**
 * Identifier.
 */

var n = 0;

/**
 * Global.
 */

var global = (function(){ return this })();

/**
 * Make `fn` callable only once.
 *
 * @param {Function} fn
 * @return {Function}
 * @api public
 */

exports.once = function(fn) {
  var id = n++;
  var called;

  function once(){
    // no receiver
    if (this == global) {
      if (called) return;
      called = true;
      return fn.apply(this, arguments);
    }

    // receiver
    var key = '__called_' + id + '__';
    if (this[key]) return;
    this[key] = true;
    return fn.apply(this, arguments);
  }

  return once;
};


/**
 * Returns a new function that, when invoked, invokes `func` at most `max` times per
 * `wait` milliseconds.
 *
 * @param {Function} func The `Function` instance to wrap.
 * @param {Number} wait The minimum number of milliseconds that must elapse in between `max` `func` invocations.
 * @param {Number} max The maximum number of times `func` may be invoked between `wait` milliseconds.
 * @return {Function} A new function that wraps the `func` function passed in.
 * @api public
 */

exports.throttle = function (func, wait, max) {
  max = max || 1;
  var rtn; // return value
  var last = 0; // last invokation timestamp
  var count = 0; // number of times invoked
  return function throttled () {
    var now = new Date().getTime();
    var delta = now - last;
    if (delta >= wait) { // reset
      last = now;
      count = 0;
    }
    if (count++ < max) rtn = func.apply(this, arguments);
    return rtn;
  };
}

/**
 * Debounces a function by the given threshold.
 *
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */

module.exports = function debounce(func, threshold, execAsap){
  var timeout;

  return function debounced(){
    var obj = this, args = arguments;

    function delayed () {
      if (!execAsap) {
        func.apply(obj, args);
      }
      timeout = null;
    }

    if (timeout) {
      clearTimeout(timeout);
    } else if (execAsap) {
      func.apply(obj, args);
    }

    timeout = setTimeout(delayed, threshold || 100);
  };
};

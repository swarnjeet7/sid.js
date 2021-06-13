(function () {
  var win = window,
    doc = win.document,
    arr = Array.prototype,
    push = arr.push,
    splice = arr.splice,
    idReg = new RegExp(/^#\w+$/g),
    classReg = new RegExp(/^.\w+$/g),
    htmlReg = new RegExp(/^<.*>$/g),
    tagReg = new RegExp(/^\w+$/g);

  var sid = function (selector, context) {
    return new Sid(selector, context);
  };

  function Sid(selector, context) {
    // handle falsy value
    if (!selector) return this;
    var elms = selector;

    // handle string;
    if (isString(selector)) {
      var ctx = context ? (isSid(context) ? context[0] : context) : doc;
      elms = idReg.test(selector)
        ? doc.getElementById(selector.slice(1))
        : htmlReg.test(selector)
        ? parseHtml(selector, ctx)
        : find(selector, ctx);
    }

    if (elms.nodeType === 1 || elms === win || elms === doc) elms = [elms];
    this.length = elms.length;

    for (var i = 0, l = elms.length; i < l; i++) {
      this[i] = elms[i];
    }
    // return this;
  }
  var fn = Sid.prototype;
  sid.fn = sid.prototype = fn;
  // now above fn is a prototype of Sid and fn is also a prototype of sid. We can use fn to denote Sid.prototype;
  fn.length = 0;
  fn.splice = splice;

  // helper functions
  function find(selector, context) {
    return classReg.test(selector)
      ? context.getElementsByClassName(selector.slice(1))
      : tagReg.test(selector)
      ? context.getElementsByTagName(selector)
      : context.querySelectorAll(selector);
  }

  function parseHtml(selector) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(selector, "text/html");
    return doc.body.children;
  }

  function isString(x) {
    return typeof x === "string";
  }

  function isBoolean(x) {
    return typeof x === "boolean";
  }

  function isFunction(x) {
    return typeof x === "function";
  }

  function isUndefined(x) {
    return typeof x === "undefined";
  }

  if (isUndefined(window.$)) {
    window.sid = window.$ = sid;
  } else {
    window.sid = sid;
  }
})();

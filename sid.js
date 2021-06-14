(function () {
  var win = window,
    doc = win.document,
    arr = Array.prototype,
    push = arr.push,
    splice = arr.splice,
    htmlReg = new RegExp(/^<.*>$/g);

  var sid = function (selector, context) {
    return new Sid(selector, context);
  };

  function Sid(selector, context) {
    // handle falsy value
    if (!selector) return this;
    var elms = selector;

    // handle string;
    if (isString(selector)) {
      var ctx = context
        ? isSid(context)
          ? context[0]
          : context === win
          ? doc
          : context
        : doc;
      elms = htmlReg.test(selector)
        ? parseHtml(selector, ctx)
        : ctx.querySelectorAll(selector);
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
  fn.splice = splice; // to show like an array in chrome dev tools
  fn.each = function each(cb) {
    if (!isFunction(cb)) throw new Error(cb + "is not a function");
    for (var i = 0, l = this.length; i < l; i++) {
      cb.call(this[i], i, this[i]);
    }
    return this;
  };
  fn.eq = function (num) {
    return sid(this[num]);
  };
  fn.get = function (num) {
    return this[num];
  };

  // please copy the function from below as per your need
  fn.addClass = function (cls) {
    if (!cls) return result;
    if (isBoolean(cls)) throw new Error(cls + " is not a typeof string");
    var cls = cls.match(/\w+/g);
    this.each(function (i) {
      for (var j = 0, l = cls.length; j < l; j++) {
        this.classList.add(cls[j]);
      }
    });
    return this;
  };

  /*
    If you want to remove all classes just pass empty string
  */
  fn.removeClass = function (cls) {
    if (!cls && cls !== "") return result;
    if (isBoolean(cls)) throw new Error(cls + " is not a typeof string");
    var clArr = cls.match(/\w+/g);

    this.each(function (i) {
      if (cls === "") {
        this.className = "";
      } else {
        for (var j = 0, l = clArr.length; j < l; j++) {
          this.classList.remove(clArr[j]);
        }
      }
    });
    return this;
  };

  fn.toggleClass = function (cls) {
    if (!cls) return result;
    if (isBoolean(cls)) throw new Error(cls + " is not a typeof string");
    var cls = cls.match(/\w+/g);
    this.each(function (i) {
      for (var j = 0, l = cls.length; j < l; j++) {
        this.classList.toggle(cls[j]);
      }
    });
    return this;
  };

  fn.next = function () {
    if (this.get(0)) {
      return sid(this.get(0).nextElementSibling);
    }
    return sid();
  };

  fn.prev = function () {
    if (this.get(0)) {
      return sid(this.get(0).previousElementSibling);
    }
    return sid();
  };

  fn.css = function (prop, value) {
    if (isObject(prop)) {
      this.each(function () {
        for (var k in prop) {
          this.style[k] = prop[k];
        }
      });
    }
    if (prop && value) {
      this.each(function () {
        this.style[prop] = value;
      });
    }
    if (prop && isString(prop) && !value) {
      var styleObj = window.getComputedStyle(this.get(0));
      return styleObj.getPropertyValue(prop);
    }
    return this;
  };

  /*
    its always takes a element or instance of sid 
  */
  fn.append = function (x) {
    if (!x) return this;
    var len = this.length;

    // if x is element or collection or sid object
    this.each(function (k, item) {
      var arr = x.length ? x : [x];
      for (var i = 0, l = arr.length; i < l; i++) {
        debugger;
        var el = len - 1 === k ? arr[i] : arr[i].cloneNode(true);
        item.appendChild(el);
      }
    });

    return this;
  };

  fn.click = function (cb) {
    if (!isFunction(cb)) throw new Error(cb + "is not a function");
    this.each(function (k, item) {
      item.addEventListener("click", cb.bind(item));
    });

    return this;
  };

  /*
    Need outer width then pass true as an argument; It will return the width + margin of both side
  */
  fn.width = function (flag) {
    var styleObj = window.getComputedStyle(this.get(0));
    var width = styleObj.getPropertyValue("width");
    var padding;
    if (!flag) return width;
    styleObj.getPropertyValue("width");
  };
  // please copy the function from above as per your need

  // helper functions
  function camelCase(x) {
    return x.replace(function () {
      return true;
    });
  }

  function parseHtml(selector) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(selector, "text/html");
    return doc.body.children;
  }

  function isSid(x) {
    return x instanceof Sid;
  }

  function isObject(x) {
    return (
      typeof x === "object" &&
      x !== null &&
      typeof x.constructor === "function" &&
      !Array.isArray(x)
    );
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

(function ($) {
  var arr = [],
    push = arr.push;
  var doc = window.document;

  var sid = function (selector) {
    return new sid.fn.init(selector);
  };

  sid.fn = sid.prototype = {
    v: "1.0.0",
    length: 0,

    each: function (cb) {
      var len = this.length,
        i = 0;
      for (; i < len; i++) {
        cb.call(this[i], i, this[i]);
      }
      return this;
    },

    eq: function (num) {
      return sid(this[num]);
    },

    addClass: function (value) {
      if (!value || typeof value === "object") return this;
      var classes = value.match(/[^\x20\t\r\n\f]+/g);
      if (classes === null) return this;
      var len = classes.length;
      if (len) {
        this.each(function (i, el) {
          for (var i = 0; i < len; i++) {
            el.classList.add(classes[i]);
          }
        });
      }
      return this;
    },

    removeClass: function (value) {
      if (!value || typeof value === "object") return this;
      var classes = value.match(/[^\x20\t\r\n\f]+/g);
      if (classes === null) return this;
      var len = classes.length;
      if (len) {
        this.each(function (i, el) {
          for (var i = 0; i < len; i++) {
            el.classList.remove(classes[i]);
          }
        });
      }
      return this;
    },
  };
  var makeArray = function (el, result) {
    if (el.nodeType) {
      push.call(result, el);
      return result;
    }
    var len = el.length,
      i = 0;
    if (len === 0) {
      push.call(result);
    }
    for (; i < len; i++) {
      push.call(result, el[i]);
    }

    return result;
  };

  var init = (sid.fn.init = function (selector) {
    var el;
    // HANDLE: $(""), $(null), $(undefined), $(false)
    if (!selector) return this;
    // selector type string
    if (typeof selector === "string") {
      if (
        selector[0] === "<" &&
        selector[selector.length - 1] === ">" &&
        selector.length >= 3
      ) {
        var matches = selector.match(/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/);
        if (!matches) throw new Error();
        var parser = new DOMParser();
        var html = parser.parseFromString(selector, "text/html");
        el = html.body.children;
      } else {
        el = doc.querySelectorAll(selector);
      }
      this.length = el.length;
    }
    // document
    if (selector.nodeType) {
      this.length = 1;
      el = selector;
      if (selector.length) {
        this.length = el.length;
      }
    }
    // funciton
    if (selector === "function") {
      throw new Error("Function is not acceptable");
    }
    //
    // returning the result
    return makeArray(el, this);
  });

  init.prototype = sid.fn;

  if (typeof $ === "function" && typeof $.fn === "object" && $.fn.jquery) {
    window.sid = sid;
  } else {
    window.sid = window.$ = sid;
  }
})(window.$);

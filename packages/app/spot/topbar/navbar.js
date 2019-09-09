define(["react", "react-dom"], function(t, e) {
  return (function(t) {
    var e = {};
    function n(r) {
      if (e[r]) return e[r].exports;
      var o = (e[r] = { i: r, l: !1, exports: {} });
      return t[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
    }
    return (
      (n.m = t),
      (n.c = e),
      (n.d = function(t, e, r) {
        n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r });
      }),
      (n.r = function(t) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      }),
      (n.t = function(t, e) {
        if ((1 & e && (t = n(t)), 8 & e)) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var r = Object.create(null);
        if (
          (n.r(r),
          Object.defineProperty(r, "default", { enumerable: !0, value: t }),
          2 & e && "string" != typeof t)
        )
          for (var o in t)
            n.d(
              r,
              o,
              function(e) {
                return t[e];
              }.bind(null, o)
            );
        return r;
      }),
      (n.n = function(t) {
        var e =
          t && t.__esModule
            ? function() {
                return t.default;
              }
            : function() {
                return t;
              };
        return n.d(e, "a", e), e;
      }),
      (n.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }),
      (n.p = ""),
      n((n.s = 29))
    );
  })([
    function(e, n) {
      e.exports = t;
    },
    function(t, e, n) {
      t.exports = n(24)();
    },
    ,
    function(t, e) {
      t.exports = function(t, e) {
        (t.prototype = Object.create(e.prototype)),
          (t.prototype.constructor = t),
          (t.__proto__ = e);
      };
    },
    function(t, e, n) {
      var r = n(27);
      (t.exports = d),
        (t.exports.parse = i),
        (t.exports.compile = function(t, e) {
          return c(i(t, e));
        }),
        (t.exports.tokensToFunction = c),
        (t.exports.tokensToRegExp = p);
      var o = new RegExp(
        [
          "(\\\\.)",
          "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"
        ].join("|"),
        "g"
      );
      function i(t, e) {
        for (
          var n, r = [], i = 0, a = 0, c = "", l = (e && e.delimiter) || "/";
          null != (n = o.exec(t));

        ) {
          var f = n[0],
            p = n[1],
            d = n.index;
          if (((c += t.slice(a, d)), (a = d + f.length), p)) c += p[1];
          else {
            var h = t[a],
              m = n[2],
              v = n[3],
              y = n[4],
              g = n[5],
              b = n[6],
              w = n[7];
            c && (r.push(c), (c = ""));
            var x = null != m && null != h && h !== m,
              E = "+" === b || "*" === b,
              C = "?" === b || "*" === b,
              O = n[2] || l,
              S = y || g;
            r.push({
              name: v || i++,
              prefix: m || "",
              delimiter: O,
              optional: C,
              repeat: E,
              partial: x,
              asterisk: !!w,
              pattern: S ? s(S) : w ? ".*" : "[^" + u(O) + "]+?"
            });
          }
        }
        return a < t.length && (c += t.substr(a)), c && r.push(c), r;
      }
      function a(t) {
        return encodeURI(t).replace(/[\/?#]/g, function(t) {
          return (
            "%" +
            t
              .charCodeAt(0)
              .toString(16)
              .toUpperCase()
          );
        });
      }
      function c(t) {
        for (var e = new Array(t.length), n = 0; n < t.length; n++)
          "object" == typeof t[n] &&
            (e[n] = new RegExp("^(?:" + t[n].pattern + ")$"));
        return function(n, o) {
          for (
            var i = "",
              c = n || {},
              u = (o || {}).pretty ? a : encodeURIComponent,
              s = 0;
            s < t.length;
            s++
          ) {
            var l = t[s];
            if ("string" != typeof l) {
              var f,
                p = c[l.name];
              if (null == p) {
                if (l.optional) {
                  l.partial && (i += l.prefix);
                  continue;
                }
                throw new TypeError('Expected "' + l.name + '" to be defined');
              }
              if (r(p)) {
                if (!l.repeat)
                  throw new TypeError(
                    'Expected "' +
                      l.name +
                      '" to not repeat, but received `' +
                      JSON.stringify(p) +
                      "`"
                  );
                if (0 === p.length) {
                  if (l.optional) continue;
                  throw new TypeError(
                    'Expected "' + l.name + '" to not be empty'
                  );
                }
                for (var d = 0; d < p.length; d++) {
                  if (((f = u(p[d])), !e[s].test(f)))
                    throw new TypeError(
                      'Expected all "' +
                        l.name +
                        '" to match "' +
                        l.pattern +
                        '", but received `' +
                        JSON.stringify(f) +
                        "`"
                    );
                  i += (0 === d ? l.prefix : l.delimiter) + f;
                }
              } else {
                if (
                  ((f = l.asterisk
                    ? encodeURI(p).replace(/[?#]/g, function(t) {
                        return (
                          "%" +
                          t
                            .charCodeAt(0)
                            .toString(16)
                            .toUpperCase()
                        );
                      })
                    : u(p)),
                  !e[s].test(f))
                )
                  throw new TypeError(
                    'Expected "' +
                      l.name +
                      '" to match "' +
                      l.pattern +
                      '", but received "' +
                      f +
                      '"'
                  );
                i += l.prefix + f;
              }
            } else i += l;
          }
          return i;
        };
      }
      function u(t) {
        return t.replace(/([.+*?=^!:${}()[\]|\/\\])/g, "\\$1");
      }
      function s(t) {
        return t.replace(/([=!:$\/()])/g, "\\$1");
      }
      function l(t, e) {
        return (t.keys = e), t;
      }
      function f(t) {
        return t.sensitive ? "" : "i";
      }
      function p(t, e, n) {
        r(e) || ((n = e || n), (e = []));
        for (
          var o = (n = n || {}).strict, i = !1 !== n.end, a = "", c = 0;
          c < t.length;
          c++
        ) {
          var s = t[c];
          if ("string" == typeof s) a += u(s);
          else {
            var p = u(s.prefix),
              d = "(?:" + s.pattern + ")";
            e.push(s),
              s.repeat && (d += "(?:" + p + d + ")*"),
              (a += d = s.optional
                ? s.partial
                  ? p + "(" + d + ")?"
                  : "(?:" + p + "(" + d + "))?"
                : p + "(" + d + ")");
          }
        }
        var h = u(n.delimiter || "/"),
          m = a.slice(-h.length) === h;
        return (
          o || (a = (m ? a.slice(0, -h.length) : a) + "(?:" + h + "(?=$))?"),
          (a += i ? "$" : o && m ? "" : "(?=" + h + "|$)"),
          l(new RegExp("^" + a, f(n)), e)
        );
      }
      function d(t, e, n) {
        return (
          r(e) || ((n = e || n), (e = [])),
          (n = n || {}),
          t instanceof RegExp
            ? (function(t, e) {
                var n = t.source.match(/\((?!\?)/g);
                if (n)
                  for (var r = 0; r < n.length; r++)
                    e.push({
                      name: r,
                      prefix: null,
                      delimiter: null,
                      optional: !1,
                      repeat: !1,
                      partial: !1,
                      asterisk: !1,
                      pattern: null
                    });
                return l(t, e);
              })(t, e)
            : r(t)
            ? (function(t, e, n) {
                for (var r = [], o = 0; o < t.length; o++)
                  r.push(d(t[o], e, n).source);
                return l(new RegExp("(?:" + r.join("|") + ")", f(n)), e);
              })(t, e, n)
            : (function(t, e, n) {
                return p(i(t, n), e, n);
              })(t, e, n)
        );
      }
    },
    function(t, e, n) {
      "use strict";
      t.exports = n(28);
    },
    function(t, n) {
      t.exports = e;
    },
    function(t, e, n) {
      var r, o, i;
      (o = [e]),
        void 0 ===
          (i =
            "function" ==
            typeof (r = function(t) {
              "use strict";
              function e(t, e, n) {
                return (
                  e in t
                    ? Object.defineProperty(t, e, {
                        value: n,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                      })
                    : (t[e] = n),
                  t
                );
              }
              function n(t) {
                return (n =
                  "function" == typeof Symbol &&
                  "symbol" == typeof Symbol.iterator
                    ? function(t) {
                        return typeof t;
                      }
                    : function(t) {
                        return t &&
                          "function" == typeof Symbol &&
                          t.constructor === Symbol &&
                          t !== Symbol.prototype
                          ? "symbol"
                          : typeof t;
                      })(t);
              }
              Object.defineProperty(t, "__esModule", { value: !0 }),
                (t.default = function(s) {
                  if ("object" !== n(s))
                    throw new Error(
                      "single-spa-react requires a configuration object"
                    );
                  var l = (function(t) {
                    for (var n = 1; n < arguments.length; n++) {
                      var r = null != arguments[n] ? arguments[n] : {},
                        o = Object.keys(r);
                      "function" == typeof Object.getOwnPropertySymbols &&
                        (o = o.concat(
                          Object.getOwnPropertySymbols(r).filter(function(t) {
                            return Object.getOwnPropertyDescriptor(
                              r,
                              t
                            ).enumerable;
                          })
                        )),
                        o.forEach(function(n) {
                          e(t, n, r[n]);
                        });
                    }
                    return t;
                  })({}, o, s);
                  if (!l.React)
                    throw new Error(
                      "single-spa-react must be passed opts.React"
                    );
                  if (!l.ReactDOM)
                    throw new Error(
                      "single-spa-react must be passed opts.ReactDOM"
                    );
                  if (!l.rootComponent && !l.loadRootComponent)
                    throw new Error(
                      "single-spa-react must be passed opts.rootComponent or opts.loadRootComponent"
                    );
                  !r &&
                    l.React.createContext &&
                    (t.SingleSpaContext = r = l.React.createContext());
                  var f = {
                    bootstrap: i.bind(null, l),
                    mount: a.bind(null, l),
                    unmount: c.bind(null, l)
                  };
                  return (
                    l.parcelCanUpdate &&
                      (f.update = function(t, e) {
                        return new Promise(function(n, o) {
                          var i = t.React.createElement(t.rootComponent, e);
                          u({
                            elementToRender: r
                              ? t.React.createElement(
                                  r.Provider,
                                  { value: e },
                                  i
                                )
                              : i,
                            domElement: t.domElement,
                            whenFinished: function() {
                              n(this);
                            },
                            opts: t
                          });
                        });
                      }.bind(null, l)),
                    f
                  );
                }),
                (t.SingleSpaContext = void 0);
              var r = null;
              t.SingleSpaContext = r;
              var o = {
                React: null,
                ReactDOM: null,
                rootComponent: null,
                loadRootComponent: null,
                suppressComponentDidCatchWarning: !1,
                domElementGetter: null,
                parcelCanUpdate: !0
              };
              function i(t, e) {
                return t.rootComponent
                  ? Promise.resolve()
                  : t.loadRootComponent().then(function(e) {
                      t.rootComponent = e;
                    });
              }
              function a(t, e) {
                return new Promise(function(n, o) {
                  !t.suppressComponentDidCatchWarning &&
                    (function(t) {
                      if (
                        !(
                          t &&
                          "string" == typeof t.version &&
                          t.version.indexOf(".") >= 0
                        )
                      )
                        return !1;
                      var e = t.version.slice(0, t.version.indexOf("."));
                      try {
                        return Number(e) >= 16;
                      } catch (t) {
                        return !1;
                      }
                    })(t.React) &&
                    (t.rootComponent.prototype
                      ? t.rootComponent.prototype.componentDidCatch ||
                        console.warn(
                          "single-spa-react: ".concat(
                            e.name || e.appName || e.childAppName,
                            "'s rootComponent should implement componentDidCatch to avoid accidentally unmounting the entire single-spa application."
                          )
                        )
                      : console.warn(
                          "single-spa-react: ".concat(
                            e.name || e.appName || e.childAppName,
                            "'s rootComponent does not have a prototype.  If using a functional component, wrap it in an error boundary or other class that implements componentDidCatch to avoid accidentally unmounting the entire single-spa application"
                          )
                        ));
                  var i = (function(t, e) {
                    return (e = e && e.customProps ? e.customProps : e)
                      .domElement
                      ? function() {
                          return e.domElement;
                        }
                      : e.domElementGetter
                      ? e.domElementGetter
                      : t.domElementGetter
                      ? t.domElementGetter
                      : (function(t) {
                          var e = "single-spa-application:".concat(
                            t.appName || t.name
                          );
                          if (!e)
                            throw Error(
                              "single-spa-react was not given an application name as a prop, so it can't make a unique dom element container for the react application"
                            );
                          return function() {
                            var t = document.getElementById(e);
                            return (
                              t ||
                                (((t = document.createElement("div")).id = e),
                                document.body.appendChild(t)),
                              t
                            );
                          };
                        })(e);
                  })(t, e);
                  if ("function" != typeof i)
                    throw new Error(
                      "single-spa-react: the domElementGetter for react application '".concat(
                        e.appName || e.name,
                        "' is not a function"
                      )
                    );
                  var a = t.React.createElement(t.rootComponent, e),
                    c = r
                      ? t.React.createElement(r.Provider, { value: e }, a)
                      : a,
                    s = (function(t, e) {
                      var n = t();
                      if (!n)
                        throw new Error(
                          "single-spa-react: domElementGetter function for application '".concat(
                            e.appName || e.name,
                            "' did not return a valid dom element. Please pass a valid domElement or domElementGetter via opts or props"
                          )
                        );
                      return n;
                    })(i, e);
                  u({
                    elementToRender: c,
                    domElement: s,
                    whenFinished: function() {
                      n(this);
                    },
                    opts: t
                  }),
                    (t.domElement = s);
                });
              }
              function c(t, e) {
                return Promise.resolve().then(function() {
                  t.ReactDOM.unmountComponentAtNode(t.domElement);
                });
              }
              function u(t) {
                var e = t.opts,
                  n = t.elementToRender,
                  r = t.domElement,
                  o = t.whenFinished;
                return "createRoot" === e.renderType
                  ? e.ReactDOM.createRoot(r).render(n, o)
                  : "hydrate" === e.renderType
                  ? e.ReactDOM.hydrate(n, r, o)
                  : e.ReactDOM.render(n, r, o);
              }
            })
              ? r.apply(e, o)
              : r) || (t.exports = i);
    },
    function(t, e) {
      t.exports = function(t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function");
      };
    },
    function(t, e) {
      function n(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(t, r.key, r);
        }
      }
      t.exports = function(t, e, r) {
        return e && n(t.prototype, e), r && n(t, r), t;
      };
    },
    function(t, e, n) {
      var r = n(15),
        o = n(16);
      t.exports = function(t, e) {
        return !e || ("object" !== r(e) && "function" != typeof e) ? o(t) : e;
      };
    },
    function(t, e) {
      function n(e) {
        return (
          (t.exports = n = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t);
              }),
          n(e)
        );
      }
      t.exports = n;
    },
    function(t, e, n) {
      var r = n(17);
      t.exports = function(t, e) {
        if ("function" != typeof e && null !== e)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (t.prototype = Object.create(e && e.prototype, {
          constructor: { value: t, writable: !0, configurable: !0 }
        })),
          e && r(t, e);
      };
    },
    function(t, e, n) {
      "use strict";
      (function(e) {
        var n = "__global_unique_id__";
        t.exports = function() {
          return (e[n] = (e[n] || 0) + 1);
        };
      }.call(this, n(26)));
    },
    function(t, e, n) {
      "use strict";
      var r = n(5),
        o = {
          childContextTypes: !0,
          contextType: !0,
          contextTypes: !0,
          defaultProps: !0,
          displayName: !0,
          getDefaultProps: !0,
          getDerivedStateFromError: !0,
          getDerivedStateFromProps: !0,
          mixins: !0,
          propTypes: !0,
          type: !0
        },
        i = {
          name: !0,
          length: !0,
          prototype: !0,
          caller: !0,
          callee: !0,
          arguments: !0,
          arity: !0
        },
        a = {
          $$typeof: !0,
          compare: !0,
          defaultProps: !0,
          displayName: !0,
          propTypes: !0,
          type: !0
        },
        c = {};
      function u(t) {
        return r.isMemo(t) ? a : c[t.$$typeof] || o;
      }
      c[r.ForwardRef] = {
        $$typeof: !0,
        render: !0,
        defaultProps: !0,
        displayName: !0,
        propTypes: !0
      };
      var s = Object.defineProperty,
        l = Object.getOwnPropertyNames,
        f = Object.getOwnPropertySymbols,
        p = Object.getOwnPropertyDescriptor,
        d = Object.getPrototypeOf,
        h = Object.prototype;
      t.exports = function t(e, n, r) {
        if ("string" != typeof n) {
          if (h) {
            var o = d(n);
            o && o !== h && t(e, o, r);
          }
          var a = l(n);
          f && (a = a.concat(f(n)));
          for (var c = u(e), m = u(n), v = 0; v < a.length; ++v) {
            var y = a[v];
            if (!(i[y] || (r && r[y]) || (m && m[y]) || (c && c[y]))) {
              var g = p(n, y);
              try {
                s(e, y, g);
              } catch (t) {}
            }
          }
          return e;
        }
        return e;
      };
    },
    function(t, e) {
      function n(t) {
        return (n =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function(t) {
                return typeof t;
              }
            : function(t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              })(t);
      }
      function r(e) {
        return (
          "function" == typeof Symbol && "symbol" === n(Symbol.iterator)
            ? (t.exports = r = function(t) {
                return n(t);
              })
            : (t.exports = r = function(t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : n(t);
              }),
          r(e)
        );
      }
      t.exports = r;
    },
    function(t, e) {
      t.exports = function(t) {
        if (void 0 === t)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return t;
      };
    },
    function(t, e) {
      function n(e, r) {
        return (
          (t.exports = n =
            Object.setPrototypeOf ||
            function(t, e) {
              return (t.__proto__ = e), t;
            }),
          n(e, r)
        );
      }
      t.exports = n;
    },
    function(t, e, n) {
      var r = n(19);
      "string" == typeof r && (r = [[t.i, r, ""]]);
      var o = { insert: "head", singleton: !1 };
      n(23)(r, o);
      r.locals && (t.exports = r.locals);
    },
    function(t, e, n) {
      e = t.exports = n(20)(!1);
      var r = n(21)(n(22));
      e.push([
        t.i,
        ".nav-top .logo{width:200px;height:30px;background:url(" +
          r +
          ") top left no-repeat;background-size:200px 30px;position:absolute;top:15px}.nav-top ul{list-style-type:none;margin:0;padding:0;overflow:hidden;background-color:#2f4050}.nav-top li{float:right}.nav-top li a{display:block;color:white;text-align:center;padding:14px 16px;text-decoration:none}.nav-top li a:hover{background-color:#111}.active{background-color:#4CAF50}\n",
        ""
      ]);
    },
    function(t, e, n) {
      "use strict";
      t.exports = function(t) {
        var e = [];
        return (
          (e.toString = function() {
            return this.map(function(e) {
              var n = (function(t, e) {
                var n = t[1] || "",
                  r = t[3];
                if (!r) return n;
                if (e && "function" == typeof btoa) {
                  var o =
                      ((a = r),
                      (c = btoa(
                        unescape(encodeURIComponent(JSON.stringify(a)))
                      )),
                      (u = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(
                        c
                      )),
                      "/*# ".concat(u, " */")),
                    i = r.sources.map(function(t) {
                      return "/*# sourceURL="
                        .concat(r.sourceRoot)
                        .concat(t, " */");
                    });
                  return [n]
                    .concat(i)
                    .concat([o])
                    .join("\n");
                }
                var a, c, u;
                return [n].join("\n");
              })(e, t);
              return e[2] ? "@media ".concat(e[2], "{").concat(n, "}") : n;
            }).join("");
          }),
          (e.i = function(t, n) {
            "string" == typeof t && (t = [[null, t, ""]]);
            for (var r = {}, o = 0; o < this.length; o++) {
              var i = this[o][0];
              null != i && (r[i] = !0);
            }
            for (var a = 0; a < t.length; a++) {
              var c = t[a];
              (null != c[0] && r[c[0]]) ||
                (n && !c[2]
                  ? (c[2] = n)
                  : n && (c[2] = "(".concat(c[2], ") and (").concat(n, ")")),
                e.push(c));
            }
          }),
          e
        );
      };
    },
    function(t, e, n) {
      "use strict";
      t.exports = function(t, e) {
        return "string" != typeof (t = t.__esModule ? t.default : t)
          ? t
          : (/^['"].*['"]$/.test(t) && (t = t.slice(1, -1)),
            /["'() \t\n]/.test(t) || e
              ? '"'.concat(t.replace(/"/g, '\\"').replace(/\n/g, "\\n"), '"')
              : t);
      };
    },
    function(t, e, n) {
      t.exports = n.p + "23075e4e8072321fb853ff6f3b396b67.png";
    },
    function(t, e, n) {
      "use strict";
      var r,
        o = {},
        i = function() {
          return (
            void 0 === r &&
              (r = Boolean(window && document && document.all && !window.atob)),
            r
          );
        },
        a = (function() {
          var t = {};
          return function(e) {
            if (void 0 === t[e]) {
              var n = document.querySelector(e);
              if (
                window.HTMLIFrameElement &&
                n instanceof window.HTMLIFrameElement
              )
                try {
                  n = n.contentDocument.head;
                } catch (t) {
                  n = null;
                }
              t[e] = n;
            }
            return t[e];
          };
        })();
      function c(t, e) {
        for (var n = [], r = {}, o = 0; o < t.length; o++) {
          var i = t[o],
            a = e.base ? i[0] + e.base : i[0],
            c = { css: i[1], media: i[2], sourceMap: i[3] };
          r[a] ? r[a].parts.push(c) : n.push((r[a] = { id: a, parts: [c] }));
        }
        return n;
      }
      function u(t, e) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n],
            i = o[r.id],
            a = 0;
          if (i) {
            for (i.refs++; a < i.parts.length; a++) i.parts[a](r.parts[a]);
            for (; a < r.parts.length; a++) i.parts.push(m(r.parts[a], e));
          } else {
            for (var c = []; a < r.parts.length; a++) c.push(m(r.parts[a], e));
            o[r.id] = { id: r.id, refs: 1, parts: c };
          }
        }
      }
      function s(t) {
        var e = document.createElement("style");
        if (void 0 === t.attributes.nonce) {
          var r = n.nc;
          r && (t.attributes.nonce = r);
        }
        if (
          (Object.keys(t.attributes).forEach(function(n) {
            e.setAttribute(n, t.attributes[n]);
          }),
          "function" == typeof t.insert)
        )
          t.insert(e);
        else {
          var o = a(t.insert || "head");
          if (!o)
            throw new Error(
              "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid."
            );
          o.appendChild(e);
        }
        return e;
      }
      var l,
        f =
          ((l = []),
          function(t, e) {
            return (l[t] = e), l.filter(Boolean).join("\n");
          });
      function p(t, e, n, r) {
        var o = n ? "" : r.css;
        if (t.styleSheet) t.styleSheet.cssText = f(e, o);
        else {
          var i = document.createTextNode(o),
            a = t.childNodes;
          a[e] && t.removeChild(a[e]),
            a.length ? t.insertBefore(i, a[e]) : t.appendChild(i);
        }
      }
      var d = null,
        h = 0;
      function m(t, e) {
        var n, r, o;
        if (e.singleton) {
          var i = h++;
          (n = d || (d = s(e))),
            (r = p.bind(null, n, i, !1)),
            (o = p.bind(null, n, i, !0));
        } else
          (n = s(e)),
            (r = function(t, e, n) {
              var r = n.css,
                o = n.media,
                i = n.sourceMap;
              if (
                (o && t.setAttribute("media", o),
                i &&
                  btoa &&
                  (r += "\n/*# sourceMappingURL=data:application/json;base64,".concat(
                    btoa(unescape(encodeURIComponent(JSON.stringify(i)))),
                    " */"
                  )),
                t.styleSheet)
              )
                t.styleSheet.cssText = r;
              else {
                for (; t.firstChild; ) t.removeChild(t.firstChild);
                t.appendChild(document.createTextNode(r));
              }
            }.bind(null, n, e)),
            (o = function() {
              !(function(t) {
                if (null === t.parentNode) return !1;
                t.parentNode.removeChild(t);
              })(n);
            });
        return (
          r(t),
          function(e) {
            if (e) {
              if (
                e.css === t.css &&
                e.media === t.media &&
                e.sourceMap === t.sourceMap
              )
                return;
              r((t = e));
            } else o();
          }
        );
      }
      t.exports = function(t, e) {
        ((e = e || {}).attributes =
          "object" == typeof e.attributes ? e.attributes : {}),
          e.singleton || "boolean" == typeof e.singleton || (e.singleton = i());
        var n = c(t, e);
        return (
          u(n, e),
          function(t) {
            for (var r = [], i = 0; i < n.length; i++) {
              var a = n[i],
                s = o[a.id];
              s && (s.refs--, r.push(s));
            }
            t && u(c(t, e), e);
            for (var l = 0; l < r.length; l++) {
              var f = r[l];
              if (0 === f.refs) {
                for (var p = 0; p < f.parts.length; p++) f.parts[p]();
                delete o[f.id];
              }
            }
          }
        );
      };
    },
    function(t, e, n) {
      "use strict";
      var r = n(25);
      function o() {}
      function i() {}
      (i.resetWarningCache = o),
        (t.exports = function() {
          function t(t, e, n, o, i, a) {
            if (a !== r) {
              var c = new Error(
                "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
              );
              throw ((c.name = "Invariant Violation"), c);
            }
          }
          function e() {
            return t;
          }
          t.isRequired = t;
          var n = {
            array: t,
            bool: t,
            func: t,
            number: t,
            object: t,
            string: t,
            symbol: t,
            any: t,
            arrayOf: e,
            element: t,
            elementType: t,
            instanceOf: e,
            node: t,
            objectOf: e,
            oneOf: e,
            oneOfType: e,
            shape: e,
            exact: e,
            checkPropTypes: i,
            resetWarningCache: o
          };
          return (n.PropTypes = n), n;
        });
    },
    function(t, e, n) {
      "use strict";
      t.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    },
    function(t, e) {
      var n;
      n = (function() {
        return this;
      })();
      try {
        n = n || new Function("return this")();
      } catch (t) {
        "object" == typeof window && (n = window);
      }
      t.exports = n;
    },
    function(t, e) {
      t.exports =
        Array.isArray ||
        function(t) {
          return "[object Array]" == Object.prototype.toString.call(t);
        };
    },
    function(t, e, n) {
      "use strict";
      /** @license React v16.9.0
       * react-is.production.min.js
       *
       * Copyright (c) Facebook, Inc. and its affiliates.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */ Object.defineProperty(e, "__esModule", { value: !0 });
      var r = "function" == typeof Symbol && Symbol.for,
        o = r ? Symbol.for("react.element") : 60103,
        i = r ? Symbol.for("react.portal") : 60106,
        a = r ? Symbol.for("react.fragment") : 60107,
        c = r ? Symbol.for("react.strict_mode") : 60108,
        u = r ? Symbol.for("react.profiler") : 60114,
        s = r ? Symbol.for("react.provider") : 60109,
        l = r ? Symbol.for("react.context") : 60110,
        f = r ? Symbol.for("react.async_mode") : 60111,
        p = r ? Symbol.for("react.concurrent_mode") : 60111,
        d = r ? Symbol.for("react.forward_ref") : 60112,
        h = r ? Symbol.for("react.suspense") : 60113,
        m = r ? Symbol.for("react.suspense_list") : 60120,
        v = r ? Symbol.for("react.memo") : 60115,
        y = r ? Symbol.for("react.lazy") : 60116,
        g = r ? Symbol.for("react.fundamental") : 60117,
        b = r ? Symbol.for("react.responder") : 60118;
      function w(t) {
        if ("object" == typeof t && null !== t) {
          var e = t.$$typeof;
          switch (e) {
            case o:
              switch ((t = t.type)) {
                case f:
                case p:
                case a:
                case u:
                case c:
                case h:
                  return t;
                default:
                  switch ((t = t && t.$$typeof)) {
                    case l:
                    case d:
                    case s:
                      return t;
                    default:
                      return e;
                  }
              }
            case y:
            case v:
            case i:
              return e;
          }
        }
      }
      function x(t) {
        return w(t) === p;
      }
      (e.typeOf = w),
        (e.AsyncMode = f),
        (e.ConcurrentMode = p),
        (e.ContextConsumer = l),
        (e.ContextProvider = s),
        (e.Element = o),
        (e.ForwardRef = d),
        (e.Fragment = a),
        (e.Lazy = y),
        (e.Memo = v),
        (e.Portal = i),
        (e.Profiler = u),
        (e.StrictMode = c),
        (e.Suspense = h),
        (e.isValidElementType = function(t) {
          return (
            "string" == typeof t ||
            "function" == typeof t ||
            t === a ||
            t === p ||
            t === u ||
            t === c ||
            t === h ||
            t === m ||
            ("object" == typeof t &&
              null !== t &&
              (t.$$typeof === y ||
                t.$$typeof === v ||
                t.$$typeof === s ||
                t.$$typeof === l ||
                t.$$typeof === d ||
                t.$$typeof === g ||
                t.$$typeof === b))
          );
        }),
        (e.isAsyncMode = function(t) {
          return x(t) || w(t) === f;
        }),
        (e.isConcurrentMode = x),
        (e.isContextConsumer = function(t) {
          return w(t) === l;
        }),
        (e.isContextProvider = function(t) {
          return w(t) === s;
        }),
        (e.isElement = function(t) {
          return "object" == typeof t && null !== t && t.$$typeof === o;
        }),
        (e.isForwardRef = function(t) {
          return w(t) === d;
        }),
        (e.isFragment = function(t) {
          return w(t) === a;
        }),
        (e.isLazy = function(t) {
          return w(t) === y;
        }),
        (e.isMemo = function(t) {
          return w(t) === v;
        }),
        (e.isPortal = function(t) {
          return w(t) === i;
        }),
        (e.isProfiler = function(t) {
          return w(t) === u;
        }),
        (e.isStrictMode = function(t) {
          return w(t) === c;
        }),
        (e.isSuspense = function(t) {
          return w(t) === h;
        });
    },
    function(t, e, n) {
      "use strict";
      n.r(e);
      var r = n(0),
        o = n.n(r),
        i = n(6),
        a = n.n(i),
        c = n(7),
        u = n.n(c),
        s = n(8),
        l = n.n(s),
        f = n(9),
        p = n.n(f),
        d = n(10),
        h = n.n(d),
        m = n(11),
        v = n.n(m),
        y = n(12),
        g = n.n(y);
      function b(t, e) {
        (t.prototype = Object.create(e.prototype)),
          (t.prototype.constructor = t),
          (t.__proto__ = e);
      }
      var w = n(3),
        x = n.n(w),
        E = n(1),
        C = n.n(E),
        O = n(13),
        S = n.n(O),
        P = 1073741823;
      var R =
        o.a.createContext ||
        function(t, e) {
          var n,
            o,
            i = "__create-react-context-" + S()() + "__",
            a = (function(t) {
              function n() {
                var e, n, r;
                return (
                  ((e = t.apply(this, arguments) || this).emitter =
                    ((n = e.props.value),
                    (r = []),
                    {
                      on: function(t) {
                        r.push(t);
                      },
                      off: function(t) {
                        r = r.filter(function(e) {
                          return e !== t;
                        });
                      },
                      get: function() {
                        return n;
                      },
                      set: function(t, e) {
                        (n = t),
                          r.forEach(function(t) {
                            return t(n, e);
                          });
                      }
                    })),
                  e
                );
              }
              x()(n, t);
              var r = n.prototype;
              return (
                (r.getChildContext = function() {
                  var t;
                  return ((t = {})[i] = this.emitter), t;
                }),
                (r.componentWillReceiveProps = function(t) {
                  if (this.props.value !== t.value) {
                    var n,
                      r = this.props.value,
                      o = t.value;
                    ((i = r) === (a = o)
                    ? 0 !== i || 1 / i == 1 / a
                    : i != i && a != a)
                      ? (n = 0)
                      : ((n = "function" == typeof e ? e(r, o) : P),
                        0 !== (n |= 0) && this.emitter.set(t.value, n));
                  }
                  var i, a;
                }),
                (r.render = function() {
                  return this.props.children;
                }),
                n
              );
            })(r.Component);
          a.childContextTypes = (((n = {})[i] = C.a.object.isRequired), n);
          var c = (function(e) {
            function n() {
              var t;
              return (
                ((t = e.apply(this, arguments) || this).state = {
                  value: t.getValue()
                }),
                (t.onUpdate = function(e, n) {
                  0 != ((0 | t.observedBits) & n) &&
                    t.setState({ value: t.getValue() });
                }),
                t
              );
            }
            x()(n, e);
            var r = n.prototype;
            return (
              (r.componentWillReceiveProps = function(t) {
                var e = t.observedBits;
                this.observedBits = null == e ? P : e;
              }),
              (r.componentDidMount = function() {
                this.context[i] && this.context[i].on(this.onUpdate);
                var t = this.props.observedBits;
                this.observedBits = null == t ? P : t;
              }),
              (r.componentWillUnmount = function() {
                this.context[i] && this.context[i].off(this.onUpdate);
              }),
              (r.getValue = function() {
                return this.context[i] ? this.context[i].get() : t;
              }),
              (r.render = function() {
                return ((t = this.props.children), Array.isArray(t) ? t[0] : t)(
                  this.state.value
                );
                var t;
              }),
              n
            );
          })(r.Component);
          return (
            (c.contextTypes = (((o = {})[i] = C.a.object), o)),
            { Provider: a, Consumer: c }
          );
        };
      function j() {
        return (j =
          Object.assign ||
          function(t) {
            for (var e = 1; e < arguments.length; e++) {
              var n = arguments[e];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
            }
            return t;
          }).apply(this, arguments);
      }
      function _(t) {
        return "/" === t.charAt(0);
      }
      function T(t, e) {
        for (var n = e, r = n + 1, o = t.length; r < o; n += 1, r += 1)
          t[n] = t[r];
        t.pop();
      }
      var k = function(t) {
          var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : "",
            n = (t && t.split("/")) || [],
            r = (e && e.split("/")) || [],
            o = t && _(t),
            i = e && _(e),
            a = o || i;
          if (
            (t && _(t) ? (r = n) : n.length && (r.pop(), (r = r.concat(n))),
            !r.length)
          )
            return "/";
          var c = void 0;
          if (r.length) {
            var u = r[r.length - 1];
            c = "." === u || ".." === u || "" === u;
          } else c = !1;
          for (var s = 0, l = r.length; l >= 0; l--) {
            var f = r[l];
            "." === f
              ? T(r, l)
              : ".." === f
              ? (T(r, l), s++)
              : s && (T(r, l), s--);
          }
          if (!a) for (; s--; s) r.unshift("..");
          !a || "" === r[0] || (r[0] && _(r[0])) || r.unshift("");
          var p = r.join("/");
          return c && "/" !== p.substr(-1) && (p += "/"), p;
        },
        A =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function(t) {
                return typeof t;
              }
            : function(t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              };
      var M = function t(e, n) {
          if (e === n) return !0;
          if (null == e || null == n) return !1;
          if (Array.isArray(e))
            return (
              Array.isArray(n) &&
              e.length === n.length &&
              e.every(function(e, r) {
                return t(e, n[r]);
              })
            );
          var r = void 0 === e ? "undefined" : A(e);
          if (r !== (void 0 === n ? "undefined" : A(n))) return !1;
          if ("object" === r) {
            var o = e.valueOf(),
              i = n.valueOf();
            if (o !== e || i !== n) return t(o, i);
            var a = Object.keys(e),
              c = Object.keys(n);
            return (
              a.length === c.length &&
              a.every(function(r) {
                return t(e[r], n[r]);
              })
            );
          }
          return !1;
        },
        $ = !0,
        N = "Invariant failed";
      var L = function(t, e) {
        if (!t) throw $ ? new Error(N) : new Error(N + ": " + (e || ""));
      };
      function U(t) {
        return "/" === t.charAt(0) ? t : "/" + t;
      }
      function D(t) {
        return "/" === t.charAt(0) ? t.substr(1) : t;
      }
      function I(t, e) {
        return (function(t, e) {
          return new RegExp("^" + e + "(\\/|\\?|#|$)", "i").test(t);
        })(t, e)
          ? t.substr(e.length)
          : t;
      }
      function F(t) {
        return "/" === t.charAt(t.length - 1) ? t.slice(0, -1) : t;
      }
      function B(t) {
        var e = t.pathname,
          n = t.search,
          r = t.hash,
          o = e || "/";
        return (
          n && "?" !== n && (o += "?" === n.charAt(0) ? n : "?" + n),
          r && "#" !== r && (o += "#" === r.charAt(0) ? r : "#" + r),
          o
        );
      }
      function G(t, e, n, r) {
        var o;
        "string" == typeof t
          ? ((o = (function(t) {
              var e = t || "/",
                n = "",
                r = "",
                o = e.indexOf("#");
              -1 !== o && ((r = e.substr(o)), (e = e.substr(0, o)));
              var i = e.indexOf("?");
              return (
                -1 !== i && ((n = e.substr(i)), (e = e.substr(0, i))),
                {
                  pathname: e,
                  search: "?" === n ? "" : n,
                  hash: "#" === r ? "" : r
                }
              );
            })(t)).state = e)
          : (void 0 === (o = j({}, t)).pathname && (o.pathname = ""),
            o.search
              ? "?" !== o.search.charAt(0) && (o.search = "?" + o.search)
              : (o.search = ""),
            o.hash
              ? "#" !== o.hash.charAt(0) && (o.hash = "#" + o.hash)
              : (o.hash = ""),
            void 0 !== e && void 0 === o.state && (o.state = e));
        try {
          o.pathname = decodeURI(o.pathname);
        } catch (t) {
          throw t instanceof URIError
            ? new URIError(
                'Pathname "' +
                  o.pathname +
                  '" could not be decoded. This is likely caused by an invalid percent-encoding.'
              )
            : t;
        }
        return (
          n && (o.key = n),
          r
            ? o.pathname
              ? "/" !== o.pathname.charAt(0) &&
                (o.pathname = k(o.pathname, r.pathname))
              : (o.pathname = r.pathname)
            : o.pathname || (o.pathname = "/"),
          o
        );
      }
      function H(t, e) {
        return (
          t.pathname === e.pathname &&
          t.search === e.search &&
          t.hash === e.hash &&
          t.key === e.key &&
          M(t.state, e.state)
        );
      }
      function W() {
        var t = null;
        var e = [];
        return {
          setPrompt: function(e) {
            return (
              (t = e),
              function() {
                t === e && (t = null);
              }
            );
          },
          confirmTransitionTo: function(e, n, r, o) {
            if (null != t) {
              var i = "function" == typeof t ? t(e, n) : t;
              "string" == typeof i
                ? "function" == typeof r
                  ? r(i, o)
                  : o(!0)
                : o(!1 !== i);
            } else o(!0);
          },
          appendListener: function(t) {
            var n = !0;
            function r() {
              n && t.apply(void 0, arguments);
            }
            return (
              e.push(r),
              function() {
                (n = !1),
                  (e = e.filter(function(t) {
                    return t !== r;
                  }));
              }
            );
          },
          notifyListeners: function() {
            for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
              n[r] = arguments[r];
            e.forEach(function(t) {
              return t.apply(void 0, n);
            });
          }
        };
      }
      var q = !(
        "undefined" == typeof window ||
        !window.document ||
        !window.document.createElement
      );
      function V(t, e) {
        e(window.confirm(t));
      }
      var z = "popstate",
        J = "hashchange";
      function K() {
        try {
          return window.history.state || {};
        } catch (t) {
          return {};
        }
      }
      function Y(t) {
        void 0 === t && {}, q || L(!1);
        var e,
          n = window.history,
          r =
            ((-1 === window.navigator.userAgent.indexOf("Android 2.") &&
              -1 === e.indexOf("Android 4.0")) ||
              -1 === e.indexOf("Mobile Safari") ||
              -1 !== e.indexOf("Chrome") ||
              -1 !== e.indexOf("Windows Phone")) &&
            window.history &&
            "pushState" in window.history,
          o = !(-1 === window.navigator.userAgent.indexOf("Trident")),
          i = t,
          a = i.forceRefresh,
          c = void 0 !== a && a,
          u = i.getUserConfirmation,
          s = void 0 === u ? V : u,
          l = i.keyLength,
          f = void 0 === l ? 6 : l,
          p = t.basename ? F(U(t.basename)) : "";
        function d(t) {
          var e = t || {},
            n = e.key,
            r = e.state,
            o = window.location,
            i = o.pathname + o.search + o.hash;
          return p && I(i, p), G(i, r, n);
        }
        function h() {
          return Math.random()
            .toString(36)
            .substr(2, f);
        }
        var m = W();
        function v(t) {
          j(_, t),
            (_.length = n.length),
            m.notifyListeners(_.location, _.action);
        }
        function y(t) {
          (function(t) {
            void 0 === t.state && navigator.userAgent.indexOf("CriOS");
          })(t) || w(d(t.state));
        }
        function g() {
          w(d(K()));
        }
        var b = !1;
        function w(t) {
          if (b) !1, v();
          else {
            m.confirmTransitionTo(t, "POP", s, function(e) {
              e
                ? v({ action: "POP", location: t })
                : (function(t) {
                    var e = _.location,
                      n = E.indexOf(e.key);
                    -1 === n && 0;
                    var r = E.indexOf(t.key);
                    -1 === r && 0;
                    var o = n - r;
                    o && (!0, O(o));
                  })(t);
            });
          }
        }
        var x = d(K()),
          E = [x.key];
        function C(t) {
          return p + B(t);
        }
        function O(t) {
          n.go(t);
        }
        var S = 0;
        function P(t) {
          1 === (S += t) && 1 === t
            ? (window.addEventListener(z, y),
              o && window.addEventListener(J, g))
            : 0 === S &&
              (window.removeEventListener(z, y),
              o && window.removeEventListener(J, g));
        }
        var R = !1;
        var _ = {
          length: n.length,
          action: "POP",
          location: x,
          createHref: C,
          push: function(t, e) {
            var o = G(t, e, h(), _.location);
            m.confirmTransitionTo(o, "PUSH", s, function(t) {
              if (t) {
                var e = C(o),
                  i = o.key,
                  a = o.state;
                if (r)
                  if ((n.pushState({ key: i, state: a }, null, e), c))
                    window.location.href = e;
                  else {
                    var u = E.indexOf(_.location.key),
                      s = E.slice(0, -1 === u ? 0 : u + 1);
                    s.push(o.key), s, v({ action: "PUSH", location: o });
                  }
                else window.location.href = e;
              }
            });
          },
          replace: function(t, e) {
            var o = G(t, e, h(), _.location);
            m.confirmTransitionTo(o, "REPLACE", s, function(t) {
              if (t) {
                var e = C(o),
                  i = o.key,
                  a = o.state;
                if (r)
                  if ((n.replaceState({ key: i, state: a }, null, e), c))
                    window.location.replace(e);
                  else {
                    var u = E.indexOf(_.location.key);
                    -1 !== u && (E[u] = o.key),
                      v({ action: "REPLACE", location: o });
                  }
                else window.location.replace(e);
              }
            });
          },
          go: O,
          goBack: function() {
            O(-1);
          },
          goForward: function() {
            O(1);
          },
          block: function(t) {
            void 0 === t && !1;
            var e = m.setPrompt(t);
            return (
              R || (P(1), !0),
              function() {
                return R && (!1, P(-1)), e();
              }
            );
          },
          listen: function(t) {
            var e = m.appendListener(t);
            return (
              P(1),
              function() {
                P(-1), e();
              }
            );
          }
        };
        return _;
      }
      var Q = "hashchange",
        X = {
          hashbang: {
            encodePath: function(t) {
              return "!" === t.charAt(0) ? t : "!/" + D(t);
            },
            decodePath: function(t) {
              return "!" === t.charAt(0) ? t.substr(1) : t;
            }
          },
          noslash: { encodePath: D, decodePath: U },
          slash: { encodePath: U, decodePath: U }
        };
      function Z() {
        var t = window.location.href,
          e = t.indexOf("#");
        return -1 === e ? "" : t.substring(e + 1);
      }
      function tt(t) {
        var e = window.location.href.indexOf("#");
        window.location.replace(
          window.location.href.slice(0, e >= 0 ? e : 0) + "#" + t
        );
      }
      function et(t) {
        void 0 === t && (t = {}), q || L(!1);
        var e = window.history,
          n = (window.navigator.userAgent.indexOf("Firefox"), t),
          r = n.getUserConfirmation,
          o = void 0 === r ? V : r,
          i = n.hashType,
          a = void 0 === i ? "slash" : i,
          c = t.basename ? F(U(t.basename)) : "",
          u = X[a],
          s = u.encodePath,
          l = u.decodePath;
        function f() {
          var t = l(Z());
          return c && (t = I(t, c)), G(t);
        }
        var p = W();
        function d(t) {
          j(S, t),
            (S.length = e.length),
            p.notifyListeners(S.location, S.action);
        }
        var h = !1,
          m = null;
        function v() {
          var t = Z(),
            e = s(t);
          if (t !== e) tt(e);
          else {
            var n = f(),
              r = S.location;
            if (!h && H(r, n)) return;
            if (m === B(n)) return;
            (m = null),
              (function(t) {
                if (h) (h = !1), d();
                else {
                  p.confirmTransitionTo(t, "POP", o, function(e) {
                    e
                      ? d({ action: "POP", location: t })
                      : (function(t) {
                          var e = S.location,
                            n = w.lastIndexOf(B(e));
                          -1 === n && (n = 0);
                          var r = w.lastIndexOf(B(t));
                          -1 === r && (r = 0);
                          var o = n - r;
                          o && ((h = !0), x(o));
                        })(t);
                  });
                }
              })(n);
          }
        }
        var y = Z(),
          g = s(y);
        y !== g && tt(g);
        var b = f(),
          w = [B(b)];
        function x(t) {
          e.go(t);
        }
        var E = 0;
        function C(t) {
          1 === (E += t) && 1 === t
            ? window.addEventListener(Q, v)
            : 0 === E && window.removeEventListener(Q, v);
        }
        var O = !1;
        var S = {
          length: e.length,
          action: "POP",
          location: b,
          createHref: function(t) {
            return "#" + s(c + B(t));
          },
          push: function(t, e) {
            var n = G(t, void 0, void 0, S.location);
            p.confirmTransitionTo(n, "PUSH", o, function(t) {
              if (t) {
                var e = B(n),
                  r = s(c + e);
                if (Z() !== r) {
                  (m = e),
                    (function(t) {
                      window.location.hash = t;
                    })(r);
                  var o = w.lastIndexOf(B(S.location)),
                    i = w.slice(0, -1 === o ? 0 : o + 1);
                  i.push(e), (w = i), d({ action: "PUSH", location: n });
                } else d();
              }
            });
          },
          replace: function(t, e) {
            var n = G(t, void 0, void 0, S.location);
            p.confirmTransitionTo(n, "REPLACE", o, function(t) {
              if (t) {
                var e = B(n),
                  r = s(c + e);
                Z() !== r && ((m = e), tt(r));
                var o = w.indexOf(B(S.location));
                -1 !== o && (w[o] = e), d({ action: "REPLACE", location: n });
              }
            });
          },
          go: x,
          goBack: function() {
            x(-1);
          },
          goForward: function() {
            x(1);
          },
          block: function(t) {
            void 0 === t && (t = !1);
            var e = p.setPrompt(t);
            return (
              O || (C(1), (O = !0)),
              function() {
                return O && ((O = !1), C(-1)), e();
              }
            );
          },
          listen: function(t) {
            var e = p.appendListener(t);
            return (
              C(1),
              function() {
                C(-1), e();
              }
            );
          }
        };
        return S;
      }
      function nt(t, e, n) {
        return Math.min(Math.max(t, e), n);
      }
      var rt = n(4),
        ot = n.n(rt);
      n(5);
      function it(t, e) {
        if (null == t) return {};
        var n,
          r,
          o = {},
          i = Object.keys(t);
        for (r = 0; r < i.length; r++)
          (n = i[r]), e.indexOf(n) >= 0 || (o[n] = t[n]);
        return o;
      }
      n(14);
      var at = (function(t) {
          var e = R();
          return (e.displayName = t), e;
        })("Router"),
        ct = (function(t) {
          function e(e) {
            var n;
            return (
              ((n = t.call(this, e) || this).state = {
                location: e.history.location
              }),
              (n._isMounted = !1),
              (n._pendingLocation = null),
              e.staticContext ||
                (n.unlisten = e.history.listen(function(t) {
                  n._isMounted
                    ? n.setState({ location: t })
                    : (n._pendingLocation = t);
                })),
              n
            );
          }
          b(e, t),
            (e.computeRootMatch = function(t) {
              return { path: "/", url: "/", params: {}, isExact: "/" === t };
            });
          var n = e.prototype;
          return (
            (n.componentDidMount = function() {
              (this._isMounted = !0),
                this._pendingLocation &&
                  this.setState({ location: this._pendingLocation });
            }),
            (n.componentWillUnmount = function() {
              this.unlisten && this.unlisten();
            }),
            (n.render = function() {
              return o.a.createElement(at.Provider, {
                children: this.props.children || null,
                value: {
                  history: this.props.history,
                  location: this.state.location,
                  match: e.computeRootMatch(this.state.location.pathname),
                  staticContext: this.props.staticContext
                }
              });
            }),
            e
          );
        })(o.a.Component);
      o.a.Component;
      o.a.Component;
      var ut = {},
        st = 1e4,
        lt = 0;
      function ft(t, e) {
        void 0 === e && (e = {}), "string" == typeof e && (e = { path: e });
        var n = e,
          r = n.path,
          o = n.exact,
          i = void 0 !== o && o,
          a = n.strict,
          c = void 0 !== a && a,
          u = n.sensitive,
          s = void 0 !== u && u;
        return [].concat(r).reduce(function(e, n) {
          if (!n) return null;
          if (e) return e;
          var r = (function(t, e) {
              var n = "" + e.end + e.strict + e.sensitive,
                r = ut[n] || (ut[n] = {});
              if (r[t]) return r[t];
              var o = [],
                i = { regexp: ot()(t, o, e), keys: o };
              return lt < st && ((r[t] = i), lt++), i;
            })(n, { end: i, strict: c, sensitive: s }),
            o = r.regexp,
            a = r.keys,
            u = o.exec(t);
          if (!u) return null;
          var l = u[0],
            f = u.slice(1),
            p = t === l;
          return i && !p
            ? null
            : {
                path: n,
                url: "/" === n && "" === l ? "/" : l,
                isExact: p,
                params: a.reduce(function(t, e, n) {
                  return (t[e.name] = f[n]), t;
                }, {})
              };
        }, null);
      }
      var pt = (function(t) {
        function e() {
          return t.apply(this, arguments) || this;
        }
        return (
          b(e, t),
          (e.prototype.render = function() {
            var t = this;
            return o.a.createElement(at.Consumer, null, function(e) {
              e || L(!1);
              var n = t.props.location || e.location,
                r = j({}, e, {
                  location: n,
                  match: t.props.computedMatch
                    ? t.props.computedMatch
                    : t.props.path
                    ? ft(n.pathname, t.props)
                    : e.match
                }),
                i = t.props,
                a = i.children,
                c = i.component,
                u = i.render;
              (Array.isArray(a) && 0 === a.length && (a = null),
              "function" == typeof a) &&
                (void 0 === (a = a(r)) && (a = null));
              return o.a.createElement(
                at.Provider,
                { value: r },
                a &&
                  !(function(t) {
                    return 0 === o.a.Children.count(t);
                  })(a)
                  ? a
                  : r.match
                  ? c
                    ? o.a.createElement(c, r)
                    : u
                    ? u(r)
                    : null
                  : null
              );
            });
          }),
          e
        );
      })(o.a.Component);
      function dt(t) {
        return "/" === t.charAt(0) ? t : "/" + t;
      }
      function ht(t, e) {
        if (!t) return e;
        var n = dt(t);
        return 0 !== e.pathname.indexOf(n)
          ? e
          : j({}, e, { pathname: e.pathname.substr(n.length) });
      }
      function mt(t) {
        return "string" == typeof t ? t : B(t);
      }
      function vt(t) {
        return function() {
          L(!1);
        };
      }
      function yt() {}
      o.a.Component;
      o.a.Component;
      o.a.Component;
      var gt = (function(t) {
        function e() {
          for (var e, n = arguments.length, r = new Array(n), o = 0; o < n; o++)
            r[o] = arguments[o];
          return (
            ((e = t.call.apply(t, [this].concat(r)) || this).history = et(
              e.props
            )),
            e
          );
        }
        return (
          b(e, t),
          (e.prototype.render = function() {
            return o.a.createElement(ct, {
              history: this.history,
              children: this.props.children
            });
          }),
          e
        );
      })(o.a.Component);
      var bt = (function(t) {
        function e() {
          return t.apply(this, arguments) || this;
        }
        b(e, t);
        var n = e.prototype;
        return (
          (n.handleClick = function(t, e) {
            try {
              this.props.onClick && this.props.onClick(t);
            } catch (e) {
              throw (t.preventDefault(), e);
            }
            t.defaultPrevented ||
              0 !== t.button ||
              (this.props.target && "_self" !== this.props.target) ||
              (function(t) {
                return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
              })(t) ||
              (t.preventDefault(),
              (this.props.replace ? e.replace : e.push)(this.props.to));
          }),
          (n.render = function() {
            var t = this,
              e = this.props,
              n = e.innerRef,
              r = (e.replace, e.to),
              i = it(e, ["innerRef", "replace", "to"]);
            return o.a.createElement(at.Consumer, null, function(e) {
              e || L(!1);
              var a = "string" == typeof r ? G(r, null, null, e.location) : r,
                c = a ? e.history.createHref(a) : "";
              return o.a.createElement(
                "a",
                j({}, i, {
                  onClick: function(n) {
                    return t.handleClick(n, e.history);
                  },
                  href: c,
                  ref: n
                })
              );
            });
          }),
          e
        );
      })(o.a.Component);
      function wt(t) {
        var e = t["aria-current"],
          n = void 0 === e ? "page" : e,
          r = t.activeClassName,
          i = void 0 === r ? "active" : r,
          a = t.activeStyle,
          c = t.className,
          u = t.exact,
          s = t.isActive,
          l = t.location,
          f = t.strict,
          p = t.style,
          d = t.to,
          h = it(t, [
            "aria-current",
            "activeClassName",
            "activeStyle",
            "className",
            "exact",
            "isActive",
            "location",
            "strict",
            "style",
            "to"
          ]),
          m = "object" == typeof d ? d.pathname : d,
          v = m && m.replace(/([.+*?=^!:${}()[\]|\/\\])/g, "\\$1");
        return o.a.createElement(at.Consumer, null, function(t) {
          t || L(!1);
          var e = l ? l.pathname : t.location.pathname,
            r = v ? ft(e, { path: v, exact: u, strict: f }) : null,
            m = !!(s ? s(r, t.location) : r),
            y = m
              ? (function() {
                  for (
                    var t = arguments.length, e = new Array(t), n = 0;
                    n < t;
                    n++
                  )
                    e[n] = arguments[n];
                  return e
                    .filter(function(t) {
                      return t;
                    })
                    .join(" ");
                })(c, i)
              : c,
            g = m ? j({}, p, a) : p;
          return o.a.createElement(
            bt,
            j(
              {
                "aria-current": (m && n) || null,
                className: y,
                style: g,
                to: d
              },
              h
            )
          );
        });
      }
      n(18);
      var xt = (function(t) {
        function e() {
          return l()(this, e), h()(this, v()(e).apply(this, arguments));
        }
        return (
          g()(e, t),
          p()(e, [
            {
              key: "componentDidCatch",
              value: function(t, e) {
                console.error(t, e);
              }
            },
            {
              key: "render",
              value: function() {
                return o.a.createElement(
                  gt,
                  null,
                  o.a.createElement(
                    "div",
                    { className: "nav-top" },
                    o.a.createElement("div", { className: "logo" }),
                    o.a.createElement(
                      "ul",
                      null,
                      o.a.createElement(
                        pt,
                        null,
                        o.a.createElement(
                          "li",
                          null,
                          o.a.createElement(
                            wt,
                            { to: "/globe/", activeClassName: "active" },
                            "Globe"
                          )
                        ),
                        o.a.createElement(
                          "li",
                          null,
                          o.a.createElement(wt, { to: "/stats/" }, "Stats")
                        )
                      )
                    )
                  )
                );
              }
            }
          ]),
          e
        );
      })(r.Component);
      n.d(e, "bootstrap", function() {
        return Ct;
      }),
        n.d(e, "mount", function() {
          return Ot;
        }),
        n.d(e, "unmount", function() {
          return St;
        });
      var Et = u()({
          React: o.a,
          ReactDOM: a.a,
          rootComponent: xt,
          domElementGetter: function() {
            var t = document.getElementById("navbar");
            t ||
              (((t = document.createElement("div")).id = "navbar"),
              document.body.appendChild(t));
            return t;
          }
        }),
        Ct = [Et.bootstrap],
        Ot = [Et.mount],
        St = [Et.unmount];
    }
  ]);
});
//# sourceMappingURL=navbar.js.map
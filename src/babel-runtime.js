//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

/* Package-scope variables */
var babelHelpers;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/babel-runtime/babel-runtime.js                                                                 //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
var hasOwn = Object.prototype.hasOwnProperty;                                                              // 1
                                                                                                           // 2
function canDefineNonEnumerableProperties() {                                                              // 3
  var testObj = {};                                                                                        // 4
  var testPropName = "t";                                                                                  // 5
                                                                                                           // 6
  try {                                                                                                    // 7
    Object.defineProperty(testObj, testPropName, {                                                         // 8
      enumerable: false,                                                                                   // 9
      value: testObj                                                                                       // 10
    });                                                                                                    // 11
                                                                                                           // 12
    for (var k in testObj) {                                                                               // 13
      if (k === testPropName) {                                                                            // 14
        return false;                                                                                      // 15
      }                                                                                                    // 16
    }                                                                                                      // 17
  } catch (e) {                                                                                            // 18
    return false;                                                                                          // 19
  }                                                                                                        // 20
                                                                                                           // 21
  return testObj[testPropName] === testObj;                                                                // 22
}                                                                                                          // 23
                                                                                                           // 24
// The name `babelHelpers` is hard-coded in Babel.  Otherwise we would make it                             // 25
// something capitalized and more descriptive, like `BabelRuntime`.                                        // 26
babelHelpers = {                                                                                           // 27
  // Meteor-specific runtime helper for wrapping the object of for-in                                      // 28
  // loops, so that inherited Array methods defined by es5-shim can be                                     // 29
  // ignored in browsers where they cannot be defined as non-enumerable.                                   // 30
  sanitizeForInObject: canDefineNonEnumerableProperties()                                                  // 31
    ? function (value) { return value; }                                                                   // 32
    : function (obj) {                                                                                     // 33
      if (Array.isArray(obj)) {                                                                            // 34
        var newObj = {};                                                                                   // 35
        var keys = Object.keys(obj);                                                                       // 36
        var keyCount = keys.length;                                                                        // 37
        for (var i = 0; i < keyCount; ++i) {                                                               // 38
          var key = keys[i];                                                                               // 39
          newObj[key] = obj[key];                                                                          // 40
        }                                                                                                  // 41
        return newObj;                                                                                     // 42
      }                                                                                                    // 43
                                                                                                           // 44
      return obj;                                                                                          // 45
    },                                                                                                     // 46
                                                                                                           // 47
  // es6.templateLiterals                                                                                  // 48
  // Constructs the object passed to the tag function in a tagged                                          // 49
  // template literal.                                                                                     // 50
  taggedTemplateLiteralLoose: function (strings, raw) {                                                    // 51
    // Babel's own version of this calls Object.freeze on `strings` and                                    // 52
    // `strings.raw`, but it doesn't seem worth the compatibility and                                      // 53
    // performance concerns.  If you're writing code against this helper,                                  // 54
    // don't add properties to these objects.                                                              // 55
    strings.raw = raw;                                                                                     // 56
    return strings;                                                                                        // 57
  },                                                                                                       // 58
                                                                                                           // 59
  // es6.classes                                                                                           // 60
  // Checks that a class constructor is being called with `new`, and throws                                // 61
  // an error if it is not.                                                                                // 62
  classCallCheck: function (instance, Constructor) {                                                       // 63
    if (!(instance instanceof Constructor)) {                                                              // 64
      throw new TypeError("Cannot call a class as a function");                                            // 65
    }                                                                                                      // 66
  },                                                                                                       // 67
                                                                                                           // 68
  // es6.classes                                                                                           // 69
  inherits: function (subClass, superClass) {                                                              // 70
    if (typeof superClass !== "function" && superClass !== null) {                                         // 71
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }                                                                                                      // 73
                                                                                                           // 74
    if (superClass) {                                                                                      // 75
      if (Object.create) {                                                                                 // 76
        // All but IE 8                                                                                    // 77
        subClass.prototype = Object.create(superClass.prototype, {                                         // 78
          constructor: {                                                                                   // 79
            value: subClass,                                                                               // 80
            enumerable: false,                                                                             // 81
            writable: true,                                                                                // 82
            configurable: true                                                                             // 83
          }                                                                                                // 84
        });                                                                                                // 85
      } else {                                                                                             // 86
        // IE 8 path.  Slightly worse for modern browsers, because `constructor`                           // 87
        // is enumerable and shows up in the inspector unnecessarily.                                      // 88
        // It's not an "own" property of any instance though.                                              // 89
        //                                                                                                 // 90
        // For correctness when writing code,                                                              // 91
        // don't enumerate all the own-and-inherited properties of an instance                             // 92
        // of a class and expect not to find `constructor` (but who does that?).                           // 93
        var F = function () {                                                                              // 94
          this.constructor = subClass;                                                                     // 95
        };                                                                                                 // 96
        F.prototype = superClass.prototype;                                                                // 97
        subClass.prototype = new F();                                                                      // 98
      }                                                                                                    // 99
                                                                                                           // 100
      // For modern browsers, this would be `subClass.__proto__ = superClass`,                             // 101
      // but IE <=10 don't support `__proto__`, and in this case the difference                            // 102
      // would be detectable; code that works in modern browsers could easily                              // 103
      // fail on IE 8 if we ever used the `__proto__` trick.                                               // 104
      //                                                                                                   // 105
      // There's no perfect way to make static methods inherited if they are                               // 106
      // assigned after declaration of the classes.  The best we can do is                                 // 107
      // to copy them.  In other words, when you write `class Foo                                          // 108
      // extends Bar`, we copy the static methods from Bar onto Foo, but future                            // 109
      // ones are not copied.                                                                              // 110
      //                                                                                                   // 111
      // For correctness when writing code, don't add static methods to a class                            // 112
      // after you subclass it.                                                                            // 113
      for (var k in superClass) {                                                                          // 114
        if (hasOwn.call(superClass, k)) {                                                                  // 115
          subClass[k] = superClass[k];                                                                     // 116
        }                                                                                                  // 117
      }                                                                                                    // 118
    }                                                                                                      // 119
  },                                                                                                       // 120
                                                                                                           // 121
  createClass: (function () {                                                                              // 122
    var hasDefineProperty = false;                                                                         // 123
    try {                                                                                                  // 124
      // IE 8 has a broken Object.defineProperty, so feature-test by                                       // 125
      // trying to call it.                                                                                // 126
      Object.defineProperty({}, 'x', {});                                                                  // 127
      hasDefineProperty = true;                                                                            // 128
    } catch (e) {}                                                                                         // 129
                                                                                                           // 130
    function defineProperties(target, props) {                                                             // 131
      for (var i = 0; i < props.length; i++) {                                                             // 132
        var descriptor = props[i];                                                                         // 133
        descriptor.enumerable = descriptor.enumerable || false;                                            // 134
        descriptor.configurable = true;                                                                    // 135
        if ("value" in descriptor) descriptor.writable = true;                                             // 136
        Object.defineProperty(target, descriptor.key, descriptor);                                         // 137
      }                                                                                                    // 138
    }                                                                                                      // 139
                                                                                                           // 140
    return function (Constructor, protoProps, staticProps) {                                               // 141
      if (! hasDefineProperty) {                                                                           // 142
        // e.g. `class Foo { get bar() {} }`.  If you try to use getters and                               // 143
        // setters in IE 8, you will get a big nasty error, with or without                                // 144
        // Babel.  I don't know of any other syntax features besides getters                               // 145
        // and setters that will trigger this error.                                                       // 146
        throw new Error(                                                                                   // 147
          "Your browser does not support this type of class property.  " +                                 // 148
            "For example, Internet Explorer 8 does not support getters and " +                             // 149
            "setters.");                                                                                   // 150
      }                                                                                                    // 151
                                                                                                           // 152
      if (protoProps) defineProperties(Constructor.prototype, protoProps);                                 // 153
      if (staticProps) defineProperties(Constructor, staticProps);                                         // 154
      return Constructor;                                                                                  // 155
    };                                                                                                     // 156
  })(),                                                                                                    // 157
                                                                                                           // 158
  // es7.objectRestSpread and react (JSX)                                                                  // 159
  _extends: Object.assign || (function (target) {                                                          // 160
    for (var i = 1; i < arguments.length; i++) {                                                           // 161
      var source = arguments[i];                                                                           // 162
      for (var key in source) {                                                                            // 163
        if (hasOwn.call(source, key)) {                                                                    // 164
          target[key] = source[key];                                                                       // 165
        }                                                                                                  // 166
      }                                                                                                    // 167
    }                                                                                                      // 168
    return target;                                                                                         // 169
  }),                                                                                                      // 170
                                                                                                           // 171
  // es6.destructuring                                                                                     // 172
  objectWithoutProperties: function (obj, keys) {                                                          // 173
    var target = {};                                                                                       // 174
    outer: for (var i in obj) {                                                                            // 175
      if (! hasOwn.call(obj, i)) continue;                                                                 // 176
      for (var j = 0; j < keys.length; j++) {                                                              // 177
        if (keys[j] === i) continue outer;                                                                 // 178
      }                                                                                                    // 179
      target[i] = obj[i];                                                                                  // 180
    }                                                                                                      // 181
    return target;                                                                                         // 182
  },                                                                                                       // 183
                                                                                                           // 184
  // es6.destructuring                                                                                     // 185
  objectDestructuringEmpty: function (obj) {                                                               // 186
    if (obj == null) throw new TypeError("Cannot destructure undefined");                                  // 187
  },                                                                                                       // 188
                                                                                                           // 189
  // es6.spread                                                                                            // 190
  bind: Function.prototype.bind || (function () {                                                          // 191
    var isCallable = function (value) { return typeof value === 'function'; };                             // 192
    var $Object = Object;                                                                                  // 193
    var to_string = Object.prototype.toString;                                                             // 194
    var array_slice = Array.prototype.slice;                                                               // 195
    var array_concat = Array.prototype.concat;                                                             // 196
    var array_push = Array.prototype.push;                                                                 // 197
    var max = Math.max;                                                                                    // 198
    var Empty = function Empty() {};                                                                       // 199
                                                                                                           // 200
    // Copied from es5-shim.js (3ac7942).  See original for more comments.                                 // 201
    return function bind(that) {                                                                           // 202
      var target = this;                                                                                   // 203
      if (!isCallable(target)) {                                                                           // 204
        throw new TypeError('Function.prototype.bind called on incompatible ' + target);                   // 205
      }                                                                                                    // 206
                                                                                                           // 207
      var args = array_slice.call(arguments, 1);                                                           // 208
                                                                                                           // 209
      var bound;                                                                                           // 210
      var binder = function () {                                                                           // 211
                                                                                                           // 212
        if (this instanceof bound) {                                                                       // 213
          var result = target.apply(                                                                       // 214
            this,                                                                                          // 215
            array_concat.call(args, array_slice.call(arguments))                                           // 216
          );                                                                                               // 217
          if ($Object(result) === result) {                                                                // 218
            return result;                                                                                 // 219
          }                                                                                                // 220
          return this;                                                                                     // 221
        } else {                                                                                           // 222
          return target.apply(                                                                             // 223
            that,                                                                                          // 224
            array_concat.call(args, array_slice.call(arguments))                                           // 225
          );                                                                                               // 226
        }                                                                                                  // 227
      };                                                                                                   // 228
                                                                                                           // 229
      var boundLength = max(0, target.length - args.length);                                               // 230
                                                                                                           // 231
      var boundArgs = [];                                                                                  // 232
      for (var i = 0; i < boundLength; i++) {                                                              // 233
        array_push.call(boundArgs, '$' + i);                                                               // 234
      }                                                                                                    // 235
                                                                                                           // 236
      // Create a Function from source code so that it has the right `.length`.                            // 237
      // Probably not important for Babel.  This code violates CSPs that ban                               // 238
      // `eval`, but the browsers that need this polyfill don't have CSP!                                  // 239
      bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);
                                                                                                           // 241
      if (target.prototype) {                                                                              // 242
        Empty.prototype = target.prototype;                                                                // 243
        bound.prototype = new Empty();                                                                     // 244
        Empty.prototype = null;                                                                            // 245
      }                                                                                                    // 246
                                                                                                           // 247
      return bound;                                                                                        // 248
    };                                                                                                     // 249
                                                                                                           // 250
  })(),                                                                                                    // 251
                                                                                                           // 252
  slice: Array.prototype.slice                                                                             // 253
};                                                                                                         // 254
                                                                                                           // 255
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['babel-runtime'] = {
  babelHelpers: babelHelpers
};

})();

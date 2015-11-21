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
var Promise;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/promise/.npm/package/node_modules/meteor-promise/promise.bundle.js                                       //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
/******/ (function(modules) { // webpackBootstrap                                                                    // 1
/******/ 	// The module cache                                                                                        // 2
/******/ 	var installedModules = {};                                                                                 // 3
                                                                                                                     // 4
/******/ 	// The require function                                                                                    // 5
/******/ 	function __webpack_require__(moduleId) {                                                                   // 6
                                                                                                                     // 7
/******/ 		// Check if module is in cache                                                                            // 8
/******/ 		if(installedModules[moduleId])                                                                            // 9
/******/ 			return installedModules[moduleId].exports;                                                               // 10
                                                                                                                     // 11
/******/ 		// Create a new module (and put it into the cache)                                                        // 12
/******/ 		var module = installedModules[moduleId] = {                                                               // 13
/******/ 			exports: {},                                                                                             // 14
/******/ 			id: moduleId,                                                                                            // 15
/******/ 			loaded: false                                                                                            // 16
/******/ 		};                                                                                                        // 17
                                                                                                                     // 18
/******/ 		// Execute the module function                                                                            // 19
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);                      // 20
                                                                                                                     // 21
/******/ 		// Flag the module as loaded                                                                              // 22
/******/ 		module.loaded = true;                                                                                     // 23
                                                                                                                     // 24
/******/ 		// Return the exports of the module                                                                       // 25
/******/ 		return module.exports;                                                                                    // 26
/******/ 	}                                                                                                          // 27
                                                                                                                     // 28
                                                                                                                     // 29
/******/ 	// expose the modules object (__webpack_modules__)                                                         // 30
/******/ 	__webpack_require__.m = modules;                                                                           // 31
                                                                                                                     // 32
/******/ 	// expose the module cache                                                                                 // 33
/******/ 	__webpack_require__.c = installedModules;                                                                  // 34
                                                                                                                     // 35
/******/ 	// __webpack_public_path__                                                                                 // 36
/******/ 	__webpack_require__.p = "";                                                                                // 37
                                                                                                                     // 38
/******/ 	// Load entry module and return exports                                                                    // 39
/******/ 	return __webpack_require__(0);                                                                             // 40
/******/ })                                                                                                          // 41
/************************************************************************/                                           // 42
/******/ ([                                                                                                          // 43
/* 0 */                                                                                                              // 44
/***/ function(module, exports, __webpack_require__) {                                                               // 45
                                                                                                                     // 46
	var MeteorPromise = __webpack_require__(1);                                                                         // 47
                                                                                                                     // 48
	var es6PromiseThen = MeteorPromise.prototype.then;                                                                  // 49
	MeteorPromise.prototype.then = function (onResolved, onRejected) {                                                  // 50
	  if (typeof Meteor === "object" &&                                                                                 // 51
	      typeof Meteor.bindEnvironment === "function") {                                                               // 52
	    return es6PromiseThen.call(                                                                                     // 53
	      this,                                                                                                         // 54
	      onResolved && Meteor.bindEnvironment(onResolved, raise),                                                      // 55
	      onRejected && Meteor.bindEnvironment(onRejected, raise)                                                       // 56
	    );                                                                                                              // 57
	  }                                                                                                                 // 58
	  return es6PromiseThen.call(this, onResolved, onRejected);                                                         // 59
	};                                                                                                                  // 60
                                                                                                                     // 61
	function raise(exception) {                                                                                         // 62
	  throw exception;                                                                                                  // 63
	}                                                                                                                   // 64
                                                                                                                     // 65
	Promise = MeteorPromise;                                                                                            // 66
                                                                                                                     // 67
                                                                                                                     // 68
/***/ },                                                                                                             // 69
/* 1 */                                                                                                              // 70
/***/ function(module, exports, __webpack_require__) {                                                               // 71
                                                                                                                     // 72
	/* WEBPACK VAR INJECTION */(function(global) {var hasOwn = Object.prototype.hasOwnProperty;                         // 73
                                                                                                                     // 74
	var g =                                                                                                             // 75
	  typeof global === "object" ? global :                                                                             // 76
	  typeof window === "object" ? window :                                                                             // 77
	  typeof self === "object" ? self : this;                                                                           // 78
                                                                                                                     // 79
	var GlobalPromise = g.Promise;                                                                                      // 80
	var NpmPromise = __webpack_require__(2);                                                                            // 81
                                                                                                                     // 82
	function copyMethods(target, source) {                                                                              // 83
	  Object.keys(source).forEach(function (key) {                                                                      // 84
	    var value = source[key];                                                                                        // 85
	    if (typeof value === "function" &&                                                                              // 86
	        ! hasOwn.call(target, key)) {                                                                               // 87
	      target[key] = value;                                                                                          // 88
	    }                                                                                                               // 89
	  });                                                                                                               // 90
	}                                                                                                                   // 91
                                                                                                                     // 92
	if (typeof GlobalPromise === "function") {                                                                          // 93
	  copyMethods(GlobalPromise, NpmPromise);                                                                           // 94
	  copyMethods(GlobalPromise.prototype, NpmPromise.prototype);                                                       // 95
	  module.exports = GlobalPromise;                                                                                   // 96
	} else {                                                                                                            // 97
	  module.exports = NpmPromise;                                                                                      // 98
	}                                                                                                                   // 99
                                                                                                                     // 100
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))                                        // 101
                                                                                                                     // 102
/***/ },                                                                                                             // 103
/* 2 */                                                                                                              // 104
/***/ function(module, exports, __webpack_require__) {                                                               // 105
                                                                                                                     // 106
	'use strict';                                                                                                       // 107
                                                                                                                     // 108
	module.exports = __webpack_require__(3)                                                                             // 109
                                                                                                                     // 110
                                                                                                                     // 111
/***/ },                                                                                                             // 112
/* 3 */                                                                                                              // 113
/***/ function(module, exports, __webpack_require__) {                                                               // 114
                                                                                                                     // 115
	'use strict';                                                                                                       // 116
                                                                                                                     // 117
	module.exports = __webpack_require__(4);                                                                            // 118
	__webpack_require__(6);                                                                                             // 119
	__webpack_require__(7);                                                                                             // 120
	__webpack_require__(8);                                                                                             // 121
	__webpack_require__(9);                                                                                             // 122
                                                                                                                     // 123
                                                                                                                     // 124
/***/ },                                                                                                             // 125
/* 4 */                                                                                                              // 126
/***/ function(module, exports, __webpack_require__) {                                                               // 127
                                                                                                                     // 128
	'use strict';                                                                                                       // 129
                                                                                                                     // 130
	var asap = __webpack_require__(5);                                                                                  // 131
                                                                                                                     // 132
	function noop() {}                                                                                                  // 133
                                                                                                                     // 134
	// States:                                                                                                          // 135
	//                                                                                                                  // 136
	// 0 - pending                                                                                                      // 137
	// 1 - fulfilled with _value                                                                                        // 138
	// 2 - rejected with _value                                                                                         // 139
	// 3 - adopted the state of another promise, _value                                                                 // 140
	//                                                                                                                  // 141
	// once the state is no longer pending (0) it is immutable                                                          // 142
                                                                                                                     // 143
	// All `_` prefixed properties will be reduced to `_{random number}`                                                // 144
	// at build time to obfuscate them and discourage their use.                                                        // 145
	// We don't use symbols or Object.defineProperty to fully hide them                                                 // 146
	// because the performance isn't good enough.                                                                       // 147
                                                                                                                     // 148
                                                                                                                     // 149
	// to avoid using try/catch inside critical functions, we                                                           // 150
	// extract them to here.                                                                                            // 151
	var LAST_ERROR = null;                                                                                              // 152
	var IS_ERROR = {};                                                                                                  // 153
	function getThen(obj) {                                                                                             // 154
	  try {                                                                                                             // 155
	    return obj.then;                                                                                                // 156
	  } catch (ex) {                                                                                                    // 157
	    LAST_ERROR = ex;                                                                                                // 158
	    return IS_ERROR;                                                                                                // 159
	  }                                                                                                                 // 160
	}                                                                                                                   // 161
                                                                                                                     // 162
	function tryCallOne(fn, a) {                                                                                        // 163
	  try {                                                                                                             // 164
	    return fn(a);                                                                                                   // 165
	  } catch (ex) {                                                                                                    // 166
	    LAST_ERROR = ex;                                                                                                // 167
	    return IS_ERROR;                                                                                                // 168
	  }                                                                                                                 // 169
	}                                                                                                                   // 170
	function tryCallTwo(fn, a, b) {                                                                                     // 171
	  try {                                                                                                             // 172
	    fn(a, b);                                                                                                       // 173
	  } catch (ex) {                                                                                                    // 174
	    LAST_ERROR = ex;                                                                                                // 175
	    return IS_ERROR;                                                                                                // 176
	  }                                                                                                                 // 177
	}                                                                                                                   // 178
                                                                                                                     // 179
	module.exports = Promise;                                                                                           // 180
                                                                                                                     // 181
	function Promise(fn) {                                                                                              // 182
	  if (typeof this !== 'object') {                                                                                   // 183
	    throw new TypeError('Promises must be constructed via new');                                                    // 184
	  }                                                                                                                 // 185
	  if (typeof fn !== 'function') {                                                                                   // 186
	    throw new TypeError('not a function');                                                                          // 187
	  }                                                                                                                 // 188
	  this._37 = 0;                                                                                                     // 189
	  this._12 = null;                                                                                                  // 190
	  this._59 = [];                                                                                                    // 191
	  if (fn === noop) return;                                                                                          // 192
	  doResolve(fn, this);                                                                                              // 193
	}                                                                                                                   // 194
	Promise._99 = noop;                                                                                                 // 195
                                                                                                                     // 196
	Promise.prototype.then = function(onFulfilled, onRejected) {                                                        // 197
	  if (this.constructor !== Promise) {                                                                               // 198
	    return safeThen(this, onFulfilled, onRejected);                                                                 // 199
	  }                                                                                                                 // 200
	  var res = new Promise(noop);                                                                                      // 201
	  handle(this, new Handler(onFulfilled, onRejected, res));                                                          // 202
	  return res;                                                                                                       // 203
	};                                                                                                                  // 204
                                                                                                                     // 205
	function safeThen(self, onFulfilled, onRejected) {                                                                  // 206
	  return new self.constructor(function (resolve, reject) {                                                          // 207
	    var res = new Promise(noop);                                                                                    // 208
	    res.then(resolve, reject);                                                                                      // 209
	    handle(self, new Handler(onFulfilled, onRejected, res));                                                        // 210
	  });                                                                                                               // 211
	};                                                                                                                  // 212
	function handle(self, deferred) {                                                                                   // 213
	  while (self._37 === 3) {                                                                                          // 214
	    self = self._12;                                                                                                // 215
	  }                                                                                                                 // 216
	  if (self._37 === 0) {                                                                                             // 217
	    self._59.push(deferred);                                                                                        // 218
	    return;                                                                                                         // 219
	  }                                                                                                                 // 220
	  asap(function() {                                                                                                 // 221
	    var cb = self._37 === 1 ? deferred.onFulfilled : deferred.onRejected;                                           // 222
	    if (cb === null) {                                                                                              // 223
	      if (self._37 === 1) {                                                                                         // 224
	        resolve(deferred.promise, self._12);                                                                        // 225
	      } else {                                                                                                      // 226
	        reject(deferred.promise, self._12);                                                                         // 227
	      }                                                                                                             // 228
	      return;                                                                                                       // 229
	    }                                                                                                               // 230
	    var ret = tryCallOne(cb, self._12);                                                                             // 231
	    if (ret === IS_ERROR) {                                                                                         // 232
	      reject(deferred.promise, LAST_ERROR);                                                                         // 233
	    } else {                                                                                                        // 234
	      resolve(deferred.promise, ret);                                                                               // 235
	    }                                                                                                               // 236
	  });                                                                                                               // 237
	}                                                                                                                   // 238
	function resolve(self, newValue) {                                                                                  // 239
	  // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
	  if (newValue === self) {                                                                                          // 241
	    return reject(                                                                                                  // 242
	      self,                                                                                                         // 243
	      new TypeError('A promise cannot be resolved with itself.')                                                    // 244
	    );                                                                                                              // 245
	  }                                                                                                                 // 246
	  if (                                                                                                              // 247
	    newValue &&                                                                                                     // 248
	    (typeof newValue === 'object' || typeof newValue === 'function')                                                // 249
	  ) {                                                                                                               // 250
	    var then = getThen(newValue);                                                                                   // 251
	    if (then === IS_ERROR) {                                                                                        // 252
	      return reject(self, LAST_ERROR);                                                                              // 253
	    }                                                                                                               // 254
	    if (                                                                                                            // 255
	      then === self.then &&                                                                                         // 256
	      newValue instanceof Promise                                                                                   // 257
	    ) {                                                                                                             // 258
	      self._37 = 3;                                                                                                 // 259
	      self._12 = newValue;                                                                                          // 260
	      finale(self);                                                                                                 // 261
	      return;                                                                                                       // 262
	    } else if (typeof then === 'function') {                                                                        // 263
	      doResolve(then.bind(newValue), self);                                                                         // 264
	      return;                                                                                                       // 265
	    }                                                                                                               // 266
	  }                                                                                                                 // 267
	  self._37 = 1;                                                                                                     // 268
	  self._12 = newValue;                                                                                              // 269
	  finale(self);                                                                                                     // 270
	}                                                                                                                   // 271
                                                                                                                     // 272
	function reject(self, newValue) {                                                                                   // 273
	  self._37 = 2;                                                                                                     // 274
	  self._12 = newValue;                                                                                              // 275
	  finale(self);                                                                                                     // 276
	}                                                                                                                   // 277
	function finale(self) {                                                                                             // 278
	  for (var i = 0; i < self._59.length; i++) {                                                                       // 279
	    handle(self, self._59[i]);                                                                                      // 280
	  }                                                                                                                 // 281
	  self._59 = null;                                                                                                  // 282
	}                                                                                                                   // 283
                                                                                                                     // 284
	function Handler(onFulfilled, onRejected, promise){                                                                 // 285
	  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;                                        // 286
	  this.onRejected = typeof onRejected === 'function' ? onRejected : null;                                           // 287
	  this.promise = promise;                                                                                           // 288
	}                                                                                                                   // 289
                                                                                                                     // 290
	/**                                                                                                                 // 291
	 * Take a potentially misbehaving resolver function and make sure                                                   // 292
	 * onFulfilled and onRejected are only called once.                                                                 // 293
	 *                                                                                                                  // 294
	 * Makes no guarantees about asynchrony.                                                                            // 295
	 */                                                                                                                 // 296
	function doResolve(fn, promise) {                                                                                   // 297
	  var done = false;                                                                                                 // 298
	  var res = tryCallTwo(fn, function (value) {                                                                       // 299
	    if (done) return;                                                                                               // 300
	    done = true;                                                                                                    // 301
	    resolve(promise, value);                                                                                        // 302
	  }, function (reason) {                                                                                            // 303
	    if (done) return;                                                                                               // 304
	    done = true;                                                                                                    // 305
	    reject(promise, reason);                                                                                        // 306
	  })                                                                                                                // 307
	  if (!done && res === IS_ERROR) {                                                                                  // 308
	    done = true;                                                                                                    // 309
	    reject(promise, LAST_ERROR);                                                                                    // 310
	  }                                                                                                                 // 311
	}                                                                                                                   // 312
                                                                                                                     // 313
                                                                                                                     // 314
/***/ },                                                                                                             // 315
/* 5 */                                                                                                              // 316
/***/ function(module, exports) {                                                                                    // 317
                                                                                                                     // 318
	/* WEBPACK VAR INJECTION */(function(global) {"use strict";                                                         // 319
                                                                                                                     // 320
	// Use the fastest means possible to execute a task in its own turn, with                                           // 321
	// priority over other events including IO, animation, reflow, and redraw                                           // 322
	// events in browsers.                                                                                              // 323
	//                                                                                                                  // 324
	// An exception thrown by a task will permanently interrupt the processing of                                       // 325
	// subsequent tasks. The higher level `asap` function ensures that if an                                            // 326
	// exception is thrown by a task, that the task queue will continue flushing as                                     // 327
	// soon as possible, but if you use `rawAsap` directly, you are responsible to                                      // 328
	// either ensure that no exceptions are thrown from your task, or to manually                                       // 329
	// call `rawAsap.requestFlush` if an exception is thrown.                                                           // 330
	module.exports = rawAsap;                                                                                           // 331
	function rawAsap(task) {                                                                                            // 332
	    if (!queue.length) {                                                                                            // 333
	        requestFlush();                                                                                             // 334
	        flushing = true;                                                                                            // 335
	    }                                                                                                               // 336
	    // Equivalent to push, but avoids a function call.                                                              // 337
	    queue[queue.length] = task;                                                                                     // 338
	}                                                                                                                   // 339
                                                                                                                     // 340
	var queue = [];                                                                                                     // 341
	// Once a flush has been requested, no further calls to `requestFlush` are                                          // 342
	// necessary until the next `flush` completes.                                                                      // 343
	var flushing = false;                                                                                               // 344
	// `requestFlush` is an implementation-specific method that attempts to kick                                        // 345
	// off a `flush` event as quickly as possible. `flush` will attempt to exhaust                                      // 346
	// the event queue before yielding to the browser's own event loop.                                                 // 347
	var requestFlush;                                                                                                   // 348
	// The position of the next task to execute in the task queue. This is                                              // 349
	// preserved between calls to `flush` so that it can be resumed if                                                  // 350
	// a task throws an exception.                                                                                      // 351
	var index = 0;                                                                                                      // 352
	// If a task schedules additional tasks recursively, the task queue can grow                                        // 353
	// unbounded. To prevent memory exhaustion, the task queue will periodically                                        // 354
	// truncate already-completed tasks.                                                                                // 355
	var capacity = 1024;                                                                                                // 356
                                                                                                                     // 357
	// The flush function processes all tasks that have been scheduled with                                             // 358
	// `rawAsap` unless and until one of those tasks throws an exception.                                               // 359
	// If a task throws an exception, `flush` ensures that its state will remain                                        // 360
	// consistent and will resume where it left off when called again.                                                  // 361
	// However, `flush` does not make any arrangements to be called again if an                                         // 362
	// exception is thrown.                                                                                             // 363
	function flush() {                                                                                                  // 364
	    while (index < queue.length) {                                                                                  // 365
	        var currentIndex = index;                                                                                   // 366
	        // Advance the index before calling the task. This ensures that we will                                     // 367
	        // begin flushing on the next task the task throws an error.                                                // 368
	        index = index + 1;                                                                                          // 369
	        queue[currentIndex].call();                                                                                 // 370
	        // Prevent leaking memory for long chains of recursive calls to `asap`.                                     // 371
	        // If we call `asap` within tasks scheduled by `asap`, the queue will                                       // 372
	        // grow, but to avoid an O(n) walk for every task we execute, we don't                                      // 373
	        // shift tasks off the queue after they have been executed.                                                 // 374
	        // Instead, we periodically shift 1024 tasks off the queue.                                                 // 375
	        if (index > capacity) {                                                                                     // 376
	            // Manually shift all values starting at the index back to the                                          // 377
	            // beginning of the queue.                                                                              // 378
	            for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {                        // 379
	                queue[scan] = queue[scan + index];                                                                  // 380
	            }                                                                                                       // 381
	            queue.length -= index;                                                                                  // 382
	            index = 0;                                                                                              // 383
	        }                                                                                                           // 384
	    }                                                                                                               // 385
	    queue.length = 0;                                                                                               // 386
	    index = 0;                                                                                                      // 387
	    flushing = false;                                                                                               // 388
	}                                                                                                                   // 389
                                                                                                                     // 390
	// `requestFlush` is implemented using a strategy based on data collected from                                      // 391
	// every available SauceLabs Selenium web driver worker at time of writing.                                         // 392
	// https://docs.google.com/spreadsheets/d/1mG-5UYGup5qxGdEMWkhP6BWCz053NUb2E1QoUTU16uA/edit#gid=783724593           // 393
                                                                                                                     // 394
	// Safari 6 and 6.1 for desktop, iPad, and iPhone are the only browsers that                                        // 395
	// have WebKitMutationObserver but not un-prefixed MutationObserver.                                                // 396
	// Must use `global` instead of `window` to work in both frames and web                                             // 397
	// workers. `global` is a provision of Browserify, Mr, Mrs, or Mop.                                                 // 398
	var BrowserMutationObserver = global.MutationObserver || global.WebKitMutationObserver;                             // 399
                                                                                                                     // 400
	// MutationObservers are desirable because they have high priority and work                                         // 401
	// reliably everywhere they are implemented.                                                                        // 402
	// They are implemented in all modern browsers.                                                                     // 403
	//                                                                                                                  // 404
	// - Android 4-4.3                                                                                                  // 405
	// - Chrome 26-34                                                                                                   // 406
	// - Firefox 14-29                                                                                                  // 407
	// - Internet Explorer 11                                                                                           // 408
	// - iPad Safari 6-7.1                                                                                              // 409
	// - iPhone Safari 7-7.1                                                                                            // 410
	// - Safari 6-7                                                                                                     // 411
	if (typeof BrowserMutationObserver === "function") {                                                                // 412
	    requestFlush = makeRequestCallFromMutationObserver(flush);                                                      // 413
                                                                                                                     // 414
	// MessageChannels are desirable because they give direct access to the HTML                                        // 415
	// task queue, are implemented in Internet Explorer 10, Safari 5.0-1, and Opera                                     // 416
	// 11-12, and in web workers in many engines.                                                                       // 417
	// Although message channels yield to any queued rendering and IO tasks, they                                       // 418
	// would be better than imposing the 4ms delay of timers.                                                           // 419
	// However, they do not work reliably in Internet Explorer or Safari.                                               // 420
                                                                                                                     // 421
	// Internet Explorer 10 is the only browser that has setImmediate but does                                          // 422
	// not have MutationObservers.                                                                                      // 423
	// Although setImmediate yields to the browser's renderer, it would be                                              // 424
	// preferrable to falling back to setTimeout since it does not have                                                 // 425
	// the minimum 4ms penalty.                                                                                         // 426
	// Unfortunately there appears to be a bug in Internet Explorer 10 Mobile (and                                      // 427
	// Desktop to a lesser extent) that renders both setImmediate and                                                   // 428
	// MessageChannel useless for the purposes of ASAP.                                                                 // 429
	// https://github.com/kriskowal/q/issues/396                                                                        // 430
                                                                                                                     // 431
	// Timers are implemented universally.                                                                              // 432
	// We fall back to timers in workers in most engines, and in foreground                                             // 433
	// contexts in the following browsers.                                                                              // 434
	// However, note that even this simple case requires nuances to operate in a                                        // 435
	// broad spectrum of browsers.                                                                                      // 436
	//                                                                                                                  // 437
	// - Firefox 3-13                                                                                                   // 438
	// - Internet Explorer 6-9                                                                                          // 439
	// - iPad Safari 4.3                                                                                                // 440
	// - Lynx 2.8.7                                                                                                     // 441
	} else {                                                                                                            // 442
	    requestFlush = makeRequestCallFromTimer(flush);                                                                 // 443
	}                                                                                                                   // 444
                                                                                                                     // 445
	// `requestFlush` requests that the high priority event queue be flushed as                                         // 446
	// soon as possible.                                                                                                // 447
	// This is useful to prevent an error thrown in a task from stalling the event                                      // 448
	// queue if the exception handled by Node.js’s                                                                      // 449
	// `process.on("uncaughtException")` or by a domain.                                                                // 450
	rawAsap.requestFlush = requestFlush;                                                                                // 451
                                                                                                                     // 452
	// To request a high priority event, we induce a mutation observer by toggling                                      // 453
	// the text of a text node between "1" and "-1".                                                                    // 454
	function makeRequestCallFromMutationObserver(callback) {                                                            // 455
	    var toggle = 1;                                                                                                 // 456
	    var observer = new BrowserMutationObserver(callback);                                                           // 457
	    var node = document.createTextNode("");                                                                         // 458
	    observer.observe(node, {characterData: true});                                                                  // 459
	    return function requestCall() {                                                                                 // 460
	        toggle = -toggle;                                                                                           // 461
	        node.data = toggle;                                                                                         // 462
	    };                                                                                                              // 463
	}                                                                                                                   // 464
                                                                                                                     // 465
	// The message channel technique was discovered by Malte Ubl and was the                                            // 466
	// original foundation for this library.                                                                            // 467
	// http://www.nonblocking.io/2011/06/windownexttick.html                                                            // 468
                                                                                                                     // 469
	// Safari 6.0.5 (at least) intermittently fails to create message ports on a                                        // 470
	// page's first load. Thankfully, this version of Safari supports                                                   // 471
	// MutationObservers, so we don't need to fall back in that case.                                                   // 472
                                                                                                                     // 473
	// function makeRequestCallFromMessageChannel(callback) {                                                           // 474
	//     var channel = new MessageChannel();                                                                          // 475
	//     channel.port1.onmessage = callback;                                                                          // 476
	//     return function requestCall() {                                                                              // 477
	//         channel.port2.postMessage(0);                                                                            // 478
	//     };                                                                                                           // 479
	// }                                                                                                                // 480
                                                                                                                     // 481
	// For reasons explained above, we are also unable to use `setImmediate`                                            // 482
	// under any circumstances.                                                                                         // 483
	// Even if we were, there is another bug in Internet Explorer 10.                                                   // 484
	// It is not sufficient to assign `setImmediate` to `requestFlush` because                                          // 485
	// `setImmediate` must be called *by name* and therefore must be wrapped in a                                       // 486
	// closure.                                                                                                         // 487
	// Never forget.                                                                                                    // 488
                                                                                                                     // 489
	// function makeRequestCallFromSetImmediate(callback) {                                                             // 490
	//     return function requestCall() {                                                                              // 491
	//         setImmediate(callback);                                                                                  // 492
	//     };                                                                                                           // 493
	// }                                                                                                                // 494
                                                                                                                     // 495
	// Safari 6.0 has a problem where timers will get lost while the user is                                            // 496
	// scrolling. This problem does not impact ASAP because Safari 6.0 supports                                         // 497
	// mutation observers, so that implementation is used instead.                                                      // 498
	// However, if we ever elect to use timers in Safari, the prevalent work-around                                     // 499
	// is to add a scroll event listener that calls for a flush.                                                        // 500
                                                                                                                     // 501
	// `setTimeout` does not call the passed callback if the delay is less than                                         // 502
	// approximately 7 in web workers in Firefox 8 through 18, and sometimes not                                        // 503
	// even then.                                                                                                       // 504
                                                                                                                     // 505
	function makeRequestCallFromTimer(callback) {                                                                       // 506
	    return function requestCall() {                                                                                 // 507
	        // We dispatch a timeout with a specified delay of 0 for engines that                                       // 508
	        // can reliably accommodate that request. This will usually be snapped                                      // 509
	        // to a 4 milisecond delay, but once we're flushing, there's no delay                                       // 510
	        // between events.                                                                                          // 511
	        var timeoutHandle = setTimeout(handleTimer, 0);                                                             // 512
	        // However, since this timer gets frequently dropped in Firefox                                             // 513
	        // workers, we enlist an interval handle that will try to fire                                              // 514
	        // an event 20 times per second until it succeeds.                                                          // 515
	        var intervalHandle = setInterval(handleTimer, 50);                                                          // 516
                                                                                                                     // 517
	        function handleTimer() {                                                                                    // 518
	            // Whichever timer succeeds will cancel both timers and                                                 // 519
	            // execute the callback.                                                                                // 520
	            clearTimeout(timeoutHandle);                                                                            // 521
	            clearInterval(intervalHandle);                                                                          // 522
	            callback();                                                                                             // 523
	        }                                                                                                           // 524
	    };                                                                                                              // 525
	}                                                                                                                   // 526
                                                                                                                     // 527
	// This is for `asap.js` only.                                                                                      // 528
	// Its name will be periodically randomized to break any code that depends on                                       // 529
	// its existence.                                                                                                   // 530
	rawAsap.makeRequestCallFromTimer = makeRequestCallFromTimer;                                                        // 531
                                                                                                                     // 532
	// ASAP was originally a nextTick shim included in Q. This was factored out                                         // 533
	// into this ASAP package. It was later adapted to RSVP which made further                                          // 534
	// amendments. These decisions, particularly to marginalize MessageChannel and                                      // 535
	// to capture the MutationObserver implementation in a closure, were integrated                                     // 536
	// back into ASAP proper.                                                                                           // 537
	// https://github.com/tildeio/rsvp.js/blob/cddf7232546a9cf858524b75cde6f9edf72620a7/lib/rsvp/asap.js                // 538
                                                                                                                     // 539
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))                                        // 540
                                                                                                                     // 541
/***/ },                                                                                                             // 542
/* 6 */                                                                                                              // 543
/***/ function(module, exports, __webpack_require__) {                                                               // 544
                                                                                                                     // 545
	'use strict';                                                                                                       // 546
                                                                                                                     // 547
	var Promise = __webpack_require__(4);                                                                               // 548
                                                                                                                     // 549
	module.exports = Promise;                                                                                           // 550
	Promise.prototype.done = function (onFulfilled, onRejected) {                                                       // 551
	  var self = arguments.length ? this.then.apply(this, arguments) : this;                                            // 552
	  self.then(null, function (err) {                                                                                  // 553
	    setTimeout(function () {                                                                                        // 554
	      throw err;                                                                                                    // 555
	    }, 0);                                                                                                          // 556
	  });                                                                                                               // 557
	};                                                                                                                  // 558
                                                                                                                     // 559
                                                                                                                     // 560
/***/ },                                                                                                             // 561
/* 7 */                                                                                                              // 562
/***/ function(module, exports, __webpack_require__) {                                                               // 563
                                                                                                                     // 564
	'use strict';                                                                                                       // 565
                                                                                                                     // 566
	var Promise = __webpack_require__(4);                                                                               // 567
                                                                                                                     // 568
	module.exports = Promise;                                                                                           // 569
	Promise.prototype['finally'] = function (f) {                                                                       // 570
	  return this.then(function (value) {                                                                               // 571
	    return Promise.resolve(f()).then(function () {                                                                  // 572
	      return value;                                                                                                 // 573
	    });                                                                                                             // 574
	  }, function (err) {                                                                                               // 575
	    return Promise.resolve(f()).then(function () {                                                                  // 576
	      throw err;                                                                                                    // 577
	    });                                                                                                             // 578
	  });                                                                                                               // 579
	};                                                                                                                  // 580
                                                                                                                     // 581
                                                                                                                     // 582
/***/ },                                                                                                             // 583
/* 8 */                                                                                                              // 584
/***/ function(module, exports, __webpack_require__) {                                                               // 585
                                                                                                                     // 586
	'use strict';                                                                                                       // 587
                                                                                                                     // 588
	//This file contains the ES6 extensions to the core Promises/A+ API                                                 // 589
                                                                                                                     // 590
	var Promise = __webpack_require__(4);                                                                               // 591
                                                                                                                     // 592
	module.exports = Promise;                                                                                           // 593
                                                                                                                     // 594
	/* Static Functions */                                                                                              // 595
                                                                                                                     // 596
	var TRUE = valuePromise(true);                                                                                      // 597
	var FALSE = valuePromise(false);                                                                                    // 598
	var NULL = valuePromise(null);                                                                                      // 599
	var UNDEFINED = valuePromise(undefined);                                                                            // 600
	var ZERO = valuePromise(0);                                                                                         // 601
	var EMPTYSTRING = valuePromise('');                                                                                 // 602
                                                                                                                     // 603
	function valuePromise(value) {                                                                                      // 604
	  var p = new Promise(Promise._99);                                                                                 // 605
	  p._37 = 1;                                                                                                        // 606
	  p._12 = value;                                                                                                    // 607
	  return p;                                                                                                         // 608
	}                                                                                                                   // 609
	Promise.resolve = function (value) {                                                                                // 610
	  if (value instanceof Promise) return value;                                                                       // 611
                                                                                                                     // 612
	  if (value === null) return NULL;                                                                                  // 613
	  if (value === undefined) return UNDEFINED;                                                                        // 614
	  if (value === true) return TRUE;                                                                                  // 615
	  if (value === false) return FALSE;                                                                                // 616
	  if (value === 0) return ZERO;                                                                                     // 617
	  if (value === '') return EMPTYSTRING;                                                                             // 618
                                                                                                                     // 619
	  if (typeof value === 'object' || typeof value === 'function') {                                                   // 620
	    try {                                                                                                           // 621
	      var then = value.then;                                                                                        // 622
	      if (typeof then === 'function') {                                                                             // 623
	        return new Promise(then.bind(value));                                                                       // 624
	      }                                                                                                             // 625
	    } catch (ex) {                                                                                                  // 626
	      return new Promise(function (resolve, reject) {                                                               // 627
	        reject(ex);                                                                                                 // 628
	      });                                                                                                           // 629
	    }                                                                                                               // 630
	  }                                                                                                                 // 631
	  return valuePromise(value);                                                                                       // 632
	};                                                                                                                  // 633
                                                                                                                     // 634
	Promise.all = function (arr) {                                                                                      // 635
	  var args = Array.prototype.slice.call(arr);                                                                       // 636
                                                                                                                     // 637
	  return new Promise(function (resolve, reject) {                                                                   // 638
	    if (args.length === 0) return resolve([]);                                                                      // 639
	    var remaining = args.length;                                                                                    // 640
	    function res(i, val) {                                                                                          // 641
	      if (val && (typeof val === 'object' || typeof val === 'function')) {                                          // 642
	        if (val instanceof Promise && val.then === Promise.prototype.then) {                                        // 643
	          while (val._37 === 3) {                                                                                   // 644
	            val = val._12;                                                                                          // 645
	          }                                                                                                         // 646
	          if (val._37 === 1) return res(i, val._12);                                                                // 647
	          if (val._37 === 2) reject(val._12);                                                                       // 648
	          val.then(function (val) {                                                                                 // 649
	            res(i, val);                                                                                            // 650
	          }, reject);                                                                                               // 651
	          return;                                                                                                   // 652
	        } else {                                                                                                    // 653
	          var then = val.then;                                                                                      // 654
	          if (typeof then === 'function') {                                                                         // 655
	            var p = new Promise(then.bind(val));                                                                    // 656
	            p.then(function (val) {                                                                                 // 657
	              res(i, val);                                                                                          // 658
	            }, reject);                                                                                             // 659
	            return;                                                                                                 // 660
	          }                                                                                                         // 661
	        }                                                                                                           // 662
	      }                                                                                                             // 663
	      args[i] = val;                                                                                                // 664
	      if (--remaining === 0) {                                                                                      // 665
	        resolve(args);                                                                                              // 666
	      }                                                                                                             // 667
	    }                                                                                                               // 668
	    for (var i = 0; i < args.length; i++) {                                                                         // 669
	      res(i, args[i]);                                                                                              // 670
	    }                                                                                                               // 671
	  });                                                                                                               // 672
	};                                                                                                                  // 673
                                                                                                                     // 674
	Promise.reject = function (value) {                                                                                 // 675
	  return new Promise(function (resolve, reject) {                                                                   // 676
	    reject(value);                                                                                                  // 677
	  });                                                                                                               // 678
	};                                                                                                                  // 679
                                                                                                                     // 680
	Promise.race = function (values) {                                                                                  // 681
	  return new Promise(function (resolve, reject) {                                                                   // 682
	    values.forEach(function(value){                                                                                 // 683
	      Promise.resolve(value).then(resolve, reject);                                                                 // 684
	    });                                                                                                             // 685
	  });                                                                                                               // 686
	};                                                                                                                  // 687
                                                                                                                     // 688
	/* Prototype Methods */                                                                                             // 689
                                                                                                                     // 690
	Promise.prototype['catch'] = function (onRejected) {                                                                // 691
	  return this.then(null, onRejected);                                                                               // 692
	};                                                                                                                  // 693
                                                                                                                     // 694
                                                                                                                     // 695
/***/ },                                                                                                             // 696
/* 9 */                                                                                                              // 697
/***/ function(module, exports, __webpack_require__) {                                                               // 698
                                                                                                                     // 699
	'use strict';                                                                                                       // 700
                                                                                                                     // 701
	// This file contains then/promise specific extensions that are only useful                                         // 702
	// for node.js interop                                                                                              // 703
                                                                                                                     // 704
	var Promise = __webpack_require__(4);                                                                               // 705
	var asap = __webpack_require__(10);                                                                                 // 706
                                                                                                                     // 707
	module.exports = Promise;                                                                                           // 708
                                                                                                                     // 709
	/* Static Functions */                                                                                              // 710
                                                                                                                     // 711
	Promise.denodeify = function (fn, argumentCount) {                                                                  // 712
	  argumentCount = argumentCount || Infinity;                                                                        // 713
	  return function () {                                                                                              // 714
	    var self = this;                                                                                                // 715
	    var args = Array.prototype.slice.call(arguments, 0,                                                             // 716
	        argumentCount > 0 ? argumentCount : 0);                                                                     // 717
	    return new Promise(function (resolve, reject) {                                                                 // 718
	      args.push(function (err, res) {                                                                               // 719
	        if (err) reject(err);                                                                                       // 720
	        else resolve(res);                                                                                          // 721
	      })                                                                                                            // 722
	      var res = fn.apply(self, args);                                                                               // 723
	      if (res &&                                                                                                    // 724
	        (                                                                                                           // 725
	          typeof res === 'object' ||                                                                                // 726
	          typeof res === 'function'                                                                                 // 727
	        ) &&                                                                                                        // 728
	        typeof res.then === 'function'                                                                              // 729
	      ) {                                                                                                           // 730
	        resolve(res);                                                                                               // 731
	      }                                                                                                             // 732
	    })                                                                                                              // 733
	  }                                                                                                                 // 734
	}                                                                                                                   // 735
	Promise.nodeify = function (fn) {                                                                                   // 736
	  return function () {                                                                                              // 737
	    var args = Array.prototype.slice.call(arguments);                                                               // 738
	    var callback =                                                                                                  // 739
	      typeof args[args.length - 1] === 'function' ? args.pop() : null;                                              // 740
	    var ctx = this;                                                                                                 // 741
	    try {                                                                                                           // 742
	      return fn.apply(this, arguments).nodeify(callback, ctx);                                                      // 743
	    } catch (ex) {                                                                                                  // 744
	      if (callback === null || typeof callback == 'undefined') {                                                    // 745
	        return new Promise(function (resolve, reject) {                                                             // 746
	          reject(ex);                                                                                               // 747
	        });                                                                                                         // 748
	      } else {                                                                                                      // 749
	        asap(function () {                                                                                          // 750
	          callback.call(ctx, ex);                                                                                   // 751
	        })                                                                                                          // 752
	      }                                                                                                             // 753
	    }                                                                                                               // 754
	  }                                                                                                                 // 755
	}                                                                                                                   // 756
                                                                                                                     // 757
	Promise.prototype.nodeify = function (callback, ctx) {                                                              // 758
	  if (typeof callback != 'function') return this;                                                                   // 759
                                                                                                                     // 760
	  this.then(function (value) {                                                                                      // 761
	    asap(function () {                                                                                              // 762
	      callback.call(ctx, null, value);                                                                              // 763
	    });                                                                                                             // 764
	  }, function (err) {                                                                                               // 765
	    asap(function () {                                                                                              // 766
	      callback.call(ctx, err);                                                                                      // 767
	    });                                                                                                             // 768
	  });                                                                                                               // 769
	}                                                                                                                   // 770
                                                                                                                     // 771
                                                                                                                     // 772
/***/ },                                                                                                             // 773
/* 10 */                                                                                                             // 774
/***/ function(module, exports, __webpack_require__) {                                                               // 775
                                                                                                                     // 776
	"use strict";                                                                                                       // 777
                                                                                                                     // 778
	// rawAsap provides everything we need except exception management.                                                 // 779
	var rawAsap = __webpack_require__(5);                                                                               // 780
	// RawTasks are recycled to reduce GC churn.                                                                        // 781
	var freeTasks = [];                                                                                                 // 782
	// We queue errors to ensure they are thrown in right order (FIFO).                                                 // 783
	// Array-as-queue is good enough here, since we are just dealing with exceptions.                                   // 784
	var pendingErrors = [];                                                                                             // 785
	var requestErrorThrow = rawAsap.makeRequestCallFromTimer(throwFirstError);                                          // 786
                                                                                                                     // 787
	function throwFirstError() {                                                                                        // 788
	    if (pendingErrors.length) {                                                                                     // 789
	        throw pendingErrors.shift();                                                                                // 790
	    }                                                                                                               // 791
	}                                                                                                                   // 792
                                                                                                                     // 793
	/**                                                                                                                 // 794
	 * Calls a task as soon as possible after returning, in its own event, with priority                                // 795
	 * over other events like animation, reflow, and repaint. An error thrown from an                                   // 796
	 * event will not interrupt, nor even substantially slow down the processing of                                     // 797
	 * other events, but will be rather postponed to a lower priority event.                                            // 798
	 * @param {{call}} task A callable object, typically a function that takes no                                       // 799
	 * arguments.                                                                                                       // 800
	 */                                                                                                                 // 801
	module.exports = asap;                                                                                              // 802
	function asap(task) {                                                                                               // 803
	    var rawTask;                                                                                                    // 804
	    if (freeTasks.length) {                                                                                         // 805
	        rawTask = freeTasks.pop();                                                                                  // 806
	    } else {                                                                                                        // 807
	        rawTask = new RawTask();                                                                                    // 808
	    }                                                                                                               // 809
	    rawTask.task = task;                                                                                            // 810
	    rawAsap(rawTask);                                                                                               // 811
	}                                                                                                                   // 812
                                                                                                                     // 813
	// We wrap tasks with recyclable task objects.  A task object implements                                            // 814
	// `call`, just like a function.                                                                                    // 815
	function RawTask() {                                                                                                // 816
	    this.task = null;                                                                                               // 817
	}                                                                                                                   // 818
                                                                                                                     // 819
	// The sole purpose of wrapping the task is to catch the exception and recycle                                      // 820
	// the task object after its single use.                                                                            // 821
	RawTask.prototype.call = function () {                                                                              // 822
	    try {                                                                                                           // 823
	        this.task.call();                                                                                           // 824
	    } catch (error) {                                                                                               // 825
	        if (asap.onerror) {                                                                                         // 826
	            // This hook exists purely for testing purposes.                                                        // 827
	            // Its name will be periodically randomized to break any code that                                      // 828
	            // depends on its existence.                                                                            // 829
	            asap.onerror(error);                                                                                    // 830
	        } else {                                                                                                    // 831
	            // In a web browser, exceptions are not fatal. However, to avoid                                        // 832
	            // slowing down the queue of pending tasks, we rethrow the error in a                                   // 833
	            // lower priority turn.                                                                                 // 834
	            pendingErrors.push(error);                                                                              // 835
	            requestErrorThrow();                                                                                    // 836
	        }                                                                                                           // 837
	    } finally {                                                                                                     // 838
	        this.task = null;                                                                                           // 839
	        freeTasks[freeTasks.length] = this;                                                                         // 840
	    }                                                                                                               // 841
	};                                                                                                                  // 842
                                                                                                                     // 843
                                                                                                                     // 844
/***/ }                                                                                                              // 845
/******/ ]);                                                                                                         // 846
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.promise = {
  Promise: Promise
};

})();

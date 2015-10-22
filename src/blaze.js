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
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;
var HTML = Package.htmljs.HTML;
var ObserveSequence = Package['observe-sequence'].ObserveSequence;
var ReactiveVar = Package['reactive-var'].ReactiveVar;

/* Package-scope variables */
var Blaze, AttributeHandler, makeAttributeHandler, ElementAttributesUpdater, UI, Handlebars;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/blaze/preamble.js                                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**                                                                                                                    // 1
 * @namespace Blaze                                                                                                    // 2
 * @summary The namespace for all Blaze-related methods and classes.                                                   // 3
 */                                                                                                                    // 4
Blaze = {};                                                                                                            // 5
                                                                                                                       // 6
// Utility to HTML-escape a string.  Included for legacy reasons.                                                      // 7
Blaze._escape = (function() {                                                                                          // 8
  var escape_map = {                                                                                                   // 9
    "<": "&lt;",                                                                                                       // 10
    ">": "&gt;",                                                                                                       // 11
    '"': "&quot;",                                                                                                     // 12
    "'": "&#x27;",                                                                                                     // 13
    "`": "&#x60;", /* IE allows backtick-delimited attributes?? */                                                     // 14
    "&": "&amp;"                                                                                                       // 15
  };                                                                                                                   // 16
  var escape_one = function(c) {                                                                                       // 17
    return escape_map[c];                                                                                              // 18
  };                                                                                                                   // 19
                                                                                                                       // 20
  return function (x) {                                                                                                // 21
    return x.replace(/[&<>"'`]/g, escape_one);                                                                         // 22
  };                                                                                                                   // 23
})();                                                                                                                  // 24
                                                                                                                       // 25
Blaze._warn = function (msg) {                                                                                         // 26
  msg = 'Warning: ' + msg;                                                                                             // 27
                                                                                                                       // 28
  if ((typeof console !== 'undefined') && console.warn) {                                                              // 29
    console.warn(msg);                                                                                                 // 30
  }                                                                                                                    // 31
};                                                                                                                     // 32
                                                                                                                       // 33
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/blaze/dombackend.js                                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var DOMBackend = {};                                                                                                   // 1
Blaze._DOMBackend = DOMBackend;                                                                                        // 2
                                                                                                                       // 3
var $jq = (typeof jQuery !== 'undefined' ? jQuery :                                                                    // 4
           (typeof Package !== 'undefined' ?                                                                           // 5
            Package.jquery && Package.jquery.jQuery : null));                                                          // 6
if (! $jq)                                                                                                             // 7
  throw new Error("jQuery not found");                                                                                 // 8
                                                                                                                       // 9
DOMBackend._$jq = $jq;                                                                                                 // 10
                                                                                                                       // 11
DOMBackend.parseHTML = function (html) {                                                                               // 12
  // Return an array of nodes.                                                                                         // 13
  //                                                                                                                   // 14
  // jQuery does fancy stuff like creating an appropriate                                                              // 15
  // container element and setting innerHTML on it, as well                                                            // 16
  // as working around various IE quirks.                                                                              // 17
  return $jq.parseHTML(html) || [];                                                                                    // 18
};                                                                                                                     // 19
                                                                                                                       // 20
DOMBackend.Events = {                                                                                                  // 21
  // `selector` is non-null.  `type` is one type (but                                                                  // 22
  // may be in backend-specific form, e.g. have namespaces).                                                           // 23
  // Order fired must be order bound.                                                                                  // 24
  delegateEvents: function (elem, type, selector, handler) {                                                           // 25
    $jq(elem).on(type, selector, handler);                                                                             // 26
  },                                                                                                                   // 27
                                                                                                                       // 28
  undelegateEvents: function (elem, type, handler) {                                                                   // 29
    $jq(elem).off(type, '**', handler);                                                                                // 30
  },                                                                                                                   // 31
                                                                                                                       // 32
  bindEventCapturer: function (elem, type, selector, handler) {                                                        // 33
    var $elem = $jq(elem);                                                                                             // 34
                                                                                                                       // 35
    var wrapper = function (event) {                                                                                   // 36
      event = $jq.event.fix(event);                                                                                    // 37
      event.currentTarget = event.target;                                                                              // 38
                                                                                                                       // 39
      // Note: It might improve jQuery interop if we called into jQuery                                                // 40
      // here somehow.  Since we don't use jQuery to dispatch the event,                                               // 41
      // we don't fire any of jQuery's event hooks or anything.  However,                                              // 42
      // since jQuery can't bind capturing handlers, it's not clear                                                    // 43
      // where we would hook in.  Internal jQuery functions like `dispatch`                                            // 44
      // are too high-level.                                                                                           // 45
      var $target = $jq(event.currentTarget);                                                                          // 46
      if ($target.is($elem.find(selector)))                                                                            // 47
        handler.call(elem, event);                                                                                     // 48
    };                                                                                                                 // 49
                                                                                                                       // 50
    handler._meteorui_wrapper = wrapper;                                                                               // 51
                                                                                                                       // 52
    type = DOMBackend.Events.parseEventType(type);                                                                     // 53
    // add *capturing* event listener                                                                                  // 54
    elem.addEventListener(type, wrapper, true);                                                                        // 55
  },                                                                                                                   // 56
                                                                                                                       // 57
  unbindEventCapturer: function (elem, type, handler) {                                                                // 58
    type = DOMBackend.Events.parseEventType(type);                                                                     // 59
    elem.removeEventListener(type, handler._meteorui_wrapper, true);                                                   // 60
  },                                                                                                                   // 61
                                                                                                                       // 62
  parseEventType: function (type) {                                                                                    // 63
    // strip off namespaces                                                                                            // 64
    var dotLoc = type.indexOf('.');                                                                                    // 65
    if (dotLoc >= 0)                                                                                                   // 66
      return type.slice(0, dotLoc);                                                                                    // 67
    return type;                                                                                                       // 68
  }                                                                                                                    // 69
};                                                                                                                     // 70
                                                                                                                       // 71
                                                                                                                       // 72
///// Removal detection and interoperability.                                                                          // 73
                                                                                                                       // 74
// For an explanation of this technique, see:                                                                          // 75
// http://bugs.jquery.com/ticket/12213#comment:23 .                                                                    // 76
//                                                                                                                     // 77
// In short, an element is considered "removed" when jQuery                                                            // 78
// cleans up its *private* userdata on the element,                                                                    // 79
// which we can detect using a custom event with a teardown                                                            // 80
// hook.                                                                                                               // 81
                                                                                                                       // 82
var NOOP = function () {};                                                                                             // 83
                                                                                                                       // 84
// Circular doubly-linked list                                                                                         // 85
var TeardownCallback = function (func) {                                                                               // 86
  this.next = this;                                                                                                    // 87
  this.prev = this;                                                                                                    // 88
  this.func = func;                                                                                                    // 89
};                                                                                                                     // 90
                                                                                                                       // 91
// Insert newElt before oldElt in the circular list                                                                    // 92
TeardownCallback.prototype.linkBefore = function(oldElt) {                                                             // 93
  this.prev = oldElt.prev;                                                                                             // 94
  this.next = oldElt;                                                                                                  // 95
  oldElt.prev.next = this;                                                                                             // 96
  oldElt.prev = this;                                                                                                  // 97
};                                                                                                                     // 98
                                                                                                                       // 99
TeardownCallback.prototype.unlink = function () {                                                                      // 100
  this.prev.next = this.next;                                                                                          // 101
  this.next.prev = this.prev;                                                                                          // 102
};                                                                                                                     // 103
                                                                                                                       // 104
TeardownCallback.prototype.go = function () {                                                                          // 105
  var func = this.func;                                                                                                // 106
  func && func();                                                                                                      // 107
};                                                                                                                     // 108
                                                                                                                       // 109
TeardownCallback.prototype.stop = TeardownCallback.prototype.unlink;                                                   // 110
                                                                                                                       // 111
DOMBackend.Teardown = {                                                                                                // 112
  _JQUERY_EVENT_NAME: 'blaze_teardown_watcher',                                                                        // 113
  _CB_PROP: '$blaze_teardown_callbacks',                                                                               // 114
  // Registers a callback function to be called when the given element or                                              // 115
  // one of its ancestors is removed from the DOM via the backend library.                                             // 116
  // The callback function is called at most once, and it receives the element                                         // 117
  // in question as an argument.                                                                                       // 118
  onElementTeardown: function (elem, func) {                                                                           // 119
    var elt = new TeardownCallback(func);                                                                              // 120
                                                                                                                       // 121
    var propName = DOMBackend.Teardown._CB_PROP;                                                                       // 122
    if (! elem[propName]) {                                                                                            // 123
      // create an empty node that is never unlinked                                                                   // 124
      elem[propName] = new TeardownCallback;                                                                           // 125
                                                                                                                       // 126
      // Set up the event, only the first time.                                                                        // 127
      $jq(elem).on(DOMBackend.Teardown._JQUERY_EVENT_NAME, NOOP);                                                      // 128
    }                                                                                                                  // 129
                                                                                                                       // 130
    elt.linkBefore(elem[propName]);                                                                                    // 131
                                                                                                                       // 132
    return elt; // so caller can call stop()                                                                           // 133
  },                                                                                                                   // 134
  // Recursively call all teardown hooks, in the backend and registered                                                // 135
  // through DOMBackend.onElementTeardown.                                                                             // 136
  tearDownElement: function (elem) {                                                                                   // 137
    var elems = [];                                                                                                    // 138
    // Array.prototype.slice.call doesn't work when given a NodeList in                                                // 139
    // IE8 ("JScript object expected").                                                                                // 140
    var nodeList = elem.getElementsByTagName('*');                                                                     // 141
    for (var i = 0; i < nodeList.length; i++) {                                                                        // 142
      elems.push(nodeList[i]);                                                                                         // 143
    }                                                                                                                  // 144
    elems.push(elem);                                                                                                  // 145
    $jq.cleanData(elems);                                                                                              // 146
  }                                                                                                                    // 147
};                                                                                                                     // 148
                                                                                                                       // 149
$jq.event.special[DOMBackend.Teardown._JQUERY_EVENT_NAME] = {                                                          // 150
  setup: function () {                                                                                                 // 151
    // This "setup" callback is important even though it is empty!                                                     // 152
    // Without it, jQuery will call addEventListener, which is a                                                       // 153
    // performance hit, especially with Chrome's async stack trace                                                     // 154
    // feature enabled.                                                                                                // 155
  },                                                                                                                   // 156
  teardown: function() {                                                                                               // 157
    var elem = this;                                                                                                   // 158
    var callbacks = elem[DOMBackend.Teardown._CB_PROP];                                                                // 159
    if (callbacks) {                                                                                                   // 160
      var elt = callbacks.next;                                                                                        // 161
      while (elt !== callbacks) {                                                                                      // 162
        elt.go();                                                                                                      // 163
        elt = elt.next;                                                                                                // 164
      }                                                                                                                // 165
      callbacks.go();                                                                                                  // 166
                                                                                                                       // 167
      elem[DOMBackend.Teardown._CB_PROP] = null;                                                                       // 168
    }                                                                                                                  // 169
  }                                                                                                                    // 170
};                                                                                                                     // 171
                                                                                                                       // 172
                                                                                                                       // 173
// Must use jQuery semantics for `context`, not                                                                        // 174
// querySelectorAll's.  In other words, all the parts                                                                  // 175
// of `selector` must be found under `context`.                                                                        // 176
DOMBackend.findBySelector = function (selector, context) {                                                             // 177
  return $jq(selector, context);                                                                                       // 178
};                                                                                                                     // 179
                                                                                                                       // 180
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/blaze/domrange.js                                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
// A constant empty array (frozen if the JS engine supports it).                                                       // 2
var _emptyArray = Object.freeze ? Object.freeze([]) : [];                                                              // 3
                                                                                                                       // 4
// `[new] Blaze._DOMRange([nodeAndRangeArray])`                                                                        // 5
//                                                                                                                     // 6
// A DOMRange consists of an array of consecutive nodes and DOMRanges,                                                 // 7
// which may be replaced at any time with a new array.  If the DOMRange                                                // 8
// has been attached to the DOM at some location, then updating                                                        // 9
// the array will cause the DOM to be updated at that location.                                                        // 10
Blaze._DOMRange = function (nodeAndRangeArray) {                                                                       // 11
  if (! (this instanceof DOMRange))                                                                                    // 12
    // called without `new`                                                                                            // 13
    return new DOMRange(nodeAndRangeArray);                                                                            // 14
                                                                                                                       // 15
  var members = (nodeAndRangeArray || _emptyArray);                                                                    // 16
  if (! (members && (typeof members.length) === 'number'))                                                             // 17
    throw new Error("Expected array");                                                                                 // 18
                                                                                                                       // 19
  for (var i = 0; i < members.length; i++)                                                                             // 20
    this._memberIn(members[i]);                                                                                        // 21
                                                                                                                       // 22
  this.members = members;                                                                                              // 23
  this.emptyRangePlaceholder = null;                                                                                   // 24
  this.attached = false;                                                                                               // 25
  this.parentElement = null;                                                                                           // 26
  this.parentRange = null;                                                                                             // 27
  this.attachedCallbacks = _emptyArray;                                                                                // 28
};                                                                                                                     // 29
var DOMRange = Blaze._DOMRange;                                                                                        // 30
                                                                                                                       // 31
// In IE 8, don't use empty text nodes as placeholders                                                                 // 32
// in empty DOMRanges, use comment nodes instead.  Using                                                               // 33
// empty text nodes in modern browsers is great because                                                                // 34
// it doesn't clutter the web inspector.  In IE 8, however,                                                            // 35
// it seems to lead in some roundabout way to the OAuth                                                                // 36
// pop-up crashing the browser completely.  In the past,                                                               // 37
// we didn't use empty text nodes on IE 8 because they                                                                 // 38
// don't accept JS properties, so just use the same logic                                                              // 39
// even though we don't need to set properties on the                                                                  // 40
// placeholder anymore.                                                                                                // 41
DOMRange._USE_COMMENT_PLACEHOLDERS = (function () {                                                                    // 42
  var result = false;                                                                                                  // 43
  var textNode = document.createTextNode("");                                                                          // 44
  try {                                                                                                                // 45
    textNode.someProp = true;                                                                                          // 46
  } catch (e) {                                                                                                        // 47
    // IE 8                                                                                                            // 48
    result = true;                                                                                                     // 49
  }                                                                                                                    // 50
  return result;                                                                                                       // 51
})();                                                                                                                  // 52
                                                                                                                       // 53
// static methods                                                                                                      // 54
DOMRange._insert = function (rangeOrNode, parentElement, nextNode, _isMove) {                                          // 55
  var m = rangeOrNode;                                                                                                 // 56
  if (m instanceof DOMRange) {                                                                                         // 57
    m.attach(parentElement, nextNode, _isMove);                                                                        // 58
  } else {                                                                                                             // 59
    if (_isMove)                                                                                                       // 60
      DOMRange._moveNodeWithHooks(m, parentElement, nextNode);                                                         // 61
    else                                                                                                               // 62
      DOMRange._insertNodeWithHooks(m, parentElement, nextNode);                                                       // 63
  }                                                                                                                    // 64
};                                                                                                                     // 65
                                                                                                                       // 66
DOMRange._remove = function (rangeOrNode) {                                                                            // 67
  var m = rangeOrNode;                                                                                                 // 68
  if (m instanceof DOMRange) {                                                                                         // 69
    m.detach();                                                                                                        // 70
  } else {                                                                                                             // 71
    DOMRange._removeNodeWithHooks(m);                                                                                  // 72
  }                                                                                                                    // 73
};                                                                                                                     // 74
                                                                                                                       // 75
DOMRange._removeNodeWithHooks = function (n) {                                                                         // 76
  if (! n.parentNode)                                                                                                  // 77
    return;                                                                                                            // 78
  if (n.nodeType === 1 &&                                                                                              // 79
      n.parentNode._uihooks && n.parentNode._uihooks.removeElement) {                                                  // 80
    n.parentNode._uihooks.removeElement(n);                                                                            // 81
  } else {                                                                                                             // 82
    n.parentNode.removeChild(n);                                                                                       // 83
  }                                                                                                                    // 84
};                                                                                                                     // 85
                                                                                                                       // 86
DOMRange._insertNodeWithHooks = function (n, parent, next) {                                                           // 87
  // `|| null` because IE throws an error if 'next' is undefined                                                       // 88
  next = next || null;                                                                                                 // 89
  if (n.nodeType === 1 &&                                                                                              // 90
      parent._uihooks && parent._uihooks.insertElement) {                                                              // 91
    parent._uihooks.insertElement(n, next);                                                                            // 92
  } else {                                                                                                             // 93
    parent.insertBefore(n, next);                                                                                      // 94
  }                                                                                                                    // 95
};                                                                                                                     // 96
                                                                                                                       // 97
DOMRange._moveNodeWithHooks = function (n, parent, next) {                                                             // 98
  if (n.parentNode !== parent)                                                                                         // 99
    return;                                                                                                            // 100
  // `|| null` because IE throws an error if 'next' is undefined                                                       // 101
  next = next || null;                                                                                                 // 102
  if (n.nodeType === 1 &&                                                                                              // 103
      parent._uihooks && parent._uihooks.moveElement) {                                                                // 104
    parent._uihooks.moveElement(n, next);                                                                              // 105
  } else {                                                                                                             // 106
    parent.insertBefore(n, next);                                                                                      // 107
  }                                                                                                                    // 108
};                                                                                                                     // 109
                                                                                                                       // 110
DOMRange.forElement = function (elem) {                                                                                // 111
  if (elem.nodeType !== 1)                                                                                             // 112
    throw new Error("Expected element, found: " + elem);                                                               // 113
  var range = null;                                                                                                    // 114
  while (elem && ! range) {                                                                                            // 115
    range = (elem.$blaze_range || null);                                                                               // 116
    if (! range)                                                                                                       // 117
      elem = elem.parentNode;                                                                                          // 118
  }                                                                                                                    // 119
  return range;                                                                                                        // 120
};                                                                                                                     // 121
                                                                                                                       // 122
DOMRange.prototype.attach = function (parentElement, nextNode, _isMove, _isReplace) {                                  // 123
  // This method is called to insert the DOMRange into the DOM for                                                     // 124
  // the first time, but it's also used internally when                                                                // 125
  // updating the DOM.                                                                                                 // 126
  //                                                                                                                   // 127
  // If _isMove is true, move this attached range to a different                                                       // 128
  // location under the same parentElement.                                                                            // 129
  if (_isMove || _isReplace) {                                                                                         // 130
    if (! (this.parentElement === parentElement &&                                                                     // 131
           this.attached))                                                                                             // 132
      throw new Error("Can only move or replace an attached DOMRange, and only under the same parent element");        // 133
  }                                                                                                                    // 134
                                                                                                                       // 135
  var members = this.members;                                                                                          // 136
  if (members.length) {                                                                                                // 137
    this.emptyRangePlaceholder = null;                                                                                 // 138
    for (var i = 0; i < members.length; i++) {                                                                         // 139
      DOMRange._insert(members[i], parentElement, nextNode, _isMove);                                                  // 140
    }                                                                                                                  // 141
  } else {                                                                                                             // 142
    var placeholder = (                                                                                                // 143
      DOMRange._USE_COMMENT_PLACEHOLDERS ?                                                                             // 144
        document.createComment("") :                                                                                   // 145
        document.createTextNode(""));                                                                                  // 146
    this.emptyRangePlaceholder = placeholder;                                                                          // 147
    parentElement.insertBefore(placeholder, nextNode || null);                                                         // 148
  }                                                                                                                    // 149
  this.attached = true;                                                                                                // 150
  this.parentElement = parentElement;                                                                                  // 151
                                                                                                                       // 152
  if (! (_isMove || _isReplace)) {                                                                                     // 153
    for(var i = 0; i < this.attachedCallbacks.length; i++) {                                                           // 154
      var obj = this.attachedCallbacks[i];                                                                             // 155
      obj.attached && obj.attached(this, parentElement);                                                               // 156
    }                                                                                                                  // 157
  }                                                                                                                    // 158
};                                                                                                                     // 159
                                                                                                                       // 160
DOMRange.prototype.setMembers = function (newNodeAndRangeArray) {                                                      // 161
  var newMembers = newNodeAndRangeArray;                                                                               // 162
  if (! (newMembers && (typeof newMembers.length) === 'number'))                                                       // 163
    throw new Error("Expected array");                                                                                 // 164
                                                                                                                       // 165
  var oldMembers = this.members;                                                                                       // 166
                                                                                                                       // 167
  for (var i = 0; i < oldMembers.length; i++)                                                                          // 168
    this._memberOut(oldMembers[i]);                                                                                    // 169
  for (var i = 0; i < newMembers.length; i++)                                                                          // 170
    this._memberIn(newMembers[i]);                                                                                     // 171
                                                                                                                       // 172
  if (! this.attached) {                                                                                               // 173
    this.members = newMembers;                                                                                         // 174
  } else {                                                                                                             // 175
    // don't do anything if we're going from empty to empty                                                            // 176
    if (newMembers.length || oldMembers.length) {                                                                      // 177
      // detach the old members and insert the new members                                                             // 178
      var nextNode = this.lastNode().nextSibling;                                                                      // 179
      var parentElement = this.parentElement;                                                                          // 180
      // Use detach/attach, but don't fire attached/detached hooks                                                     // 181
      this.detach(true /*_isReplace*/);                                                                                // 182
      this.members = newMembers;                                                                                       // 183
      this.attach(parentElement, nextNode, false, true /*_isReplace*/);                                                // 184
    }                                                                                                                  // 185
  }                                                                                                                    // 186
};                                                                                                                     // 187
                                                                                                                       // 188
DOMRange.prototype.firstNode = function () {                                                                           // 189
  if (! this.attached)                                                                                                 // 190
    throw new Error("Must be attached");                                                                               // 191
                                                                                                                       // 192
  if (! this.members.length)                                                                                           // 193
    return this.emptyRangePlaceholder;                                                                                 // 194
                                                                                                                       // 195
  var m = this.members[0];                                                                                             // 196
  return (m instanceof DOMRange) ? m.firstNode() : m;                                                                  // 197
};                                                                                                                     // 198
                                                                                                                       // 199
DOMRange.prototype.lastNode = function () {                                                                            // 200
  if (! this.attached)                                                                                                 // 201
    throw new Error("Must be attached");                                                                               // 202
                                                                                                                       // 203
  if (! this.members.length)                                                                                           // 204
    return this.emptyRangePlaceholder;                                                                                 // 205
                                                                                                                       // 206
  var m = this.members[this.members.length - 1];                                                                       // 207
  return (m instanceof DOMRange) ? m.lastNode() : m;                                                                   // 208
};                                                                                                                     // 209
                                                                                                                       // 210
DOMRange.prototype.detach = function (_isReplace) {                                                                    // 211
  if (! this.attached)                                                                                                 // 212
    throw new Error("Must be attached");                                                                               // 213
                                                                                                                       // 214
  var oldParentElement = this.parentElement;                                                                           // 215
  var members = this.members;                                                                                          // 216
  if (members.length) {                                                                                                // 217
    for (var i = 0; i < members.length; i++) {                                                                         // 218
      DOMRange._remove(members[i]);                                                                                    // 219
    }                                                                                                                  // 220
  } else {                                                                                                             // 221
    var placeholder = this.emptyRangePlaceholder;                                                                      // 222
    this.parentElement.removeChild(placeholder);                                                                       // 223
    this.emptyRangePlaceholder = null;                                                                                 // 224
  }                                                                                                                    // 225
                                                                                                                       // 226
  if (! _isReplace) {                                                                                                  // 227
    this.attached = false;                                                                                             // 228
    this.parentElement = null;                                                                                         // 229
                                                                                                                       // 230
    for(var i = 0; i < this.attachedCallbacks.length; i++) {                                                           // 231
      var obj = this.attachedCallbacks[i];                                                                             // 232
      obj.detached && obj.detached(this, oldParentElement);                                                            // 233
    }                                                                                                                  // 234
  }                                                                                                                    // 235
};                                                                                                                     // 236
                                                                                                                       // 237
DOMRange.prototype.addMember = function (newMember, atIndex, _isMove) {                                                // 238
  var members = this.members;                                                                                          // 239
  if (! (atIndex >= 0 && atIndex <= members.length))                                                                   // 240
    throw new Error("Bad index in range.addMember: " + atIndex);                                                       // 241
                                                                                                                       // 242
  if (! _isMove)                                                                                                       // 243
    this._memberIn(newMember);                                                                                         // 244
                                                                                                                       // 245
  if (! this.attached) {                                                                                               // 246
    // currently detached; just updated members                                                                        // 247
    members.splice(atIndex, 0, newMember);                                                                             // 248
  } else if (members.length === 0) {                                                                                   // 249
    // empty; use the empty-to-nonempty handling of setMembers                                                         // 250
    this.setMembers([newMember]);                                                                                      // 251
  } else {                                                                                                             // 252
    var nextNode;                                                                                                      // 253
    if (atIndex === members.length) {                                                                                  // 254
      // insert at end                                                                                                 // 255
      nextNode = this.lastNode().nextSibling;                                                                          // 256
    } else {                                                                                                           // 257
      var m = members[atIndex];                                                                                        // 258
      nextNode = (m instanceof DOMRange) ? m.firstNode() : m;                                                          // 259
    }                                                                                                                  // 260
    members.splice(atIndex, 0, newMember);                                                                             // 261
    DOMRange._insert(newMember, this.parentElement, nextNode, _isMove);                                                // 262
  }                                                                                                                    // 263
};                                                                                                                     // 264
                                                                                                                       // 265
DOMRange.prototype.removeMember = function (atIndex, _isMove) {                                                        // 266
  var members = this.members;                                                                                          // 267
  if (! (atIndex >= 0 && atIndex < members.length))                                                                    // 268
    throw new Error("Bad index in range.removeMember: " + atIndex);                                                    // 269
                                                                                                                       // 270
  if (_isMove) {                                                                                                       // 271
    members.splice(atIndex, 1);                                                                                        // 272
  } else {                                                                                                             // 273
    var oldMember = members[atIndex];                                                                                  // 274
    this._memberOut(oldMember);                                                                                        // 275
                                                                                                                       // 276
    if (members.length === 1) {                                                                                        // 277
      // becoming empty; use the logic in setMembers                                                                   // 278
      this.setMembers(_emptyArray);                                                                                    // 279
    } else {                                                                                                           // 280
      members.splice(atIndex, 1);                                                                                      // 281
      if (this.attached)                                                                                               // 282
        DOMRange._remove(oldMember);                                                                                   // 283
    }                                                                                                                  // 284
  }                                                                                                                    // 285
};                                                                                                                     // 286
                                                                                                                       // 287
DOMRange.prototype.moveMember = function (oldIndex, newIndex) {                                                        // 288
  var member = this.members[oldIndex];                                                                                 // 289
  this.removeMember(oldIndex, true /*_isMove*/);                                                                       // 290
  this.addMember(member, newIndex, true /*_isMove*/);                                                                  // 291
};                                                                                                                     // 292
                                                                                                                       // 293
DOMRange.prototype.getMember = function (atIndex) {                                                                    // 294
  var members = this.members;                                                                                          // 295
  if (! (atIndex >= 0 && atIndex < members.length))                                                                    // 296
    throw new Error("Bad index in range.getMember: " + atIndex);                                                       // 297
  return this.members[atIndex];                                                                                        // 298
};                                                                                                                     // 299
                                                                                                                       // 300
DOMRange.prototype._memberIn = function (m) {                                                                          // 301
  if (m instanceof DOMRange)                                                                                           // 302
    m.parentRange = this;                                                                                              // 303
  else if (m.nodeType === 1) // DOM Element                                                                            // 304
    m.$blaze_range = this;                                                                                             // 305
};                                                                                                                     // 306
                                                                                                                       // 307
DOMRange._destroy = function (m, _skipNodes) {                                                                         // 308
  if (m instanceof DOMRange) {                                                                                         // 309
    if (m.view)                                                                                                        // 310
      Blaze._destroyView(m.view, _skipNodes);                                                                          // 311
  } else if ((! _skipNodes) && m.nodeType === 1) {                                                                     // 312
    // DOM Element                                                                                                     // 313
    if (m.$blaze_range) {                                                                                              // 314
      Blaze._destroyNode(m);                                                                                           // 315
      m.$blaze_range = null;                                                                                           // 316
    }                                                                                                                  // 317
  }                                                                                                                    // 318
};                                                                                                                     // 319
                                                                                                                       // 320
DOMRange.prototype._memberOut = DOMRange._destroy;                                                                     // 321
                                                                                                                       // 322
// Tear down, but don't remove, the members.  Used when chunks                                                         // 323
// of DOM are being torn down or replaced.                                                                             // 324
DOMRange.prototype.destroyMembers = function (_skipNodes) {                                                            // 325
  var members = this.members;                                                                                          // 326
  for (var i = 0; i < members.length; i++)                                                                             // 327
    this._memberOut(members[i], _skipNodes);                                                                           // 328
};                                                                                                                     // 329
                                                                                                                       // 330
DOMRange.prototype.destroy = function (_skipNodes) {                                                                   // 331
  DOMRange._destroy(this, _skipNodes);                                                                                 // 332
};                                                                                                                     // 333
                                                                                                                       // 334
DOMRange.prototype.containsElement = function (elem) {                                                                 // 335
  if (! this.attached)                                                                                                 // 336
    throw new Error("Must be attached");                                                                               // 337
                                                                                                                       // 338
  // An element is contained in this DOMRange if it's possible to                                                      // 339
  // reach it by walking parent pointers, first through the DOM and                                                    // 340
  // then parentRange pointers.  In other words, the element or some                                                   // 341
  // ancestor of it is at our level of the DOM (a child of our                                                         // 342
  // parentElement), and this element is one of our members or                                                         // 343
  // is a member of a descendant Range.                                                                                // 344
                                                                                                                       // 345
  // First check that elem is a descendant of this.parentElement,                                                      // 346
  // according to the DOM.                                                                                             // 347
  if (! Blaze._elementContains(this.parentElement, elem))                                                              // 348
    return false;                                                                                                      // 349
                                                                                                                       // 350
  // If elem is not an immediate child of this.parentElement,                                                          // 351
  // walk up to its ancestor that is.                                                                                  // 352
  while (elem.parentNode !== this.parentElement)                                                                       // 353
    elem = elem.parentNode;                                                                                            // 354
                                                                                                                       // 355
  var range = elem.$blaze_range;                                                                                       // 356
  while (range && range !== this)                                                                                      // 357
    range = range.parentRange;                                                                                         // 358
                                                                                                                       // 359
  return range === this;                                                                                               // 360
};                                                                                                                     // 361
                                                                                                                       // 362
DOMRange.prototype.containsRange = function (range) {                                                                  // 363
  if (! this.attached)                                                                                                 // 364
    throw new Error("Must be attached");                                                                               // 365
                                                                                                                       // 366
  if (! range.attached)                                                                                                // 367
    return false;                                                                                                      // 368
                                                                                                                       // 369
  // A DOMRange is contained in this DOMRange if it's possible                                                         // 370
  // to reach this range by following parent pointers.  If the                                                         // 371
  // DOMRange has the same parentElement, then it should be                                                            // 372
  // a member, or a member of a member etc.  Otherwise, we must                                                        // 373
  // contain its parentElement.                                                                                        // 374
                                                                                                                       // 375
  if (range.parentElement !== this.parentElement)                                                                      // 376
    return this.containsElement(range.parentElement);                                                                  // 377
                                                                                                                       // 378
  if (range === this)                                                                                                  // 379
    return false; // don't contain self                                                                                // 380
                                                                                                                       // 381
  while (range && range !== this)                                                                                      // 382
    range = range.parentRange;                                                                                         // 383
                                                                                                                       // 384
  return range === this;                                                                                               // 385
};                                                                                                                     // 386
                                                                                                                       // 387
DOMRange.prototype.onAttached = function (attached) {                                                                  // 388
  this.onAttachedDetached({ attached: attached });                                                                     // 389
};                                                                                                                     // 390
                                                                                                                       // 391
// callbacks are `attached(range, element)` and                                                                        // 392
// `detached(range, element)`, and they may                                                                            // 393
// access the `callbacks` object in `this`.                                                                            // 394
// The arguments to `detached` are the same                                                                            // 395
// range and element that were passed to `attached`.                                                                   // 396
DOMRange.prototype.onAttachedDetached = function (callbacks) {                                                         // 397
  if (this.attachedCallbacks === _emptyArray)                                                                          // 398
    this.attachedCallbacks = [];                                                                                       // 399
  this.attachedCallbacks.push(callbacks);                                                                              // 400
};                                                                                                                     // 401
                                                                                                                       // 402
DOMRange.prototype.$ = function (selector) {                                                                           // 403
  var self = this;                                                                                                     // 404
                                                                                                                       // 405
  var parentNode = this.parentElement;                                                                                 // 406
  if (! parentNode)                                                                                                    // 407
    throw new Error("Can't select in removed DomRange");                                                               // 408
                                                                                                                       // 409
  // Strategy: Find all selector matches under parentNode,                                                             // 410
  // then filter out the ones that aren't in this DomRange                                                             // 411
  // using `DOMRange#containsElement`.  This is                                                                        // 412
  // asymptotically slow in the presence of O(N) sibling                                                               // 413
  // content that is under parentNode but not in our range,                                                            // 414
  // so if performance is an issue, the selector should be                                                             // 415
  // run on a child element.                                                                                           // 416
                                                                                                                       // 417
  // Since jQuery can't run selectors on a DocumentFragment,                                                           // 418
  // we don't expect findBySelector to work.                                                                           // 419
  if (parentNode.nodeType === 11 /* DocumentFragment */)                                                               // 420
    throw new Error("Can't use $ on an offscreen range");                                                              // 421
                                                                                                                       // 422
  var results = Blaze._DOMBackend.findBySelector(selector, parentNode);                                                // 423
                                                                                                                       // 424
  // We don't assume `results` has jQuery API; a plain array                                                           // 425
  // should do just as well.  However, if we do have a jQuery                                                          // 426
  // array, we want to end up with one also, so we use                                                                 // 427
  // `.filter`.                                                                                                        // 428
                                                                                                                       // 429
  // Function that selects only elements that are actually                                                             // 430
  // in this DomRange, rather than simply descending from                                                              // 431
  // `parentNode`.                                                                                                     // 432
  var filterFunc = function (elem) {                                                                                   // 433
    // handle jQuery's arguments to filter, where the node                                                             // 434
    // is in `this` and the index is the first argument.                                                               // 435
    if (typeof elem === 'number')                                                                                      // 436
      elem = this;                                                                                                     // 437
                                                                                                                       // 438
    return self.containsElement(elem);                                                                                 // 439
  };                                                                                                                   // 440
                                                                                                                       // 441
  if (! results.filter) {                                                                                              // 442
    // not a jQuery array, and not a browser with                                                                      // 443
    // Array.prototype.filter (e.g. IE <9)                                                                             // 444
    var newResults = [];                                                                                               // 445
    for (var i = 0; i < results.length; i++) {                                                                         // 446
      var x = results[i];                                                                                              // 447
      if (filterFunc(x))                                                                                               // 448
        newResults.push(x);                                                                                            // 449
    }                                                                                                                  // 450
    results = newResults;                                                                                              // 451
  } else {                                                                                                             // 452
    // `results.filter` is either jQuery's or ECMAScript's `filter`                                                    // 453
    results = results.filter(filterFunc);                                                                              // 454
  }                                                                                                                    // 455
                                                                                                                       // 456
  return results;                                                                                                      // 457
};                                                                                                                     // 458
                                                                                                                       // 459
// Returns true if element a contains node b and is not node b.                                                        // 460
//                                                                                                                     // 461
// The restriction that `a` be an element (not a document fragment,                                                    // 462
// say) is based on what's easy to implement cross-browser.                                                            // 463
Blaze._elementContains = function (a, b) {                                                                             // 464
  if (a.nodeType !== 1) // ELEMENT                                                                                     // 465
    return false;                                                                                                      // 466
  if (a === b)                                                                                                         // 467
    return false;                                                                                                      // 468
                                                                                                                       // 469
  if (a.compareDocumentPosition) {                                                                                     // 470
    return a.compareDocumentPosition(b) & 0x10;                                                                        // 471
  } else {                                                                                                             // 472
    // Should be only old IE and maybe other old browsers here.                                                        // 473
    // Modern Safari has both functions but seems to get contains() wrong.                                             // 474
    // IE can't handle b being a text node.  We work around this                                                       // 475
    // by doing a direct parent test now.                                                                              // 476
    b = b.parentNode;                                                                                                  // 477
    if (! (b && b.nodeType === 1)) // ELEMENT                                                                          // 478
      return false;                                                                                                    // 479
    if (a === b)                                                                                                       // 480
      return true;                                                                                                     // 481
                                                                                                                       // 482
    return a.contains(b);                                                                                              // 483
  }                                                                                                                    // 484
};                                                                                                                     // 485
                                                                                                                       // 486
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/blaze/events.js                                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var EventSupport = Blaze._EventSupport = {};                                                                           // 1
                                                                                                                       // 2
var DOMBackend = Blaze._DOMBackend;                                                                                    // 3
                                                                                                                       // 4
// List of events to always delegate, never capture.                                                                   // 5
// Since jQuery fakes bubbling for certain events in                                                                   // 6
// certain browsers (like `submit`), we don't want to                                                                  // 7
// get in its way.                                                                                                     // 8
//                                                                                                                     // 9
// We could list all known bubbling                                                                                    // 10
// events here to avoid creating speculative capturers                                                                 // 11
// for them, but it would only be an optimization.                                                                     // 12
var eventsToDelegate = EventSupport.eventsToDelegate = {                                                               // 13
  blur: 1, change: 1, click: 1, focus: 1, focusin: 1,                                                                  // 14
  focusout: 1, reset: 1, submit: 1                                                                                     // 15
};                                                                                                                     // 16
                                                                                                                       // 17
var EVENT_MODE = EventSupport.EVENT_MODE = {                                                                           // 18
  TBD: 0,                                                                                                              // 19
  BUBBLING: 1,                                                                                                         // 20
  CAPTURING: 2                                                                                                         // 21
};                                                                                                                     // 22
                                                                                                                       // 23
var NEXT_HANDLERREC_ID = 1;                                                                                            // 24
                                                                                                                       // 25
var HandlerRec = function (elem, type, selector, handler, recipient) {                                                 // 26
  this.elem = elem;                                                                                                    // 27
  this.type = type;                                                                                                    // 28
  this.selector = selector;                                                                                            // 29
  this.handler = handler;                                                                                              // 30
  this.recipient = recipient;                                                                                          // 31
  this.id = (NEXT_HANDLERREC_ID++);                                                                                    // 32
                                                                                                                       // 33
  this.mode = EVENT_MODE.TBD;                                                                                          // 34
                                                                                                                       // 35
  // It's important that delegatedHandler be a different                                                               // 36
  // instance for each handlerRecord, because its identity                                                             // 37
  // is used to remove it.                                                                                             // 38
  //                                                                                                                   // 39
  // It's also important that the closure have access to                                                               // 40
  // `this` when it is not called with it set.                                                                         // 41
  this.delegatedHandler = (function (h) {                                                                              // 42
    return function (evt) {                                                                                            // 43
      if ((! h.selector) && evt.currentTarget !== evt.target)                                                          // 44
        // no selector means only fire on target                                                                       // 45
        return;                                                                                                        // 46
      return h.handler.apply(h.recipient, arguments);                                                                  // 47
    };                                                                                                                 // 48
  })(this);                                                                                                            // 49
                                                                                                                       // 50
  // WHY CAPTURE AND DELEGATE: jQuery can't delegate                                                                   // 51
  // non-bubbling events, because                                                                                      // 52
  // event capture doesn't work in IE 8.  However, there                                                               // 53
  // are all sorts of new-fangled non-bubbling events                                                                  // 54
  // like "play" and "touchenter".  We delegate these                                                                  // 55
  // events using capture in all browsers except IE 8.                                                                 // 56
  // IE 8 doesn't support these events anyway.                                                                         // 57
                                                                                                                       // 58
  var tryCapturing = elem.addEventListener &&                                                                          // 59
        (! _.has(eventsToDelegate,                                                                                     // 60
                 DOMBackend.Events.parseEventType(type)));                                                             // 61
                                                                                                                       // 62
  if (tryCapturing) {                                                                                                  // 63
    this.capturingHandler = (function (h) {                                                                            // 64
      return function (evt) {                                                                                          // 65
        if (h.mode === EVENT_MODE.TBD) {                                                                               // 66
          // must be first time we're called.                                                                          // 67
          if (evt.bubbles) {                                                                                           // 68
            // this type of event bubbles, so don't                                                                    // 69
            // get called again.                                                                                       // 70
            h.mode = EVENT_MODE.BUBBLING;                                                                              // 71
            DOMBackend.Events.unbindEventCapturer(                                                                     // 72
              h.elem, h.type, h.capturingHandler);                                                                     // 73
            return;                                                                                                    // 74
          } else {                                                                                                     // 75
            // this type of event doesn't bubble,                                                                      // 76
            // so unbind the delegation, preventing                                                                    // 77
            // it from ever firing.                                                                                    // 78
            h.mode = EVENT_MODE.CAPTURING;                                                                             // 79
            DOMBackend.Events.undelegateEvents(                                                                        // 80
              h.elem, h.type, h.delegatedHandler);                                                                     // 81
          }                                                                                                            // 82
        }                                                                                                              // 83
                                                                                                                       // 84
        h.delegatedHandler(evt);                                                                                       // 85
      };                                                                                                               // 86
    })(this);                                                                                                          // 87
                                                                                                                       // 88
  } else {                                                                                                             // 89
    this.mode = EVENT_MODE.BUBBLING;                                                                                   // 90
  }                                                                                                                    // 91
};                                                                                                                     // 92
EventSupport.HandlerRec = HandlerRec;                                                                                  // 93
                                                                                                                       // 94
HandlerRec.prototype.bind = function () {                                                                              // 95
  // `this.mode` may be EVENT_MODE_TBD, in which case we bind both. in                                                 // 96
  // this case, 'capturingHandler' is in charge of detecting the                                                       // 97
  // correct mode and turning off one or the other handlers.                                                           // 98
  if (this.mode !== EVENT_MODE.BUBBLING) {                                                                             // 99
    DOMBackend.Events.bindEventCapturer(                                                                               // 100
      this.elem, this.type, this.selector || '*',                                                                      // 101
      this.capturingHandler);                                                                                          // 102
  }                                                                                                                    // 103
                                                                                                                       // 104
  if (this.mode !== EVENT_MODE.CAPTURING)                                                                              // 105
    DOMBackend.Events.delegateEvents(                                                                                  // 106
      this.elem, this.type,                                                                                            // 107
      this.selector || '*', this.delegatedHandler);                                                                    // 108
};                                                                                                                     // 109
                                                                                                                       // 110
HandlerRec.prototype.unbind = function () {                                                                            // 111
  if (this.mode !== EVENT_MODE.BUBBLING)                                                                               // 112
    DOMBackend.Events.unbindEventCapturer(this.elem, this.type,                                                        // 113
                                          this.capturingHandler);                                                      // 114
                                                                                                                       // 115
  if (this.mode !== EVENT_MODE.CAPTURING)                                                                              // 116
    DOMBackend.Events.undelegateEvents(this.elem, this.type,                                                           // 117
                                       this.delegatedHandler);                                                         // 118
};                                                                                                                     // 119
                                                                                                                       // 120
EventSupport.listen = function (element, events, selector, handler, recipient, getParentRecipient) {                   // 121
                                                                                                                       // 122
  // Prevent this method from being JITed by Safari.  Due to a                                                         // 123
  // presumed JIT bug in Safari -- observed in Version 7.0.6                                                           // 124
  // (9537.78.2) -- this method may crash the Safari render process if                                                 // 125
  // it is JITed.                                                                                                      // 126
  // Repro: https://github.com/dgreensp/public/tree/master/safari-crash                                                // 127
  try { element = element; } finally {}                                                                                // 128
                                                                                                                       // 129
  var eventTypes = [];                                                                                                 // 130
  events.replace(/[^ /]+/g, function (e) {                                                                             // 131
    eventTypes.push(e);                                                                                                // 132
  });                                                                                                                  // 133
                                                                                                                       // 134
  var newHandlerRecs = [];                                                                                             // 135
  for (var i = 0, N = eventTypes.length; i < N; i++) {                                                                 // 136
    var type = eventTypes[i];                                                                                          // 137
                                                                                                                       // 138
    var eventDict = element.$blaze_events;                                                                             // 139
    if (! eventDict)                                                                                                   // 140
      eventDict = (element.$blaze_events = {});                                                                        // 141
                                                                                                                       // 142
    var info = eventDict[type];                                                                                        // 143
    if (! info) {                                                                                                      // 144
      info = eventDict[type] = {};                                                                                     // 145
      info.handlers = [];                                                                                              // 146
    }                                                                                                                  // 147
    var handlerList = info.handlers;                                                                                   // 148
    var handlerRec = new HandlerRec(                                                                                   // 149
      element, type, selector, handler, recipient);                                                                    // 150
    newHandlerRecs.push(handlerRec);                                                                                   // 151
    handlerRec.bind();                                                                                                 // 152
    handlerList.push(handlerRec);                                                                                      // 153
    // Move handlers of enclosing ranges to end, by unbinding and rebinding                                            // 154
    // them.  In jQuery (or other DOMBackend) this causes them to fire                                                 // 155
    // later when the backend dispatches event handlers.                                                               // 156
    if (getParentRecipient) {                                                                                          // 157
      for (var r = getParentRecipient(recipient); r;                                                                   // 158
           r = getParentRecipient(r)) {                                                                                // 159
        // r is an enclosing range (recipient)                                                                         // 160
        for (var j = 0, Nj = handlerList.length;                                                                       // 161
             j < Nj; j++) {                                                                                            // 162
          var h = handlerList[j];                                                                                      // 163
          if (h.recipient === r) {                                                                                     // 164
            h.unbind();                                                                                                // 165
            h.bind();                                                                                                  // 166
            handlerList.splice(j, 1); // remove handlerList[j]                                                         // 167
            handlerList.push(h);                                                                                       // 168
            j--; // account for removed handler                                                                        // 169
            Nj--; // don't visit appended handlers                                                                     // 170
          }                                                                                                            // 171
        }                                                                                                              // 172
      }                                                                                                                // 173
    }                                                                                                                  // 174
  }                                                                                                                    // 175
                                                                                                                       // 176
  return {                                                                                                             // 177
    // closes over just `element` and `newHandlerRecs`                                                                 // 178
    stop: function () {                                                                                                // 179
      var eventDict = element.$blaze_events;                                                                           // 180
      if (! eventDict)                                                                                                 // 181
        return;                                                                                                        // 182
      // newHandlerRecs has only one item unless you specify multiple                                                  // 183
      // event types.  If this code is slow, it's because we have to                                                   // 184
      // iterate over handlerList here.  Clearing a whole handlerList                                                  // 185
      // via stop() methods is O(N^2) in the number of handlers on                                                     // 186
      // an element.                                                                                                   // 187
      for (var i = 0; i < newHandlerRecs.length; i++) {                                                                // 188
        var handlerToRemove = newHandlerRecs[i];                                                                       // 189
        var info = eventDict[handlerToRemove.type];                                                                    // 190
        if (! info)                                                                                                    // 191
          continue;                                                                                                    // 192
        var handlerList = info.handlers;                                                                               // 193
        for (var j = handlerList.length - 1; j >= 0; j--) {                                                            // 194
          if (handlerList[j] === handlerToRemove) {                                                                    // 195
            handlerToRemove.unbind();                                                                                  // 196
            handlerList.splice(j, 1); // remove handlerList[j]                                                         // 197
          }                                                                                                            // 198
        }                                                                                                              // 199
      }                                                                                                                // 200
      newHandlerRecs.length = 0;                                                                                       // 201
    }                                                                                                                  // 202
  };                                                                                                                   // 203
};                                                                                                                     // 204
                                                                                                                       // 205
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/blaze/attrs.js                                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var jsUrlsAllowed = false;                                                                                             // 1
Blaze._allowJavascriptUrls = function () {                                                                             // 2
  jsUrlsAllowed = true;                                                                                                // 3
};                                                                                                                     // 4
Blaze._javascriptUrlsAllowed = function () {                                                                           // 5
  return jsUrlsAllowed;                                                                                                // 6
};                                                                                                                     // 7
                                                                                                                       // 8
// An AttributeHandler object is responsible for updating a particular attribute                                       // 9
// of a particular element.  AttributeHandler subclasses implement                                                     // 10
// browser-specific logic for dealing with particular attributes across                                                // 11
// different browsers.                                                                                                 // 12
//                                                                                                                     // 13
// To define a new type of AttributeHandler, use                                                                       // 14
// `var FooHandler = AttributeHandler.extend({ update: function ... })`                                                // 15
// where the `update` function takes arguments `(element, oldValue, value)`.                                           // 16
// The `element` argument is always the same between calls to `update` on                                              // 17
// the same instance.  `oldValue` and `value` are each either `null` or                                                // 18
// a Unicode string of the type that might be passed to the value argument                                             // 19
// of `setAttribute` (i.e. not an HTML string with character references).                                              // 20
// When an AttributeHandler is installed, an initial call to `update` is                                               // 21
// always made with `oldValue = null`.  The `update` method can access                                                 // 22
// `this.name` if the AttributeHandler class is a generic one that applies                                             // 23
// to multiple attribute names.                                                                                        // 24
//                                                                                                                     // 25
// AttributeHandlers can store custom properties on `this`, as long as they                                            // 26
// don't use the names `element`, `name`, `value`, and `oldValue`.                                                     // 27
//                                                                                                                     // 28
// AttributeHandlers can't influence how attributes appear in rendered HTML,                                           // 29
// only how they are updated after materialization as DOM.                                                             // 30
                                                                                                                       // 31
AttributeHandler = function (name, value) {                                                                            // 32
  this.name = name;                                                                                                    // 33
  this.value = value;                                                                                                  // 34
};                                                                                                                     // 35
Blaze._AttributeHandler = AttributeHandler;                                                                            // 36
                                                                                                                       // 37
AttributeHandler.prototype.update = function (element, oldValue, value) {                                              // 38
  if (value === null) {                                                                                                // 39
    if (oldValue !== null)                                                                                             // 40
      element.removeAttribute(this.name);                                                                              // 41
  } else {                                                                                                             // 42
    element.setAttribute(this.name, value);                                                                            // 43
  }                                                                                                                    // 44
};                                                                                                                     // 45
                                                                                                                       // 46
AttributeHandler.extend = function (options) {                                                                         // 47
  var curType = this;                                                                                                  // 48
  var subType = function AttributeHandlerSubtype(/*arguments*/) {                                                      // 49
    AttributeHandler.apply(this, arguments);                                                                           // 50
  };                                                                                                                   // 51
  subType.prototype = new curType;                                                                                     // 52
  subType.extend = curType.extend;                                                                                     // 53
  if (options)                                                                                                         // 54
    _.extend(subType.prototype, options);                                                                              // 55
  return subType;                                                                                                      // 56
};                                                                                                                     // 57
                                                                                                                       // 58
/// Apply the diff between the attributes of "oldValue" and "value" to "element."                                      // 59
//                                                                                                                     // 60
// Each subclass must implement a parseValue method which takes a string                                               // 61
// as an input and returns a dict of attributes. The keys of the dict                                                  // 62
// are unique identifiers (ie. css properties in the case of styles), and the                                          // 63
// values are the entire attribute which will be injected into the element.                                            // 64
//                                                                                                                     // 65
// Extended below to support classes, SVG elements and styles.                                                         // 66
                                                                                                                       // 67
var DiffingAttributeHandler = AttributeHandler.extend({                                                                // 68
  update: function (element, oldValue, value) {                                                                        // 69
    if (!this.getCurrentValue || !this.setValue || !this.parseValue)                                                   // 70
      throw new Error("Missing methods in subclass of 'DiffingAttributeHandler'");                                     // 71
                                                                                                                       // 72
    var oldAttrsMap = oldValue ? this.parseValue(oldValue) : {};                                                       // 73
    var newAttrsMap = value ? this.parseValue(value) : {};                                                             // 74
                                                                                                                       // 75
    // the current attributes on the element, which we will mutate.                                                    // 76
                                                                                                                       // 77
    var attrString = this.getCurrentValue(element);                                                                    // 78
    var attrsMap = attrString ? this.parseValue(attrString) : {};                                                      // 79
                                                                                                                       // 80
    _.each(_.keys(oldAttrsMap), function (t) {                                                                         // 81
      if (! (t in newAttrsMap))                                                                                        // 82
        delete attrsMap[t];                                                                                            // 83
    });                                                                                                                // 84
                                                                                                                       // 85
    _.each(_.keys(newAttrsMap), function (t) {                                                                         // 86
      attrsMap[t] = newAttrsMap[t];                                                                                    // 87
    });                                                                                                                // 88
                                                                                                                       // 89
    this.setValue(element, _.values(attrsMap).join(' '));                                                              // 90
  }                                                                                                                    // 91
});                                                                                                                    // 92
                                                                                                                       // 93
var ClassHandler = DiffingAttributeHandler.extend({                                                                    // 94
  // @param rawValue {String}                                                                                          // 95
  getCurrentValue: function (element) {                                                                                // 96
    return element.className;                                                                                          // 97
  },                                                                                                                   // 98
  setValue: function (element, className) {                                                                            // 99
    element.className = className;                                                                                     // 100
  },                                                                                                                   // 101
  parseValue: function (attrString) {                                                                                  // 102
    var tokens = {};                                                                                                   // 103
                                                                                                                       // 104
    _.each(attrString.split(' '), function(token) {                                                                    // 105
      if (token)                                                                                                       // 106
        tokens[token] = token;                                                                                         // 107
    });                                                                                                                // 108
    return tokens;                                                                                                     // 109
  }                                                                                                                    // 110
});                                                                                                                    // 111
                                                                                                                       // 112
var SVGClassHandler = ClassHandler.extend({                                                                            // 113
  getCurrentValue: function (element) {                                                                                // 114
    return element.className.baseVal;                                                                                  // 115
  },                                                                                                                   // 116
  setValue: function (element, className) {                                                                            // 117
    element.setAttribute('class', className);                                                                          // 118
  }                                                                                                                    // 119
});                                                                                                                    // 120
                                                                                                                       // 121
var StyleHandler = DiffingAttributeHandler.extend({                                                                    // 122
  getCurrentValue: function (element) {                                                                                // 123
    return element.getAttribute('style');                                                                              // 124
  },                                                                                                                   // 125
  setValue: function (element, style) {                                                                                // 126
    if (style === '') {                                                                                                // 127
      element.removeAttribute('style');                                                                                // 128
    } else {                                                                                                           // 129
      element.setAttribute('style', style);                                                                            // 130
    }                                                                                                                  // 131
  },                                                                                                                   // 132
                                                                                                                       // 133
  // Parse a string to produce a map from property to attribute string.                                                // 134
  //                                                                                                                   // 135
  // Example:                                                                                                          // 136
  // "color:red; foo:12px" produces a token {color: "color:red", foo:"foo:12px"}                                       // 137
  parseValue: function (attrString) {                                                                                  // 138
    var tokens = {};                                                                                                   // 139
                                                                                                                       // 140
    // Regex for parsing a css attribute declaration, taken from css-parse:                                            // 141
    // https://github.com/reworkcss/css-parse/blob/7cef3658d0bba872cde05a85339034b187cb3397/index.js#L219              // 142
    var regex = /(\*?[-#\/\*\\\w]+(?:\[[0-9a-z_-]+\])?)\s*:\s*(?:\'(?:\\\'|.)*?\'|"(?:\\"|.)*?"|\([^\)]*?\)|[^};])+[;\s]*/g;
    var match = regex.exec(attrString);                                                                                // 144
    while (match) {                                                                                                    // 145
      // match[0] = entire matching string                                                                             // 146
      // match[1] = css property                                                                                       // 147
      // Prefix the token to prevent conflicts with existing properties.                                               // 148
                                                                                                                       // 149
      // XXX No `String.trim` on Safari 4. Swap out $.trim if we want to                                               // 150
      // remove strong dep on jquery.                                                                                  // 151
      tokens[' ' + match[1]] = match[0].trim ?                                                                         // 152
        match[0].trim() : $.trim(match[0]);                                                                            // 153
                                                                                                                       // 154
      match = regex.exec(attrString);                                                                                  // 155
    }                                                                                                                  // 156
                                                                                                                       // 157
    return tokens;                                                                                                     // 158
  }                                                                                                                    // 159
});                                                                                                                    // 160
                                                                                                                       // 161
var BooleanHandler = AttributeHandler.extend({                                                                         // 162
  update: function (element, oldValue, value) {                                                                        // 163
    var name = this.name;                                                                                              // 164
    if (value == null) {                                                                                               // 165
      if (oldValue != null)                                                                                            // 166
        element[name] = false;                                                                                         // 167
    } else {                                                                                                           // 168
      element[name] = true;                                                                                            // 169
    }                                                                                                                  // 170
  }                                                                                                                    // 171
});                                                                                                                    // 172
                                                                                                                       // 173
var DOMPropertyHandler = AttributeHandler.extend({                                                                     // 174
  update: function (element, oldValue, value) {                                                                        // 175
    var name = this.name;                                                                                              // 176
    if (value !== element[name])                                                                                       // 177
      element[name] = value;                                                                                           // 178
  }                                                                                                                    // 179
});                                                                                                                    // 180
                                                                                                                       // 181
// attributes of the type 'xlink:something' should be set using                                                        // 182
// the correct namespace in order to work                                                                              // 183
var XlinkHandler = AttributeHandler.extend({                                                                           // 184
  update: function(element, oldValue, value) {                                                                         // 185
    var NS = 'http://www.w3.org/1999/xlink';                                                                           // 186
    if (value === null) {                                                                                              // 187
      if (oldValue !== null)                                                                                           // 188
        element.removeAttributeNS(NS, this.name);                                                                      // 189
    } else {                                                                                                           // 190
      element.setAttributeNS(NS, this.name, this.value);                                                               // 191
    }                                                                                                                  // 192
  }                                                                                                                    // 193
});                                                                                                                    // 194
                                                                                                                       // 195
// cross-browser version of `instanceof SVGElement`                                                                    // 196
var isSVGElement = function (elem) {                                                                                   // 197
  return 'ownerSVGElement' in elem;                                                                                    // 198
};                                                                                                                     // 199
                                                                                                                       // 200
var isUrlAttribute = function (tagName, attrName) {                                                                    // 201
  // Compiled from http://www.w3.org/TR/REC-html40/index/attributes.html                                               // 202
  // and                                                                                                               // 203
  // http://www.w3.org/html/wg/drafts/html/master/index.html#attributes-1                                              // 204
  var urlAttrs = {                                                                                                     // 205
    FORM: ['action'],                                                                                                  // 206
    BODY: ['background'],                                                                                              // 207
    BLOCKQUOTE: ['cite'],                                                                                              // 208
    Q: ['cite'],                                                                                                       // 209
    DEL: ['cite'],                                                                                                     // 210
    INS: ['cite'],                                                                                                     // 211
    OBJECT: ['classid', 'codebase', 'data', 'usemap'],                                                                 // 212
    APPLET: ['codebase'],                                                                                              // 213
    A: ['href'],                                                                                                       // 214
    AREA: ['href'],                                                                                                    // 215
    LINK: ['href'],                                                                                                    // 216
    BASE: ['href'],                                                                                                    // 217
    IMG: ['longdesc', 'src', 'usemap'],                                                                                // 218
    FRAME: ['longdesc', 'src'],                                                                                        // 219
    IFRAME: ['longdesc', 'src'],                                                                                       // 220
    HEAD: ['profile'],                                                                                                 // 221
    SCRIPT: ['src'],                                                                                                   // 222
    INPUT: ['src', 'usemap', 'formaction'],                                                                            // 223
    BUTTON: ['formaction'],                                                                                            // 224
    BASE: ['href'],                                                                                                    // 225
    MENUITEM: ['icon'],                                                                                                // 226
    HTML: ['manifest'],                                                                                                // 227
    VIDEO: ['poster']                                                                                                  // 228
  };                                                                                                                   // 229
                                                                                                                       // 230
  if (attrName === 'itemid') {                                                                                         // 231
    return true;                                                                                                       // 232
  }                                                                                                                    // 233
                                                                                                                       // 234
  var urlAttrNames = urlAttrs[tagName] || [];                                                                          // 235
  return _.contains(urlAttrNames, attrName);                                                                           // 236
};                                                                                                                     // 237
                                                                                                                       // 238
// To get the protocol for a URL, we let the browser normalize it for                                                  // 239
// us, by setting it as the href for an anchor tag and then reading out                                                // 240
// the 'protocol' property.                                                                                            // 241
if (Meteor.isClient) {                                                                                                 // 242
  var anchorForNormalization = document.createElement('A');                                                            // 243
}                                                                                                                      // 244
                                                                                                                       // 245
var getUrlProtocol = function (url) {                                                                                  // 246
  if (Meteor.isClient) {                                                                                               // 247
    anchorForNormalization.href = url;                                                                                 // 248
    return (anchorForNormalization.protocol || "").toLowerCase();                                                      // 249
  } else {                                                                                                             // 250
    throw new Error('getUrlProtocol not implemented on the server');                                                   // 251
  }                                                                                                                    // 252
};                                                                                                                     // 253
                                                                                                                       // 254
// UrlHandler is an attribute handler for all HTML attributes that take                                                // 255
// URL values. It disallows javascript: URLs, unless                                                                   // 256
// Blaze._allowJavascriptUrls() has been called. To detect javascript:                                                 // 257
// urls, we set the attribute on a dummy anchor element and then read                                                  // 258
// out the 'protocol' property of the attribute.                                                                       // 259
var origUpdate = AttributeHandler.prototype.update;                                                                    // 260
var UrlHandler = AttributeHandler.extend({                                                                             // 261
  update: function (element, oldValue, value) {                                                                        // 262
    var self = this;                                                                                                   // 263
    var args = arguments;                                                                                              // 264
                                                                                                                       // 265
    if (Blaze._javascriptUrlsAllowed()) {                                                                              // 266
      origUpdate.apply(self, args);                                                                                    // 267
    } else {                                                                                                           // 268
      var isJavascriptProtocol = (getUrlProtocol(value) === "javascript:");                                            // 269
      if (isJavascriptProtocol) {                                                                                      // 270
        Blaze._warn("URLs that use the 'javascript:' protocol are not " +                                              // 271
                    "allowed in URL attribute values. " +                                                              // 272
                    "Call Blaze._allowJavascriptUrls() " +                                                             // 273
                    "to enable them.");                                                                                // 274
        origUpdate.apply(self, [element, oldValue, null]);                                                             // 275
      } else {                                                                                                         // 276
        origUpdate.apply(self, args);                                                                                  // 277
      }                                                                                                                // 278
    }                                                                                                                  // 279
  }                                                                                                                    // 280
});                                                                                                                    // 281
                                                                                                                       // 282
// XXX make it possible for users to register attribute handlers!                                                      // 283
makeAttributeHandler = function (elem, name, value) {                                                                  // 284
  // generally, use setAttribute but certain attributes need to be set                                                 // 285
  // by directly setting a JavaScript property on the DOM element.                                                     // 286
  if (name === 'class') {                                                                                              // 287
    if (isSVGElement(elem)) {                                                                                          // 288
      return new SVGClassHandler(name, value);                                                                         // 289
    } else {                                                                                                           // 290
      return new ClassHandler(name, value);                                                                            // 291
    }                                                                                                                  // 292
  } else if (name === 'style') {                                                                                       // 293
    return new StyleHandler(name, value);                                                                              // 294
  } else if ((elem.tagName === 'OPTION' && name === 'selected') ||                                                     // 295
             (elem.tagName === 'INPUT' && name === 'checked')) {                                                       // 296
    return new BooleanHandler(name, value);                                                                            // 297
  } else if ((elem.tagName === 'TEXTAREA' || elem.tagName === 'INPUT')                                                 // 298
             && name === 'value') {                                                                                    // 299
    // internally, TEXTAREAs tracks their value in the 'value'                                                         // 300
    // attribute just like INPUTs.                                                                                     // 301
    return new DOMPropertyHandler(name, value);                                                                        // 302
  } else if (name.substring(0,6) === 'xlink:') {                                                                       // 303
    return new XlinkHandler(name.substring(6), value);                                                                 // 304
  } else if (isUrlAttribute(elem.tagName, name)) {                                                                     // 305
    return new UrlHandler(name, value);                                                                                // 306
  } else {                                                                                                             // 307
    return new AttributeHandler(name, value);                                                                          // 308
  }                                                                                                                    // 309
                                                                                                                       // 310
  // XXX will need one for 'style' on IE, though modern browsers                                                       // 311
  // seem to handle setAttribute ok.                                                                                   // 312
};                                                                                                                     // 313
                                                                                                                       // 314
                                                                                                                       // 315
ElementAttributesUpdater = function (elem) {                                                                           // 316
  this.elem = elem;                                                                                                    // 317
  this.handlers = {};                                                                                                  // 318
};                                                                                                                     // 319
                                                                                                                       // 320
// Update attributes on `elem` to the dictionary `attrs`, whose                                                        // 321
// values are strings.                                                                                                 // 322
ElementAttributesUpdater.prototype.update = function(newAttrs) {                                                       // 323
  var elem = this.elem;                                                                                                // 324
  var handlers = this.handlers;                                                                                        // 325
                                                                                                                       // 326
  for (var k in handlers) {                                                                                            // 327
    if (! _.has(newAttrs, k)) {                                                                                        // 328
      // remove attributes (and handlers) for attribute names                                                          // 329
      // that don't exist as keys of `newAttrs` and so won't                                                           // 330
      // be visited when traversing it.  (Attributes that                                                              // 331
      // exist in the `newAttrs` object but are `null`                                                                 // 332
      // are handled later.)                                                                                           // 333
      var handler = handlers[k];                                                                                       // 334
      var oldValue = handler.value;                                                                                    // 335
      handler.value = null;                                                                                            // 336
      handler.update(elem, oldValue, null);                                                                            // 337
      delete handlers[k];                                                                                              // 338
    }                                                                                                                  // 339
  }                                                                                                                    // 340
                                                                                                                       // 341
  for (var k in newAttrs) {                                                                                            // 342
    var handler = null;                                                                                                // 343
    var oldValue;                                                                                                      // 344
    var value = newAttrs[k];                                                                                           // 345
    if (! _.has(handlers, k)) {                                                                                        // 346
      if (value !== null) {                                                                                            // 347
        // make new handler                                                                                            // 348
        handler = makeAttributeHandler(elem, k, value);                                                                // 349
        handlers[k] = handler;                                                                                         // 350
        oldValue = null;                                                                                               // 351
      }                                                                                                                // 352
    } else {                                                                                                           // 353
      handler = handlers[k];                                                                                           // 354
      oldValue = handler.value;                                                                                        // 355
    }                                                                                                                  // 356
    if (oldValue !== value) {                                                                                          // 357
      handler.value = value;                                                                                           // 358
      handler.update(elem, oldValue, value);                                                                           // 359
      if (value === null)                                                                                              // 360
        delete handlers[k];                                                                                            // 361
    }                                                                                                                  // 362
  }                                                                                                                    // 363
};                                                                                                                     // 364
                                                                                                                       // 365
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/blaze/materializer.js                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// Turns HTMLjs into DOM nodes and DOMRanges.                                                                          // 1
//                                                                                                                     // 2
// - `htmljs`: the value to materialize, which may be any of the htmljs                                                // 3
//   types (Tag, CharRef, Comment, Raw, array, string, boolean, number,                                                // 4
//   null, or undefined) or a View or Template (which will be used to                                                  // 5
//   construct a View).                                                                                                // 6
// - `intoArray`: the array of DOM nodes and DOMRanges to push the output                                              // 7
//   into (required)                                                                                                   // 8
// - `parentView`: the View we are materializing content for (optional)                                                // 9
// - `_existingWorkStack`: optional argument, only used for recursive                                                  // 10
//   calls when there is some other _materializeDOM on the call stack.                                                 // 11
//   If _materializeDOM called your function and passed in a workStack,                                                // 12
//   pass it back when you call _materializeDOM (such as from a workStack                                              // 13
//   task).                                                                                                            // 14
//                                                                                                                     // 15
// Returns `intoArray`, which is especially useful if you pass in `[]`.                                                // 16
Blaze._materializeDOM = function (htmljs, intoArray, parentView,                                                       // 17
                                  _existingWorkStack) {                                                                // 18
  // In order to use fewer stack frames, materializeDOMInner can push                                                  // 19
  // tasks onto `workStack`, and they will be popped off                                                               // 20
  // and run, last first, after materializeDOMInner returns.  The                                                      // 21
  // reason we use a stack instead of a queue is so that we recurse                                                    // 22
  // depth-first, doing newer tasks first.                                                                             // 23
  var workStack = (_existingWorkStack || []);                                                                          // 24
  materializeDOMInner(htmljs, intoArray, parentView, workStack);                                                       // 25
                                                                                                                       // 26
  if (! _existingWorkStack) {                                                                                          // 27
    // We created the work stack, so we are responsible for finishing                                                  // 28
    // the work.  Call each "task" function, starting with the top                                                     // 29
    // of the stack.                                                                                                   // 30
    while (workStack.length) {                                                                                         // 31
      // Note that running task() may push new items onto workStack.                                                   // 32
      var task = workStack.pop();                                                                                      // 33
      task();                                                                                                          // 34
    }                                                                                                                  // 35
  }                                                                                                                    // 36
                                                                                                                       // 37
  return intoArray;                                                                                                    // 38
};                                                                                                                     // 39
                                                                                                                       // 40
var materializeDOMInner = function (htmljs, intoArray, parentView, workStack) {                                        // 41
  if (htmljs == null) {                                                                                                // 42
    // null or undefined                                                                                               // 43
    return;                                                                                                            // 44
  }                                                                                                                    // 45
                                                                                                                       // 46
  switch (typeof htmljs) {                                                                                             // 47
  case 'string': case 'boolean': case 'number':                                                                        // 48
    intoArray.push(document.createTextNode(String(htmljs)));                                                           // 49
    return;                                                                                                            // 50
  case 'object':                                                                                                       // 51
    if (htmljs.htmljsType) {                                                                                           // 52
      switch (htmljs.htmljsType) {                                                                                     // 53
      case HTML.Tag.htmljsType:                                                                                        // 54
        intoArray.push(materializeTag(htmljs, parentView, workStack));                                                 // 55
        return;                                                                                                        // 56
      case HTML.CharRef.htmljsType:                                                                                    // 57
        intoArray.push(document.createTextNode(htmljs.str));                                                           // 58
        return;                                                                                                        // 59
      case HTML.Comment.htmljsType:                                                                                    // 60
        intoArray.push(document.createComment(htmljs.sanitizedValue));                                                 // 61
        return;                                                                                                        // 62
      case HTML.Raw.htmljsType:                                                                                        // 63
        // Get an array of DOM nodes by using the browser's HTML parser                                                // 64
        // (like innerHTML).                                                                                           // 65
        var nodes = Blaze._DOMBackend.parseHTML(htmljs.value);                                                         // 66
        for (var i = 0; i < nodes.length; i++)                                                                         // 67
          intoArray.push(nodes[i]);                                                                                    // 68
        return;                                                                                                        // 69
      }                                                                                                                // 70
    } else if (HTML.isArray(htmljs)) {                                                                                 // 71
      for (var i = htmljs.length-1; i >= 0; i--) {                                                                     // 72
        workStack.push(_.bind(Blaze._materializeDOM, null,                                                             // 73
                              htmljs[i], intoArray, parentView, workStack));                                           // 74
      }                                                                                                                // 75
      return;                                                                                                          // 76
    } else {                                                                                                           // 77
      if (htmljs instanceof Blaze.Template) {                                                                          // 78
        htmljs = htmljs.constructView();                                                                               // 79
        // fall through to Blaze.View case below                                                                       // 80
      }                                                                                                                // 81
      if (htmljs instanceof Blaze.View) {                                                                              // 82
        Blaze._materializeView(htmljs, parentView, workStack, intoArray);                                              // 83
        return;                                                                                                        // 84
      }                                                                                                                // 85
    }                                                                                                                  // 86
  }                                                                                                                    // 87
                                                                                                                       // 88
  throw new Error("Unexpected object in htmljs: " + htmljs);                                                           // 89
};                                                                                                                     // 90
                                                                                                                       // 91
var materializeTag = function (tag, parentView, workStack) {                                                           // 92
  var tagName = tag.tagName;                                                                                           // 93
  var elem;                                                                                                            // 94
  if ((HTML.isKnownSVGElement(tagName) || isSVGAnchor(tag))                                                            // 95
      && document.createElementNS) {                                                                                   // 96
    // inline SVG                                                                                                      // 97
    elem = document.createElementNS('http://www.w3.org/2000/svg', tagName);                                            // 98
  } else {                                                                                                             // 99
    // normal elements                                                                                                 // 100
    elem = document.createElement(tagName);                                                                            // 101
  }                                                                                                                    // 102
                                                                                                                       // 103
  var rawAttrs = tag.attrs;                                                                                            // 104
  var children = tag.children;                                                                                         // 105
  if (tagName === 'textarea' && tag.children.length &&                                                                 // 106
      ! (rawAttrs && ('value' in rawAttrs))) {                                                                         // 107
    // Provide very limited support for TEXTAREA tags with children                                                    // 108
    // rather than a "value" attribute.                                                                                // 109
    // Reactivity in the form of Views nested in the tag's children                                                    // 110
    // won't work.  Compilers should compile textarea contents into                                                    // 111
    // the "value" attribute of the tag, wrapped in a function if there                                                // 112
    // is reactivity.                                                                                                  // 113
    if (typeof rawAttrs === 'function' ||                                                                              // 114
        HTML.isArray(rawAttrs)) {                                                                                      // 115
      throw new Error("Can't have reactive children of TEXTAREA node; " +                                              // 116
                      "use the 'value' attribute instead.");                                                           // 117
    }                                                                                                                  // 118
    rawAttrs = _.extend({}, rawAttrs || null);                                                                         // 119
    rawAttrs.value = Blaze._expand(children, parentView);                                                              // 120
    children = [];                                                                                                     // 121
  }                                                                                                                    // 122
                                                                                                                       // 123
  if (rawAttrs) {                                                                                                      // 124
    var attrUpdater = new ElementAttributesUpdater(elem);                                                              // 125
    var updateAttributes = function () {                                                                               // 126
      var expandedAttrs = Blaze._expandAttributes(rawAttrs, parentView);                                               // 127
      var flattenedAttrs = HTML.flattenAttributes(expandedAttrs);                                                      // 128
      var stringAttrs = {};                                                                                            // 129
      for (var attrName in flattenedAttrs) {                                                                           // 130
        stringAttrs[attrName] = Blaze._toText(flattenedAttrs[attrName],                                                // 131
                                              parentView,                                                              // 132
                                              HTML.TEXTMODE.STRING);                                                   // 133
      }                                                                                                                // 134
      attrUpdater.update(stringAttrs);                                                                                 // 135
    };                                                                                                                 // 136
    var updaterComputation;                                                                                            // 137
    if (parentView) {                                                                                                  // 138
      updaterComputation =                                                                                             // 139
        parentView.autorun(updateAttributes, undefined, 'updater');                                                    // 140
    } else {                                                                                                           // 141
      updaterComputation = Tracker.nonreactive(function () {                                                           // 142
        return Tracker.autorun(function () {                                                                           // 143
          Tracker._withCurrentView(parentView, updateAttributes);                                                      // 144
        });                                                                                                            // 145
      });                                                                                                              // 146
    }                                                                                                                  // 147
    Blaze._DOMBackend.Teardown.onElementTeardown(elem, function attrTeardown() {                                       // 148
      updaterComputation.stop();                                                                                       // 149
    });                                                                                                                // 150
  }                                                                                                                    // 151
                                                                                                                       // 152
  if (children.length) {                                                                                               // 153
    var childNodesAndRanges = [];                                                                                      // 154
    // push this function first so that it's done last                                                                 // 155
    workStack.push(function () {                                                                                       // 156
      for (var i = 0; i < childNodesAndRanges.length; i++) {                                                           // 157
        var x = childNodesAndRanges[i];                                                                                // 158
        if (x instanceof Blaze._DOMRange)                                                                              // 159
          x.attach(elem);                                                                                              // 160
        else                                                                                                           // 161
          elem.appendChild(x);                                                                                         // 162
      }                                                                                                                // 163
    });                                                                                                                // 164
    // now push the task that calculates childNodesAndRanges                                                           // 165
    workStack.push(_.bind(Blaze._materializeDOM, null,                                                                 // 166
                          children, childNodesAndRanges, parentView,                                                   // 167
                          workStack));                                                                                 // 168
  }                                                                                                                    // 169
                                                                                                                       // 170
  return elem;                                                                                                         // 171
};                                                                                                                     // 172
                                                                                                                       // 173
                                                                                                                       // 174
var isSVGAnchor = function (node) {                                                                                    // 175
  // We generally aren't able to detect SVG <a> elements because                                                       // 176
  // if "A" were in our list of known svg element names, then all                                                      // 177
  // <a> nodes would be created using                                                                                  // 178
  // `document.createElementNS`. But in the special case of <a                                                         // 179
  // xlink:href="...">, we can at least detect that attribute and                                                      // 180
  // create an SVG <a> tag in that case.                                                                               // 181
  //                                                                                                                   // 182
  // However, we still have a general problem of knowing when to                                                       // 183
  // use document.createElementNS and when to use                                                                      // 184
  // document.createElement; for example, font tags will always                                                        // 185
  // be created as SVG elements which can cause other                                                                  // 186
  // problems. #1977                                                                                                   // 187
  return (node.tagName === "a" &&                                                                                      // 188
          node.attrs &&                                                                                                // 189
          node.attrs["xlink:href"] !== undefined);                                                                     // 190
};                                                                                                                     // 191
                                                                                                                       // 192
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/blaze/exceptions.js                                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var debugFunc;                                                                                                         // 1
                                                                                                                       // 2
// We call into user code in many places, and it's nice to catch exceptions                                            // 3
// propagated from user code immediately so that the whole system doesn't just                                         // 4
// break.  Catching exceptions is easy; reporting them is hard.  This helper                                           // 5
// reports exceptions.                                                                                                 // 6
//                                                                                                                     // 7
// Usage:                                                                                                              // 8
//                                                                                                                     // 9
// ```                                                                                                                 // 10
// try {                                                                                                               // 11
//   // ... someStuff ...                                                                                              // 12
// } catch (e) {                                                                                                       // 13
//   reportUIException(e);                                                                                             // 14
// }                                                                                                                   // 15
// ```                                                                                                                 // 16
//                                                                                                                     // 17
// An optional second argument overrides the default message.                                                          // 18
                                                                                                                       // 19
// Set this to `true` to cause `reportException` to throw                                                              // 20
// the next exception rather than reporting it.  This is                                                               // 21
// useful in unit tests that test error messages.                                                                      // 22
Blaze._throwNextException = false;                                                                                     // 23
                                                                                                                       // 24
Blaze._reportException = function (e, msg) {                                                                           // 25
  if (Blaze._throwNextException) {                                                                                     // 26
    Blaze._throwNextException = false;                                                                                 // 27
    throw e;                                                                                                           // 28
  }                                                                                                                    // 29
                                                                                                                       // 30
  if (! debugFunc)                                                                                                     // 31
    // adapted from Tracker                                                                                            // 32
    debugFunc = function () {                                                                                          // 33
      return (typeof Meteor !== "undefined" ? Meteor._debug :                                                          // 34
              ((typeof console !== "undefined") && console.log ? console.log :                                         // 35
               function () {}));                                                                                       // 36
    };                                                                                                                 // 37
                                                                                                                       // 38
  // In Chrome, `e.stack` is a multiline string that starts with the message                                           // 39
  // and contains a stack trace.  Furthermore, `console.log` makes it clickable.                                       // 40
  // `console.log` supplies the space between the two arguments.                                                       // 41
  debugFunc()(msg || 'Exception caught in template:', e.stack || e.message || e);                                      // 42
};                                                                                                                     // 43
                                                                                                                       // 44
Blaze._wrapCatchingExceptions = function (f, where) {                                                                  // 45
  if (typeof f !== 'function')                                                                                         // 46
    return f;                                                                                                          // 47
                                                                                                                       // 48
  return function () {                                                                                                 // 49
    try {                                                                                                              // 50
      return f.apply(this, arguments);                                                                                 // 51
    } catch (e) {                                                                                                      // 52
      Blaze._reportException(e, 'Exception in ' + where + ':');                                                        // 53
    }                                                                                                                  // 54
  };                                                                                                                   // 55
};                                                                                                                     // 56
                                                                                                                       // 57
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/blaze/view.js                                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/// [new] Blaze.View([name], renderMethod)                                                                             // 1
///                                                                                                                    // 2
/// Blaze.View is the building block of reactive DOM.  Views have                                                      // 3
/// the following features:                                                                                            // 4
///                                                                                                                    // 5
/// * lifecycle callbacks - Views are created, rendered, and destroyed,                                                // 6
///   and callbacks can be registered to fire when these things happen.                                                // 7
///                                                                                                                    // 8
/// * parent pointer - A View points to its parentView, which is the                                                   // 9
///   View that caused it to be rendered.  These pointers form a                                                       // 10
///   hierarchy or tree of Views.                                                                                      // 11
///                                                                                                                    // 12
/// * render() method - A View's render() method specifies the DOM                                                     // 13
///   (or HTML) content of the View.  If the method establishes                                                        // 14
///   reactive dependencies, it may be re-run.                                                                         // 15
///                                                                                                                    // 16
/// * a DOMRange - If a View is rendered to DOM, its position and                                                      // 17
///   extent in the DOM are tracked using a DOMRange object.                                                           // 18
///                                                                                                                    // 19
/// When a View is constructed by calling Blaze.View, the View is                                                      // 20
/// not yet considered "created."  It doesn't have a parentView yet,                                                   // 21
/// and no logic has been run to initialize the View.  All real                                                        // 22
/// work is deferred until at least creation time, when the onViewCreated                                              // 23
/// callbacks are fired, which happens when the View is "used" in                                                      // 24
/// some way that requires it to be rendered.                                                                          // 25
///                                                                                                                    // 26
/// ...more lifecycle stuff                                                                                            // 27
///                                                                                                                    // 28
/// `name` is an optional string tag identifying the View.  The only                                                   // 29
/// time it's used is when looking in the View tree for a View of a                                                    // 30
/// particular name; for example, data contexts are stored on Views                                                    // 31
/// of name "with".  Names are also useful when debugging, so in                                                       // 32
/// general it's good for functions that create Views to set the name.                                                 // 33
/// Views associated with templates have names of the form "Template.foo".                                             // 34
                                                                                                                       // 35
/**                                                                                                                    // 36
 * @class                                                                                                              // 37
 * @summary Constructor for a View, which represents a reactive region of DOM.                                         // 38
 * @locus Client                                                                                                       // 39
 * @param {String} [name] Optional.  A name for this type of View.  See [`view.name`](#view_name).                     // 40
 * @param {Function} renderFunction A function that returns [*renderable content*](#renderable_content).  In this function, `this` is bound to the View.
 */                                                                                                                    // 42
Blaze.View = function (name, render) {                                                                                 // 43
  if (! (this instanceof Blaze.View))                                                                                  // 44
    // called without `new`                                                                                            // 45
    return new Blaze.View(name, render);                                                                               // 46
                                                                                                                       // 47
  if (typeof name === 'function') {                                                                                    // 48
    // omitted "name" argument                                                                                         // 49
    render = name;                                                                                                     // 50
    name = '';                                                                                                         // 51
  }                                                                                                                    // 52
  this.name = name;                                                                                                    // 53
  this._render = render;                                                                                               // 54
                                                                                                                       // 55
  this._callbacks = {                                                                                                  // 56
    created: null,                                                                                                     // 57
    rendered: null,                                                                                                    // 58
    destroyed: null                                                                                                    // 59
  };                                                                                                                   // 60
                                                                                                                       // 61
  // Setting all properties here is good for readability,                                                              // 62
  // and also may help Chrome optimize the code by keeping                                                             // 63
  // the View object from changing shape too much.                                                                     // 64
  this.isCreated = false;                                                                                              // 65
  this._isCreatedForExpansion = false;                                                                                 // 66
  this.isRendered = false;                                                                                             // 67
  this._isAttached = false;                                                                                            // 68
  this.isDestroyed = false;                                                                                            // 69
  this._isInRender = false;                                                                                            // 70
  this.parentView = null;                                                                                              // 71
  this._domrange = null;                                                                                               // 72
  // This flag is normally set to false except for the cases when view's parent                                        // 73
  // was generated as part of expanding some syntactic sugar expressions or                                            // 74
  // methods.                                                                                                          // 75
  // Ex.: Blaze.renderWithData is an equivalent to creating a view with regular                                        // 76
  // Blaze.render and wrapping it into {{#with data}}{{/with}} view. Since the                                         // 77
  // users don't know anything about these generated parent views, Blaze needs                                         // 78
  // this information to be available on views to make smarter decisions. For                                          // 79
  // example: removing the generated parent view with the view on Blaze.remove.                                        // 80
  this._hasGeneratedParent = false;                                                                                    // 81
  // Bindings accessible to children views (via view.lookup('name')) within the                                        // 82
  // closest template view.                                                                                            // 83
  this._scopeBindings = {};                                                                                            // 84
                                                                                                                       // 85
  this.renderCount = 0;                                                                                                // 86
};                                                                                                                     // 87
                                                                                                                       // 88
Blaze.View.prototype._render = function () { return null; };                                                           // 89
                                                                                                                       // 90
Blaze.View.prototype.onViewCreated = function (cb) {                                                                   // 91
  this._callbacks.created = this._callbacks.created || [];                                                             // 92
  this._callbacks.created.push(cb);                                                                                    // 93
};                                                                                                                     // 94
                                                                                                                       // 95
Blaze.View.prototype._onViewRendered = function (cb) {                                                                 // 96
  this._callbacks.rendered = this._callbacks.rendered || [];                                                           // 97
  this._callbacks.rendered.push(cb);                                                                                   // 98
};                                                                                                                     // 99
                                                                                                                       // 100
Blaze.View.prototype.onViewReady = function (cb) {                                                                     // 101
  var self = this;                                                                                                     // 102
  var fire = function () {                                                                                             // 103
    Tracker.afterFlush(function () {                                                                                   // 104
      if (! self.isDestroyed) {                                                                                        // 105
        Blaze._withCurrentView(self, function () {                                                                     // 106
          cb.call(self);                                                                                               // 107
        });                                                                                                            // 108
      }                                                                                                                // 109
    });                                                                                                                // 110
  };                                                                                                                   // 111
  self._onViewRendered(function onViewRendered() {                                                                     // 112
    if (self.isDestroyed)                                                                                              // 113
      return;                                                                                                          // 114
    if (! self._domrange.attached)                                                                                     // 115
      self._domrange.onAttached(fire);                                                                                 // 116
    else                                                                                                               // 117
      fire();                                                                                                          // 118
  });                                                                                                                  // 119
};                                                                                                                     // 120
                                                                                                                       // 121
Blaze.View.prototype.onViewDestroyed = function (cb) {                                                                 // 122
  this._callbacks.destroyed = this._callbacks.destroyed || [];                                                         // 123
  this._callbacks.destroyed.push(cb);                                                                                  // 124
};                                                                                                                     // 125
Blaze.View.prototype.removeViewDestroyedListener = function (cb) {                                                     // 126
  var destroyed = this._callbacks.destroyed;                                                                           // 127
  if (! destroyed)                                                                                                     // 128
    return;                                                                                                            // 129
  var index = _.lastIndexOf(destroyed, cb);                                                                            // 130
  if (index !== -1) {                                                                                                  // 131
    // XXX You'd think the right thing to do would be splice, but _fireCallbacks                                       // 132
    // gets sad if you remove callbacks while iterating over the list.  Should                                         // 133
    // change this to use callback-hook or EventEmitter or something else that                                         // 134
    // properly supports removal.                                                                                      // 135
    destroyed[index] = null;                                                                                           // 136
  }                                                                                                                    // 137
};                                                                                                                     // 138
                                                                                                                       // 139
/// View#autorun(func)                                                                                                 // 140
///                                                                                                                    // 141
/// Sets up a Tracker autorun that is "scoped" to this View in two                                                     // 142
/// important ways: 1) Blaze.currentView is automatically set                                                          // 143
/// on every re-run, and 2) the autorun is stopped when the                                                            // 144
/// View is destroyed.  As with Tracker.autorun, the first run of                                                      // 145
/// the function is immediate, and a Computation object that can                                                       // 146
/// be used to stop the autorun is returned.                                                                           // 147
///                                                                                                                    // 148
/// View#autorun is meant to be called from View callbacks like                                                        // 149
/// onViewCreated, or from outside the rendering process.  It may not                                                  // 150
/// be called before the onViewCreated callbacks are fired (too early),                                                // 151
/// or from a render() method (too confusing).                                                                         // 152
///                                                                                                                    // 153
/// Typically, autoruns that update the state                                                                          // 154
/// of the View (as in Blaze.With) should be started from an onViewCreated                                             // 155
/// callback.  Autoruns that update the DOM should be started                                                          // 156
/// from either onViewCreated (guarded against the absence of                                                          // 157
/// view._domrange), or onViewReady.                                                                                   // 158
Blaze.View.prototype.autorun = function (f, _inViewScope, displayName) {                                               // 159
  var self = this;                                                                                                     // 160
                                                                                                                       // 161
  // The restrictions on when View#autorun can be called are in order                                                  // 162
  // to avoid bad patterns, like creating a Blaze.View and immediately                                                 // 163
  // calling autorun on it.  A freshly created View is not ready to                                                    // 164
  // have logic run on it; it doesn't have a parentView, for example.                                                  // 165
  // It's when the View is materialized or expanded that the onViewCreated                                             // 166
  // handlers are fired and the View starts up.                                                                        // 167
  //                                                                                                                   // 168
  // Letting the render() method call `this.autorun()` is problematic                                                  // 169
  // because of re-render.  The best we can do is to stop the old                                                      // 170
  // autorun and start a new one for each render, but that's a pattern                                                 // 171
  // we try to avoid internally because it leads to helpers being                                                      // 172
  // called extra times, in the case where the autorun causes the                                                      // 173
  // view to re-render (and thus the autorun to be torn down and a                                                     // 174
  // new one established).                                                                                             // 175
  //                                                                                                                   // 176
  // We could lift these restrictions in various ways.  One interesting                                                // 177
  // idea is to allow you to call `view.autorun` after instantiating                                                   // 178
  // `view`, and automatically wrap it in `view.onViewCreated`, deferring                                              // 179
  // the autorun so that it starts at an appropriate time.  However,                                                   // 180
  // then we can't return the Computation object to the caller, because                                                // 181
  // it doesn't exist yet.                                                                                             // 182
  if (! self.isCreated) {                                                                                              // 183
    throw new Error("View#autorun must be called from the created callback at the earliest");                          // 184
  }                                                                                                                    // 185
  if (this._isInRender) {                                                                                              // 186
    throw new Error("Can't call View#autorun from inside render(); try calling it from the created or rendered callback");
  }                                                                                                                    // 188
  if (Tracker.active) {                                                                                                // 189
    throw new Error("Can't call View#autorun from a Tracker Computation; try calling it from the created or rendered callback");
  }                                                                                                                    // 191
                                                                                                                       // 192
  var templateInstanceFunc = Blaze.Template._currentTemplateInstanceFunc;                                              // 193
                                                                                                                       // 194
  var func = function viewAutorun(c) {                                                                                 // 195
    return Blaze._withCurrentView(_inViewScope || self, function () {                                                  // 196
      return Blaze.Template._withTemplateInstanceFunc(                                                                 // 197
        templateInstanceFunc, function () {                                                                            // 198
          return f.call(self, c);                                                                                      // 199
        });                                                                                                            // 200
    });                                                                                                                // 201
  };                                                                                                                   // 202
                                                                                                                       // 203
  // Give the autorun function a better name for debugging and profiling.                                              // 204
  // The `displayName` property is not part of the spec but browsers like Chrome                                       // 205
  // and Firefox prefer it in debuggers over the name function was declared by.                                        // 206
  func.displayName =                                                                                                   // 207
    (self.name || 'anonymous') + ':' + (displayName || 'anonymous');                                                   // 208
  var comp = Tracker.autorun(func);                                                                                    // 209
                                                                                                                       // 210
  var stopComputation = function () { comp.stop(); };                                                                  // 211
  self.onViewDestroyed(stopComputation);                                                                               // 212
  comp.onStop(function () {                                                                                            // 213
    self.removeViewDestroyedListener(stopComputation);                                                                 // 214
  });                                                                                                                  // 215
                                                                                                                       // 216
  return comp;                                                                                                         // 217
};                                                                                                                     // 218
                                                                                                                       // 219
Blaze.View.prototype._errorIfShouldntCallSubscribe = function () {                                                     // 220
  var self = this;                                                                                                     // 221
                                                                                                                       // 222
  if (! self.isCreated) {                                                                                              // 223
    throw new Error("View#subscribe must be called from the created callback at the earliest");                        // 224
  }                                                                                                                    // 225
  if (self._isInRender) {                                                                                              // 226
    throw new Error("Can't call View#subscribe from inside render(); try calling it from the created or rendered callback");
  }                                                                                                                    // 228
  if (self.isDestroyed) {                                                                                              // 229
    throw new Error("Can't call View#subscribe from inside the destroyed callback, try calling it inside created or rendered.");
  }                                                                                                                    // 231
};                                                                                                                     // 232
                                                                                                                       // 233
/**                                                                                                                    // 234
 * Just like Blaze.View#autorun, but with Meteor.subscribe instead of                                                  // 235
 * Tracker.autorun. Stop the subscription when the view is destroyed.                                                  // 236
 * @return {SubscriptionHandle} A handle to the subscription so that you can                                           // 237
 * see if it is ready, or stop it manually                                                                             // 238
 */                                                                                                                    // 239
Blaze.View.prototype.subscribe = function (args, options) {                                                            // 240
  var self = this;                                                                                                     // 241
  options = options || {};                                                                                             // 242
                                                                                                                       // 243
  self._errorIfShouldntCallSubscribe();                                                                                // 244
                                                                                                                       // 245
  var subHandle;                                                                                                       // 246
  if (options.connection) {                                                                                            // 247
    subHandle = options.connection.subscribe.apply(options.connection, args);                                          // 248
  } else {                                                                                                             // 249
    subHandle = Meteor.subscribe.apply(Meteor, args);                                                                  // 250
  }                                                                                                                    // 251
                                                                                                                       // 252
  self.onViewDestroyed(function () {                                                                                   // 253
    subHandle.stop();                                                                                                  // 254
  });                                                                                                                  // 255
                                                                                                                       // 256
  return subHandle;                                                                                                    // 257
};                                                                                                                     // 258
                                                                                                                       // 259
Blaze.View.prototype.firstNode = function () {                                                                         // 260
  if (! this._isAttached)                                                                                              // 261
    throw new Error("View must be attached before accessing its DOM");                                                 // 262
                                                                                                                       // 263
  return this._domrange.firstNode();                                                                                   // 264
};                                                                                                                     // 265
                                                                                                                       // 266
Blaze.View.prototype.lastNode = function () {                                                                          // 267
  if (! this._isAttached)                                                                                              // 268
    throw new Error("View must be attached before accessing its DOM");                                                 // 269
                                                                                                                       // 270
  return this._domrange.lastNode();                                                                                    // 271
};                                                                                                                     // 272
                                                                                                                       // 273
Blaze._fireCallbacks = function (view, which) {                                                                        // 274
  Blaze._withCurrentView(view, function () {                                                                           // 275
    Tracker.nonreactive(function fireCallbacks() {                                                                     // 276
      var cbs = view._callbacks[which];                                                                                // 277
      for (var i = 0, N = (cbs && cbs.length); i < N; i++)                                                             // 278
        cbs[i] && cbs[i].call(view);                                                                                   // 279
    });                                                                                                                // 280
  });                                                                                                                  // 281
};                                                                                                                     // 282
                                                                                                                       // 283
Blaze._createView = function (view, parentView, forExpansion) {                                                        // 284
  if (view.isCreated)                                                                                                  // 285
    throw new Error("Can't render the same View twice");                                                               // 286
                                                                                                                       // 287
  view.parentView = (parentView || null);                                                                              // 288
  view.isCreated = true;                                                                                               // 289
  if (forExpansion)                                                                                                    // 290
    view._isCreatedForExpansion = true;                                                                                // 291
                                                                                                                       // 292
  Blaze._fireCallbacks(view, 'created');                                                                               // 293
};                                                                                                                     // 294
                                                                                                                       // 295
var doFirstRender = function (view, initialContent) {                                                                  // 296
  var domrange = new Blaze._DOMRange(initialContent);                                                                  // 297
  view._domrange = domrange;                                                                                           // 298
  domrange.view = view;                                                                                                // 299
  view.isRendered = true;                                                                                              // 300
  Blaze._fireCallbacks(view, 'rendered');                                                                              // 301
                                                                                                                       // 302
  var teardownHook = null;                                                                                             // 303
                                                                                                                       // 304
  domrange.onAttached(function attached(range, element) {                                                              // 305
    view._isAttached = true;                                                                                           // 306
                                                                                                                       // 307
    teardownHook = Blaze._DOMBackend.Teardown.onElementTeardown(                                                       // 308
      element, function teardown() {                                                                                   // 309
        Blaze._destroyView(view, true /* _skipNodes */);                                                               // 310
      });                                                                                                              // 311
  });                                                                                                                  // 312
                                                                                                                       // 313
  // tear down the teardown hook                                                                                       // 314
  view.onViewDestroyed(function () {                                                                                   // 315
    teardownHook && teardownHook.stop();                                                                               // 316
    teardownHook = null;                                                                                               // 317
  });                                                                                                                  // 318
                                                                                                                       // 319
  return domrange;                                                                                                     // 320
};                                                                                                                     // 321
                                                                                                                       // 322
// Take an uncreated View `view` and create and render it to DOM,                                                      // 323
// setting up the autorun that updates the View.  Returns a new                                                        // 324
// DOMRange, which has been associated with the View.                                                                  // 325
//                                                                                                                     // 326
// The private arguments `_workStack` and `_intoArray` are passed in                                                   // 327
// by Blaze._materializeDOM and are only present for recursive calls                                                   // 328
// (when there is some other _materializeView on the stack).  If                                                       // 329
// provided, then we avoid the mutual recursion of calling back into                                                   // 330
// Blaze._materializeDOM so that deep View hierarchies don't blow the                                                  // 331
// stack.  Instead, we push tasks onto workStack for the initial                                                       // 332
// rendering and subsequent setup of the View, and they are done after                                                 // 333
// we return.  When there is a _workStack, we do not return the new                                                    // 334
// DOMRange, but instead push it into _intoArray from a _workStack                                                     // 335
// task.                                                                                                               // 336
Blaze._materializeView = function (view, parentView, _workStack, _intoArray) {                                         // 337
  Blaze._createView(view, parentView);                                                                                 // 338
                                                                                                                       // 339
  var domrange;                                                                                                        // 340
  var lastHtmljs;                                                                                                      // 341
  // We don't expect to be called in a Computation, but just in case,                                                  // 342
  // wrap in Tracker.nonreactive.                                                                                      // 343
  Tracker.nonreactive(function () {                                                                                    // 344
    view.autorun(function doRender(c) {                                                                                // 345
      // `view.autorun` sets the current view.                                                                         // 346
      view.renderCount++;                                                                                              // 347
      view._isInRender = true;                                                                                         // 348
      // Any dependencies that should invalidate this Computation come                                                 // 349
      // from this line:                                                                                               // 350
      var htmljs = view._render();                                                                                     // 351
      view._isInRender = false;                                                                                        // 352
                                                                                                                       // 353
      if (! c.firstRun) {                                                                                              // 354
        Tracker.nonreactive(function doMaterialize() {                                                                 // 355
          // re-render                                                                                                 // 356
          var rangesAndNodes = Blaze._materializeDOM(htmljs, [], view);                                                // 357
          if (! Blaze._isContentEqual(lastHtmljs, htmljs)) {                                                           // 358
            domrange.setMembers(rangesAndNodes);                                                                       // 359
            Blaze._fireCallbacks(view, 'rendered');                                                                    // 360
          }                                                                                                            // 361
        });                                                                                                            // 362
      }                                                                                                                // 363
      lastHtmljs = htmljs;                                                                                             // 364
                                                                                                                       // 365
      // Causes any nested views to stop immediately, not when we call                                                 // 366
      // `setMembers` the next time around the autorun.  Otherwise,                                                    // 367
      // helpers in the DOM tree to be replaced might be scheduled                                                     // 368
      // to re-run before we have a chance to stop them.                                                               // 369
      Tracker.onInvalidate(function () {                                                                               // 370
        if (domrange) {                                                                                                // 371
          domrange.destroyMembers();                                                                                   // 372
        }                                                                                                              // 373
      });                                                                                                              // 374
    }, undefined, 'materialize');                                                                                      // 375
                                                                                                                       // 376
    // first render.  lastHtmljs is the first htmljs.                                                                  // 377
    var initialContents;                                                                                               // 378
    if (! _workStack) {                                                                                                // 379
      initialContents = Blaze._materializeDOM(lastHtmljs, [], view);                                                   // 380
      domrange = doFirstRender(view, initialContents);                                                                 // 381
      initialContents = null; // help GC because we close over this scope a lot                                        // 382
    } else {                                                                                                           // 383
      // We're being called from Blaze._materializeDOM, so to avoid                                                    // 384
      // recursion and save stack space, provide a description of the                                                  // 385
      // work to be done instead of doing it.  Tasks pushed onto                                                       // 386
      // _workStack will be done in LIFO order after we return.                                                        // 387
      // The work will still be done within a Tracker.nonreactive,                                                     // 388
      // because it will be done by some call to Blaze._materializeDOM                                                 // 389
      // (which is always called in a Tracker.nonreactive).                                                            // 390
      initialContents = [];                                                                                            // 391
      // push this function first so that it happens last                                                              // 392
      _workStack.push(function () {                                                                                    // 393
        domrange = doFirstRender(view, initialContents);                                                               // 394
        initialContents = null; // help GC because of all the closures here                                            // 395
        _intoArray.push(domrange);                                                                                     // 396
      });                                                                                                              // 397
      // now push the task that calculates initialContents                                                             // 398
      _workStack.push(_.bind(Blaze._materializeDOM, null,                                                              // 399
                             lastHtmljs, initialContents, view, _workStack));                                          // 400
    }                                                                                                                  // 401
  });                                                                                                                  // 402
                                                                                                                       // 403
  if (! _workStack) {                                                                                                  // 404
    return domrange;                                                                                                   // 405
  } else {                                                                                                             // 406
    return null;                                                                                                       // 407
  }                                                                                                                    // 408
};                                                                                                                     // 409
                                                                                                                       // 410
// Expands a View to HTMLjs, calling `render` recursively on all                                                       // 411
// Views and evaluating any dynamic attributes.  Calls the `created`                                                   // 412
// callback, but not the `materialized` or `rendered` callbacks.                                                       // 413
// Destroys the view immediately, unless called in a Tracker Computation,                                              // 414
// in which case the view will be destroyed when the Computation is                                                    // 415
// invalidated.  If called in a Tracker Computation, the result is a                                                   // 416
// reactive string; that is, the Computation will be invalidated                                                       // 417
// if any changes are made to the view or subviews that might affect                                                   // 418
// the HTML.                                                                                                           // 419
Blaze._expandView = function (view, parentView) {                                                                      // 420
  Blaze._createView(view, parentView, true /*forExpansion*/);                                                          // 421
                                                                                                                       // 422
  view._isInRender = true;                                                                                             // 423
  var htmljs = Blaze._withCurrentView(view, function () {                                                              // 424
    return view._render();                                                                                             // 425
  });                                                                                                                  // 426
  view._isInRender = false;                                                                                            // 427
                                                                                                                       // 428
  var result = Blaze._expand(htmljs, view);                                                                            // 429
                                                                                                                       // 430
  if (Tracker.active) {                                                                                                // 431
    Tracker.onInvalidate(function () {                                                                                 // 432
      Blaze._destroyView(view);                                                                                        // 433
    });                                                                                                                // 434
  } else {                                                                                                             // 435
    Blaze._destroyView(view);                                                                                          // 436
  }                                                                                                                    // 437
                                                                                                                       // 438
  return result;                                                                                                       // 439
};                                                                                                                     // 440
                                                                                                                       // 441
// Options: `parentView`                                                                                               // 442
Blaze._HTMLJSExpander = HTML.TransformingVisitor.extend();                                                             // 443
Blaze._HTMLJSExpander.def({                                                                                            // 444
  visitObject: function (x) {                                                                                          // 445
    if (x instanceof Blaze.Template)                                                                                   // 446
      x = x.constructView();                                                                                           // 447
    if (x instanceof Blaze.View)                                                                                       // 448
      return Blaze._expandView(x, this.parentView);                                                                    // 449
                                                                                                                       // 450
    // this will throw an error; other objects are not allowed!                                                        // 451
    return HTML.TransformingVisitor.prototype.visitObject.call(this, x);                                               // 452
  },                                                                                                                   // 453
  visitAttributes: function (attrs) {                                                                                  // 454
    // expand dynamic attributes                                                                                       // 455
    if (typeof attrs === 'function')                                                                                   // 456
      attrs = Blaze._withCurrentView(this.parentView, attrs);                                                          // 457
                                                                                                                       // 458
    // call super (e.g. for case where `attrs` is an array)                                                            // 459
    return HTML.TransformingVisitor.prototype.visitAttributes.call(this, attrs);                                       // 460
  },                                                                                                                   // 461
  visitAttribute: function (name, value, tag) {                                                                        // 462
    // expand attribute values that are functions.  Any attribute value                                                // 463
    // that contains Views must be wrapped in a function.                                                              // 464
    if (typeof value === 'function')                                                                                   // 465
      value = Blaze._withCurrentView(this.parentView, value);                                                          // 466
                                                                                                                       // 467
    return HTML.TransformingVisitor.prototype.visitAttribute.call(                                                     // 468
      this, name, value, tag);                                                                                         // 469
  }                                                                                                                    // 470
});                                                                                                                    // 471
                                                                                                                       // 472
// Return Blaze.currentView, but only if it is being rendered                                                          // 473
// (i.e. we are in its render() method).                                                                               // 474
var currentViewIfRendering = function () {                                                                             // 475
  var view = Blaze.currentView;                                                                                        // 476
  return (view && view._isInRender) ? view : null;                                                                     // 477
};                                                                                                                     // 478
                                                                                                                       // 479
Blaze._expand = function (htmljs, parentView) {                                                                        // 480
  parentView = parentView || currentViewIfRendering();                                                                 // 481
  return (new Blaze._HTMLJSExpander(                                                                                   // 482
    {parentView: parentView})).visit(htmljs);                                                                          // 483
};                                                                                                                     // 484
                                                                                                                       // 485
Blaze._expandAttributes = function (attrs, parentView) {                                                               // 486
  parentView = parentView || currentViewIfRendering();                                                                 // 487
  return (new Blaze._HTMLJSExpander(                                                                                   // 488
    {parentView: parentView})).visitAttributes(attrs);                                                                 // 489
};                                                                                                                     // 490
                                                                                                                       // 491
Blaze._destroyView = function (view, _skipNodes) {                                                                     // 492
  if (view.isDestroyed)                                                                                                // 493
    return;                                                                                                            // 494
  view.isDestroyed = true;                                                                                             // 495
                                                                                                                       // 496
  Blaze._fireCallbacks(view, 'destroyed');                                                                             // 497
                                                                                                                       // 498
  // Destroy views and elements recursively.  If _skipNodes,                                                           // 499
  // only recurse up to views, not elements, for the case where                                                        // 500
  // the backend (jQuery) is recursing over the elements already.                                                      // 501
                                                                                                                       // 502
  if (view._domrange)                                                                                                  // 503
    view._domrange.destroyMembers(_skipNodes);                                                                         // 504
};                                                                                                                     // 505
                                                                                                                       // 506
Blaze._destroyNode = function (node) {                                                                                 // 507
  if (node.nodeType === 1)                                                                                             // 508
    Blaze._DOMBackend.Teardown.tearDownElement(node);                                                                  // 509
};                                                                                                                     // 510
                                                                                                                       // 511
// Are the HTMLjs entities `a` and `b` the same?  We could be                                                          // 512
// more elaborate here but the point is to catch the most basic                                                        // 513
// cases.                                                                                                              // 514
Blaze._isContentEqual = function (a, b) {                                                                              // 515
  if (a instanceof HTML.Raw) {                                                                                         // 516
    return (b instanceof HTML.Raw) && (a.value === b.value);                                                           // 517
  } else if (a == null) {                                                                                              // 518
    return (b == null);                                                                                                // 519
  } else {                                                                                                             // 520
    return (a === b) &&                                                                                                // 521
      ((typeof a === 'number') || (typeof a === 'boolean') ||                                                          // 522
       (typeof a === 'string'));                                                                                       // 523
  }                                                                                                                    // 524
};                                                                                                                     // 525
                                                                                                                       // 526
/**                                                                                                                    // 527
 * @summary The View corresponding to the current template helper, event handler, callback, or autorun.  If there isn't one, `null`.
 * @locus Client                                                                                                       // 529
 * @type {Blaze.View}                                                                                                  // 530
 */                                                                                                                    // 531
Blaze.currentView = null;                                                                                              // 532
                                                                                                                       // 533
Blaze._withCurrentView = function (view, func) {                                                                       // 534
  var oldView = Blaze.currentView;                                                                                     // 535
  try {                                                                                                                // 536
    Blaze.currentView = view;                                                                                          // 537
    return func();                                                                                                     // 538
  } finally {                                                                                                          // 539
    Blaze.currentView = oldView;                                                                                       // 540
  }                                                                                                                    // 541
};                                                                                                                     // 542
                                                                                                                       // 543
// Blaze.render publicly takes a View or a Template.                                                                   // 544
// Privately, it takes any HTMLJS (extended with Views and Templates)                                                  // 545
// except null or undefined, or a function that returns any extended                                                   // 546
// HTMLJS.                                                                                                             // 547
var checkRenderContent = function (content) {                                                                          // 548
  if (content === null)                                                                                                // 549
    throw new Error("Can't render null");                                                                              // 550
  if (typeof content === 'undefined')                                                                                  // 551
    throw new Error("Can't render undefined");                                                                         // 552
                                                                                                                       // 553
  if ((content instanceof Blaze.View) ||                                                                               // 554
      (content instanceof Blaze.Template) ||                                                                           // 555
      (typeof content === 'function'))                                                                                 // 556
    return;                                                                                                            // 557
                                                                                                                       // 558
  try {                                                                                                                // 559
    // Throw if content doesn't look like HTMLJS at the top level                                                      // 560
    // (i.e. verify that this is an HTML.Tag, or an array,                                                             // 561
    // or a primitive, etc.)                                                                                           // 562
    (new HTML.Visitor).visit(content);                                                                                 // 563
  } catch (e) {                                                                                                        // 564
    // Make error message suitable for public API                                                                      // 565
    throw new Error("Expected Template or View");                                                                      // 566
  }                                                                                                                    // 567
};                                                                                                                     // 568
                                                                                                                       // 569
// For Blaze.render and Blaze.toHTML, take content and                                                                 // 570
// wrap it in a View, unless it's a single View or                                                                     // 571
// Template already.                                                                                                   // 572
var contentAsView = function (content) {                                                                               // 573
  checkRenderContent(content);                                                                                         // 574
                                                                                                                       // 575
  if (content instanceof Blaze.Template) {                                                                             // 576
    return content.constructView();                                                                                    // 577
  } else if (content instanceof Blaze.View) {                                                                          // 578
    return content;                                                                                                    // 579
  } else {                                                                                                             // 580
    var func = content;                                                                                                // 581
    if (typeof func !== 'function') {                                                                                  // 582
      func = function () {                                                                                             // 583
        return content;                                                                                                // 584
      };                                                                                                               // 585
    }                                                                                                                  // 586
    return Blaze.View('render', func);                                                                                 // 587
  }                                                                                                                    // 588
};                                                                                                                     // 589
                                                                                                                       // 590
// For Blaze.renderWithData and Blaze.toHTMLWithData, wrap content                                                     // 591
// in a function, if necessary, so it can be a content arg to                                                          // 592
// a Blaze.With.                                                                                                       // 593
var contentAsFunc = function (content) {                                                                               // 594
  checkRenderContent(content);                                                                                         // 595
                                                                                                                       // 596
  if (typeof content !== 'function') {                                                                                 // 597
    return function () {                                                                                               // 598
      return content;                                                                                                  // 599
    };                                                                                                                 // 600
  } else {                                                                                                             // 601
    return content;                                                                                                    // 602
  }                                                                                                                    // 603
};                                                                                                                     // 604
                                                                                                                       // 605
/**                                                                                                                    // 606
 * @summary Renders a template or View to DOM nodes and inserts it into the DOM, returning a rendered [View](#blaze_view) which can be passed to [`Blaze.remove`](#blaze_remove).
 * @locus Client                                                                                                       // 608
 * @param {Template|Blaze.View} templateOrView The template (e.g. `Template.myTemplate`) or View object to render.  If a template, a View object is [constructed](#template_constructview).  If a View, it must be an unrendered View, which becomes a rendered View and is returned.
 * @param {DOMNode} parentNode The node that will be the parent of the rendered template.  It must be an Element node.
 * @param {DOMNode} [nextNode] Optional. If provided, must be a child of <em>parentNode</em>; the template will be inserted before this node. If not provided, the template will be inserted as the last child of parentNode.
 * @param {Blaze.View} [parentView] Optional. If provided, it will be set as the rendered View's [`parentView`](#view_parentview).
 */                                                                                                                    // 613
Blaze.render = function (content, parentElement, nextNode, parentView) {                                               // 614
  if (! parentElement) {                                                                                               // 615
    Blaze._warn("Blaze.render without a parent element is deprecated. " +                                              // 616
                "You must specify where to insert the rendered content.");                                             // 617
  }                                                                                                                    // 618
                                                                                                                       // 619
  if (nextNode instanceof Blaze.View) {                                                                                // 620
    // handle omitted nextNode                                                                                         // 621
    parentView = nextNode;                                                                                             // 622
    nextNode = null;                                                                                                   // 623
  }                                                                                                                    // 624
                                                                                                                       // 625
  // parentElement must be a DOM node. in particular, can't be the                                                     // 626
  // result of a call to `$`. Can't check if `parentElement instanceof                                                 // 627
  // Node` since 'Node' is undefined in IE8.                                                                           // 628
  if (parentElement && typeof parentElement.nodeType !== 'number')                                                     // 629
    throw new Error("'parentElement' must be a DOM node");                                                             // 630
  if (nextNode && typeof nextNode.nodeType !== 'number') // 'nextNode' is optional                                     // 631
    throw new Error("'nextNode' must be a DOM node");                                                                  // 632
                                                                                                                       // 633
  parentView = parentView || currentViewIfRendering();                                                                 // 634
                                                                                                                       // 635
  var view = contentAsView(content);                                                                                   // 636
  Blaze._materializeView(view, parentView);                                                                            // 637
                                                                                                                       // 638
  if (parentElement) {                                                                                                 // 639
    view._domrange.attach(parentElement, nextNode);                                                                    // 640
  }                                                                                                                    // 641
                                                                                                                       // 642
  return view;                                                                                                         // 643
};                                                                                                                     // 644
                                                                                                                       // 645
Blaze.insert = function (view, parentElement, nextNode) {                                                              // 646
  Blaze._warn("Blaze.insert has been deprecated.  Specify where to insert the " +                                      // 647
              "rendered content in the call to Blaze.render.");                                                        // 648
                                                                                                                       // 649
  if (! (view && (view._domrange instanceof Blaze._DOMRange)))                                                         // 650
    throw new Error("Expected template rendered with Blaze.render");                                                   // 651
                                                                                                                       // 652
  view._domrange.attach(parentElement, nextNode);                                                                      // 653
};                                                                                                                     // 654
                                                                                                                       // 655
/**                                                                                                                    // 656
 * @summary Renders a template or View to DOM nodes with a data context.  Otherwise identical to `Blaze.render`.       // 657
 * @locus Client                                                                                                       // 658
 * @param {Template|Blaze.View} templateOrView The template (e.g. `Template.myTemplate`) or View object to render.     // 659
 * @param {Object|Function} data The data context to use, or a function returning a data context.  If a function is provided, it will be reactively re-run.
 * @param {DOMNode} parentNode The node that will be the parent of the rendered template.  It must be an Element node.
 * @param {DOMNode} [nextNode] Optional. If provided, must be a child of <em>parentNode</em>; the template will be inserted before this node. If not provided, the template will be inserted as the last child of parentNode.
 * @param {Blaze.View} [parentView] Optional. If provided, it will be set as the rendered View's [`parentView`](#view_parentview).
 */                                                                                                                    // 664
Blaze.renderWithData = function (content, data, parentElement, nextNode, parentView) {                                 // 665
  // We defer the handling of optional arguments to Blaze.render.  At this point,                                      // 666
  // `nextNode` may actually be `parentView`.                                                                          // 667
  return Blaze.render(Blaze._TemplateWith(data, contentAsFunc(content)),                                               // 668
                          parentElement, nextNode, parentView);                                                        // 669
};                                                                                                                     // 670
                                                                                                                       // 671
/**                                                                                                                    // 672
 * @summary Removes a rendered View from the DOM, stopping all reactive updates and event listeners on it.             // 673
 * @locus Client                                                                                                       // 674
 * @param {Blaze.View} renderedView The return value from `Blaze.render` or `Blaze.renderWithData`.                    // 675
 */                                                                                                                    // 676
Blaze.remove = function (view) {                                                                                       // 677
  if (! (view && (view._domrange instanceof Blaze._DOMRange)))                                                         // 678
    throw new Error("Expected template rendered with Blaze.render");                                                   // 679
                                                                                                                       // 680
  while (view) {                                                                                                       // 681
    if (! view.isDestroyed) {                                                                                          // 682
      var range = view._domrange;                                                                                      // 683
      if (range.attached && ! range.parentRange)                                                                       // 684
        range.detach();                                                                                                // 685
      range.destroy();                                                                                                 // 686
    }                                                                                                                  // 687
                                                                                                                       // 688
    view = view._hasGeneratedParent && view.parentView;                                                                // 689
  }                                                                                                                    // 690
};                                                                                                                     // 691
                                                                                                                       // 692
/**                                                                                                                    // 693
 * @summary Renders a template or View to a string of HTML.                                                            // 694
 * @locus Client                                                                                                       // 695
 * @param {Template|Blaze.View} templateOrView The template (e.g. `Template.myTemplate`) or View object from which to generate HTML.
 */                                                                                                                    // 697
Blaze.toHTML = function (content, parentView) {                                                                        // 698
  parentView = parentView || currentViewIfRendering();                                                                 // 699
                                                                                                                       // 700
  return HTML.toHTML(Blaze._expandView(contentAsView(content), parentView));                                           // 701
};                                                                                                                     // 702
                                                                                                                       // 703
/**                                                                                                                    // 704
 * @summary Renders a template or View to HTML with a data context.  Otherwise identical to `Blaze.toHTML`.            // 705
 * @locus Client                                                                                                       // 706
 * @param {Template|Blaze.View} templateOrView The template (e.g. `Template.myTemplate`) or View object from which to generate HTML.
 * @param {Object|Function} data The data context to use, or a function returning a data context.                      // 708
 */                                                                                                                    // 709
Blaze.toHTMLWithData = function (content, data, parentView) {                                                          // 710
  parentView = parentView || currentViewIfRendering();                                                                 // 711
                                                                                                                       // 712
  return HTML.toHTML(Blaze._expandView(Blaze._TemplateWith(                                                            // 713
    data, contentAsFunc(content)), parentView));                                                                       // 714
};                                                                                                                     // 715
                                                                                                                       // 716
Blaze._toText = function (htmljs, parentView, textMode) {                                                              // 717
  if (typeof htmljs === 'function')                                                                                    // 718
    throw new Error("Blaze._toText doesn't take a function, just HTMLjs");                                             // 719
                                                                                                                       // 720
  if ((parentView != null) && ! (parentView instanceof Blaze.View)) {                                                  // 721
    // omitted parentView argument                                                                                     // 722
    textMode = parentView;                                                                                             // 723
    parentView = null;                                                                                                 // 724
  }                                                                                                                    // 725
  parentView = parentView || currentViewIfRendering();                                                                 // 726
                                                                                                                       // 727
  if (! textMode)                                                                                                      // 728
    throw new Error("textMode required");                                                                              // 729
  if (! (textMode === HTML.TEXTMODE.STRING ||                                                                          // 730
         textMode === HTML.TEXTMODE.RCDATA ||                                                                          // 731
         textMode === HTML.TEXTMODE.ATTRIBUTE))                                                                        // 732
    throw new Error("Unknown textMode: " + textMode);                                                                  // 733
                                                                                                                       // 734
  return HTML.toText(Blaze._expand(htmljs, parentView), textMode);                                                     // 735
};                                                                                                                     // 736
                                                                                                                       // 737
/**                                                                                                                    // 738
 * @summary Returns the current data context, or the data context that was used when rendering a particular DOM element or View from a Meteor template.
 * @locus Client                                                                                                       // 740
 * @param {DOMElement|Blaze.View} [elementOrView] Optional.  An element that was rendered by a Meteor, or a View.      // 741
 */                                                                                                                    // 742
Blaze.getData = function (elementOrView) {                                                                             // 743
  var theWith;                                                                                                         // 744
                                                                                                                       // 745
  if (! elementOrView) {                                                                                               // 746
    theWith = Blaze.getView('with');                                                                                   // 747
  } else if (elementOrView instanceof Blaze.View) {                                                                    // 748
    var view = elementOrView;                                                                                          // 749
    theWith = (view.name === 'with' ? view :                                                                           // 750
               Blaze.getView(view, 'with'));                                                                           // 751
  } else if (typeof elementOrView.nodeType === 'number') {                                                             // 752
    if (elementOrView.nodeType !== 1)                                                                                  // 753
      throw new Error("Expected DOM element");                                                                         // 754
    theWith = Blaze.getView(elementOrView, 'with');                                                                    // 755
  } else {                                                                                                             // 756
    throw new Error("Expected DOM element or View");                                                                   // 757
  }                                                                                                                    // 758
                                                                                                                       // 759
  return theWith ? theWith.dataVar.get() : null;                                                                       // 760
};                                                                                                                     // 761
                                                                                                                       // 762
// For back-compat                                                                                                     // 763
Blaze.getElementData = function (element) {                                                                            // 764
  Blaze._warn("Blaze.getElementData has been deprecated.  Use " +                                                      // 765
              "Blaze.getData(element) instead.");                                                                      // 766
                                                                                                                       // 767
  if (element.nodeType !== 1)                                                                                          // 768
    throw new Error("Expected DOM element");                                                                           // 769
                                                                                                                       // 770
  return Blaze.getData(element);                                                                                       // 771
};                                                                                                                     // 772
                                                                                                                       // 773
// Both arguments are optional.                                                                                        // 774
                                                                                                                       // 775
/**                                                                                                                    // 776
 * @summary Gets either the current View, or the View enclosing the given DOM element.                                 // 777
 * @locus Client                                                                                                       // 778
 * @param {DOMElement} [element] Optional.  If specified, the View enclosing `element` is returned.                    // 779
 */                                                                                                                    // 780
Blaze.getView = function (elementOrView, _viewName) {                                                                  // 781
  var viewName = _viewName;                                                                                            // 782
                                                                                                                       // 783
  if ((typeof elementOrView) === 'string') {                                                                           // 784
    // omitted elementOrView; viewName present                                                                         // 785
    viewName = elementOrView;                                                                                          // 786
    elementOrView = null;                                                                                              // 787
  }                                                                                                                    // 788
                                                                                                                       // 789
  // We could eventually shorten the code by folding the logic                                                         // 790
  // from the other methods into this method.                                                                          // 791
  if (! elementOrView) {                                                                                               // 792
    return Blaze._getCurrentView(viewName);                                                                            // 793
  } else if (elementOrView instanceof Blaze.View) {                                                                    // 794
    return Blaze._getParentView(elementOrView, viewName);                                                              // 795
  } else if (typeof elementOrView.nodeType === 'number') {                                                             // 796
    return Blaze._getElementView(elementOrView, viewName);                                                             // 797
  } else {                                                                                                             // 798
    throw new Error("Expected DOM element or View");                                                                   // 799
  }                                                                                                                    // 800
};                                                                                                                     // 801
                                                                                                                       // 802
// Gets the current view or its nearest ancestor of name                                                               // 803
// `name`.                                                                                                             // 804
Blaze._getCurrentView = function (name) {                                                                              // 805
  var view = Blaze.currentView;                                                                                        // 806
  // Better to fail in cases where it doesn't make sense                                                               // 807
  // to use Blaze._getCurrentView().  There will be a current                                                          // 808
  // view anywhere it does.  You can check Blaze.currentView                                                           // 809
  // if you want to know whether there is one or not.                                                                  // 810
  if (! view)                                                                                                          // 811
    throw new Error("There is no current view");                                                                       // 812
                                                                                                                       // 813
  if (name) {                                                                                                          // 814
    while (view && view.name !== name)                                                                                 // 815
      view = view.parentView;                                                                                          // 816
    return view || null;                                                                                               // 817
  } else {                                                                                                             // 818
    // Blaze._getCurrentView() with no arguments just returns                                                          // 819
    // Blaze.currentView.                                                                                              // 820
    return view;                                                                                                       // 821
  }                                                                                                                    // 822
};                                                                                                                     // 823
                                                                                                                       // 824
Blaze._getParentView = function (view, name) {                                                                         // 825
  var v = view.parentView;                                                                                             // 826
                                                                                                                       // 827
  if (name) {                                                                                                          // 828
    while (v && v.name !== name)                                                                                       // 829
      v = v.parentView;                                                                                                // 830
  }                                                                                                                    // 831
                                                                                                                       // 832
  return v || null;                                                                                                    // 833
};                                                                                                                     // 834
                                                                                                                       // 835
Blaze._getElementView = function (elem, name) {                                                                        // 836
  var range = Blaze._DOMRange.forElement(elem);                                                                        // 837
  var view = null;                                                                                                     // 838
  while (range && ! view) {                                                                                            // 839
    view = (range.view || null);                                                                                       // 840
    if (! view) {                                                                                                      // 841
      if (range.parentRange)                                                                                           // 842
        range = range.parentRange;                                                                                     // 843
      else                                                                                                             // 844
        range = Blaze._DOMRange.forElement(range.parentElement);                                                       // 845
    }                                                                                                                  // 846
  }                                                                                                                    // 847
                                                                                                                       // 848
  if (name) {                                                                                                          // 849
    while (view && view.name !== name)                                                                                 // 850
      view = view.parentView;                                                                                          // 851
    return view || null;                                                                                               // 852
  } else {                                                                                                             // 853
    return view;                                                                                                       // 854
  }                                                                                                                    // 855
};                                                                                                                     // 856
                                                                                                                       // 857
Blaze._addEventMap = function (view, eventMap, thisInHandler) {                                                        // 858
  thisInHandler = (thisInHandler || null);                                                                             // 859
  var handles = [];                                                                                                    // 860
                                                                                                                       // 861
  if (! view._domrange)                                                                                                // 862
    throw new Error("View must have a DOMRange");                                                                      // 863
                                                                                                                       // 864
  view._domrange.onAttached(function attached_eventMaps(range, element) {                                              // 865
    _.each(eventMap, function (handler, spec) {                                                                        // 866
      var clauses = spec.split(/,\s+/);                                                                                // 867
      // iterate over clauses of spec, e.g. ['click .foo', 'click .bar']                                               // 868
      _.each(clauses, function (clause) {                                                                              // 869
        var parts = clause.split(/\s+/);                                                                               // 870
        if (parts.length === 0)                                                                                        // 871
          return;                                                                                                      // 872
                                                                                                                       // 873
        var newEvents = parts.shift();                                                                                 // 874
        var selector = parts.join(' ');                                                                                // 875
        handles.push(Blaze._EventSupport.listen(                                                                       // 876
          element, newEvents, selector,                                                                                // 877
          function (evt) {                                                                                             // 878
            if (! range.containsElement(evt.currentTarget))                                                            // 879
              return null;                                                                                             // 880
            var handlerThis = thisInHandler || this;                                                                   // 881
            var handlerArgs = arguments;                                                                               // 882
            return Blaze._withCurrentView(view, function () {                                                          // 883
              return handler.apply(handlerThis, handlerArgs);                                                          // 884
            });                                                                                                        // 885
          },                                                                                                           // 886
          range, function (r) {                                                                                        // 887
            return r.parentRange;                                                                                      // 888
          }));                                                                                                         // 889
      });                                                                                                              // 890
    });                                                                                                                // 891
  });                                                                                                                  // 892
                                                                                                                       // 893
  view.onViewDestroyed(function () {                                                                                   // 894
    _.each(handles, function (h) {                                                                                     // 895
      h.stop();                                                                                                        // 896
    });                                                                                                                // 897
    handles.length = 0;                                                                                                // 898
  });                                                                                                                  // 899
};                                                                                                                     // 900
                                                                                                                       // 901
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/blaze/builtins.js                                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Blaze._calculateCondition = function (cond) {                                                                          // 1
  if (cond instanceof Array && cond.length === 0)                                                                      // 2
    cond = false;                                                                                                      // 3
  return !! cond;                                                                                                      // 4
};                                                                                                                     // 5
                                                                                                                       // 6
/**                                                                                                                    // 7
 * @summary Constructs a View that renders content with a data context.                                                // 8
 * @locus Client                                                                                                       // 9
 * @param {Object|Function} data An object to use as the data context, or a function returning such an object.  If a function is provided, it will be reactively re-run.
 * @param {Function} contentFunc A Function that returns [*renderable content*](#renderable_content).                  // 11
 */                                                                                                                    // 12
Blaze.With = function (data, contentFunc) {                                                                            // 13
  var view = Blaze.View('with', contentFunc);                                                                          // 14
                                                                                                                       // 15
  view.dataVar = new ReactiveVar;                                                                                      // 16
                                                                                                                       // 17
  view.onViewCreated(function () {                                                                                     // 18
    if (typeof data === 'function') {                                                                                  // 19
      // `data` is a reactive function                                                                                 // 20
      view.autorun(function () {                                                                                       // 21
        view.dataVar.set(data());                                                                                      // 22
      }, view.parentView, 'setData');                                                                                  // 23
    } else {                                                                                                           // 24
      view.dataVar.set(data);                                                                                          // 25
    }                                                                                                                  // 26
  });                                                                                                                  // 27
                                                                                                                       // 28
  return view;                                                                                                         // 29
};                                                                                                                     // 30
                                                                                                                       // 31
/**                                                                                                                    // 32
 * Attaches bindings to the instantiated view.                                                                         // 33
 * @param {Object} bindings A dictionary of bindings, each binding name                                                // 34
 * corresponds to a value or a function that will be reactively re-run.                                                // 35
 * @param {View} view The target.                                                                                      // 36
 */                                                                                                                    // 37
Blaze._attachBindingsToView = function (bindings, view) {                                                              // 38
  view.onViewCreated(function () {                                                                                     // 39
    _.each(bindings, function (binding, name) {                                                                        // 40
      view._scopeBindings[name] = new ReactiveVar;                                                                     // 41
      if (typeof binding === 'function') {                                                                             // 42
        view.autorun(function () {                                                                                     // 43
          view._scopeBindings[name].set(binding());                                                                    // 44
        }, view.parentView);                                                                                           // 45
      } else {                                                                                                         // 46
        view._scopeBindings[name].set(binding);                                                                        // 47
      }                                                                                                                // 48
    });                                                                                                                // 49
  });                                                                                                                  // 50
};                                                                                                                     // 51
                                                                                                                       // 52
/**                                                                                                                    // 53
 * @summary Constructs a View setting the local lexical scope in the block.                                            // 54
 * @param {Function} bindings Dictionary mapping names of bindings to                                                  // 55
 * values or computations to reactively re-run.                                                                        // 56
 * @param {Function} contentFunc A Function that returns [*renderable content*](#renderable_content).                  // 57
 */                                                                                                                    // 58
Blaze.Let = function (bindings, contentFunc) {                                                                         // 59
  var view = Blaze.View('let', contentFunc);                                                                           // 60
  Blaze._attachBindingsToView(bindings, view);                                                                         // 61
                                                                                                                       // 62
  return view;                                                                                                         // 63
};                                                                                                                     // 64
                                                                                                                       // 65
/**                                                                                                                    // 66
 * @summary Constructs a View that renders content conditionally.                                                      // 67
 * @locus Client                                                                                                       // 68
 * @param {Function} conditionFunc A function to reactively re-run.  Whether the result is truthy or falsy determines whether `contentFunc` or `elseFunc` is shown.  An empty array is considered falsy.
 * @param {Function} contentFunc A Function that returns [*renderable content*](#renderable_content).                  // 70
 * @param {Function} [elseFunc] Optional.  A Function that returns [*renderable content*](#renderable_content).  If no `elseFunc` is supplied, no content is shown in the "else" case.
 */                                                                                                                    // 72
Blaze.If = function (conditionFunc, contentFunc, elseFunc, _not) {                                                     // 73
  var conditionVar = new ReactiveVar;                                                                                  // 74
                                                                                                                       // 75
  var view = Blaze.View(_not ? 'unless' : 'if', function () {                                                          // 76
    return conditionVar.get() ? contentFunc() :                                                                        // 77
      (elseFunc ? elseFunc() : null);                                                                                  // 78
  });                                                                                                                  // 79
  view.__conditionVar = conditionVar;                                                                                  // 80
  view.onViewCreated(function () {                                                                                     // 81
    this.autorun(function () {                                                                                         // 82
      var cond = Blaze._calculateCondition(conditionFunc());                                                           // 83
      conditionVar.set(_not ? (! cond) : cond);                                                                        // 84
    }, this.parentView, 'condition');                                                                                  // 85
  });                                                                                                                  // 86
                                                                                                                       // 87
  return view;                                                                                                         // 88
};                                                                                                                     // 89
                                                                                                                       // 90
/**                                                                                                                    // 91
 * @summary An inverted [`Blaze.If`](#blaze_if).                                                                       // 92
 * @locus Client                                                                                                       // 93
 * @param {Function} conditionFunc A function to reactively re-run.  If the result is falsy, `contentFunc` is shown, otherwise `elseFunc` is shown.  An empty array is considered falsy.
 * @param {Function} contentFunc A Function that returns [*renderable content*](#renderable_content).                  // 95
 * @param {Function} [elseFunc] Optional.  A Function that returns [*renderable content*](#renderable_content).  If no `elseFunc` is supplied, no content is shown in the "else" case.
 */                                                                                                                    // 97
Blaze.Unless = function (conditionFunc, contentFunc, elseFunc) {                                                       // 98
  return Blaze.If(conditionFunc, contentFunc, elseFunc, true /*_not*/);                                                // 99
};                                                                                                                     // 100
                                                                                                                       // 101
/**                                                                                                                    // 102
 * @summary Constructs a View that renders `contentFunc` for each item in a sequence.                                  // 103
 * @locus Client                                                                                                       // 104
 * @param {Function} argFunc A function to reactively re-run. The function can                                         // 105
 * return one of two options:                                                                                          // 106
 *                                                                                                                     // 107
 * 1. An object with two fields: '_variable' and '_sequence'. Each iterates over                                       // 108
 *   '_sequence', it may be a Cursor, an array, null, or undefined. Inside the                                         // 109
 *   Each body you will be able to get the current item from the sequence using                                        // 110
 *   the name specified in the '_variable' field.                                                                      // 111
 *                                                                                                                     // 112
 * 2. Just a sequence (Cursor, array, null, or undefined) not wrapped into an                                          // 113
 *   object. Inside the Each body, the current item will be set as the data                                            // 114
 *   context.                                                                                                          // 115
 * @param {Function} contentFunc A Function that returns  [*renderable                                                 // 116
 * content*](#renderable_content).                                                                                     // 117
 * @param {Function} [elseFunc] A Function that returns [*renderable                                                   // 118
 * content*](#renderable_content) to display in the case when there are no items                                       // 119
 * in the sequence.                                                                                                    // 120
 */                                                                                                                    // 121
Blaze.Each = function (argFunc, contentFunc, elseFunc) {                                                               // 122
  var eachView = Blaze.View('each', function () {                                                                      // 123
    var subviews = this.initialSubviews;                                                                               // 124
    this.initialSubviews = null;                                                                                       // 125
    if (this._isCreatedForExpansion) {                                                                                 // 126
      this.expandedValueDep = new Tracker.Dependency;                                                                  // 127
      this.expandedValueDep.depend();                                                                                  // 128
    }                                                                                                                  // 129
    return subviews;                                                                                                   // 130
  });                                                                                                                  // 131
  eachView.initialSubviews = [];                                                                                       // 132
  eachView.numItems = 0;                                                                                               // 133
  eachView.inElseMode = false;                                                                                         // 134
  eachView.stopHandle = null;                                                                                          // 135
  eachView.contentFunc = contentFunc;                                                                                  // 136
  eachView.elseFunc = elseFunc;                                                                                        // 137
  eachView.argVar = new ReactiveVar;                                                                                   // 138
  eachView.variableName = null;                                                                                        // 139
                                                                                                                       // 140
  // update the @index value in the scope of all subviews in the range                                                 // 141
  var updateIndices = function (from, to) {                                                                            // 142
    if (to === undefined) {                                                                                            // 143
      to = eachView.numItems - 1;                                                                                      // 144
    }                                                                                                                  // 145
                                                                                                                       // 146
    for (var i = from; i <= to; i++) {                                                                                 // 147
      var view = eachView._domrange.members[i].view;                                                                   // 148
      view._scopeBindings['@index'].set(i);                                                                            // 149
    }                                                                                                                  // 150
  };                                                                                                                   // 151
                                                                                                                       // 152
  eachView.onViewCreated(function () {                                                                                 // 153
    // We evaluate argFunc in an autorun to make sure                                                                  // 154
    // Blaze.currentView is always set when it runs (rather than                                                       // 155
    // passing argFunc straight to ObserveSequence).                                                                   // 156
    eachView.autorun(function () {                                                                                     // 157
      // argFunc can return either a sequence as is or a wrapper object with a                                         // 158
      // _sequence and _variable fields set.                                                                           // 159
      var arg = argFunc();                                                                                             // 160
      if (_.isObject(arg) && _.has(arg, '_sequence')) {                                                                // 161
        eachView.variableName = arg._variable || null;                                                                 // 162
        arg = arg._sequence;                                                                                           // 163
      }                                                                                                                // 164
                                                                                                                       // 165
      eachView.argVar.set(arg);                                                                                        // 166
    }, eachView.parentView, 'collection');                                                                             // 167
                                                                                                                       // 168
    eachView.stopHandle = ObserveSequence.observe(function () {                                                        // 169
      return eachView.argVar.get();                                                                                    // 170
    }, {                                                                                                               // 171
      addedAt: function (id, item, index) {                                                                            // 172
        Tracker.nonreactive(function () {                                                                              // 173
          var newItemView;                                                                                             // 174
          if (eachView.variableName) {                                                                                 // 175
            // new-style #each (as in {{#each item in items}})                                                         // 176
            // doesn't create a new data context                                                                       // 177
            newItemView = Blaze.View('item', eachView.contentFunc);                                                    // 178
          } else {                                                                                                     // 179
            newItemView = Blaze.With(item, eachView.contentFunc);                                                      // 180
          }                                                                                                            // 181
                                                                                                                       // 182
          eachView.numItems++;                                                                                         // 183
                                                                                                                       // 184
          var bindings = {};                                                                                           // 185
          bindings['@index'] = index;                                                                                  // 186
          if (eachView.variableName) {                                                                                 // 187
            bindings[eachView.variableName] = item;                                                                    // 188
          }                                                                                                            // 189
          Blaze._attachBindingsToView(bindings, newItemView);                                                          // 190
                                                                                                                       // 191
          if (eachView.expandedValueDep) {                                                                             // 192
            eachView.expandedValueDep.changed();                                                                       // 193
          } else if (eachView._domrange) {                                                                             // 194
            if (eachView.inElseMode) {                                                                                 // 195
              eachView._domrange.removeMember(0);                                                                      // 196
              eachView.inElseMode = false;                                                                             // 197
            }                                                                                                          // 198
                                                                                                                       // 199
            var range = Blaze._materializeView(newItemView, eachView);                                                 // 200
            eachView._domrange.addMember(range, index);                                                                // 201
            updateIndices(index);                                                                                      // 202
          } else {                                                                                                     // 203
            eachView.initialSubviews.splice(index, 0, newItemView);                                                    // 204
          }                                                                                                            // 205
        });                                                                                                            // 206
      },                                                                                                               // 207
      removedAt: function (id, item, index) {                                                                          // 208
        Tracker.nonreactive(function () {                                                                              // 209
          eachView.numItems--;                                                                                         // 210
          if (eachView.expandedValueDep) {                                                                             // 211
            eachView.expandedValueDep.changed();                                                                       // 212
          } else if (eachView._domrange) {                                                                             // 213
            eachView._domrange.removeMember(index);                                                                    // 214
            updateIndices(index);                                                                                      // 215
            if (eachView.elseFunc && eachView.numItems === 0) {                                                        // 216
              eachView.inElseMode = true;                                                                              // 217
              eachView._domrange.addMember(                                                                            // 218
                Blaze._materializeView(                                                                                // 219
                  Blaze.View('each_else',eachView.elseFunc),                                                           // 220
                  eachView), 0);                                                                                       // 221
            }                                                                                                          // 222
          } else {                                                                                                     // 223
            eachView.initialSubviews.splice(index, 1);                                                                 // 224
          }                                                                                                            // 225
        });                                                                                                            // 226
      },                                                                                                               // 227
      changedAt: function (id, newItem, oldItem, index) {                                                              // 228
        Tracker.nonreactive(function () {                                                                              // 229
          if (eachView.expandedValueDep) {                                                                             // 230
            eachView.expandedValueDep.changed();                                                                       // 231
          } else {                                                                                                     // 232
            var itemView;                                                                                              // 233
            if (eachView._domrange) {                                                                                  // 234
              itemView = eachView._domrange.getMember(index).view;                                                     // 235
            } else {                                                                                                   // 236
              itemView = eachView.initialSubviews[index];                                                              // 237
            }                                                                                                          // 238
            if (eachView.variableName) {                                                                               // 239
              itemView._scopeBindings[eachView.variableName].set(newItem);                                             // 240
            } else {                                                                                                   // 241
              itemView.dataVar.set(newItem);                                                                           // 242
            }                                                                                                          // 243
          }                                                                                                            // 244
        });                                                                                                            // 245
      },                                                                                                               // 246
      movedTo: function (id, item, fromIndex, toIndex) {                                                               // 247
        Tracker.nonreactive(function () {                                                                              // 248
          if (eachView.expandedValueDep) {                                                                             // 249
            eachView.expandedValueDep.changed();                                                                       // 250
          } else if (eachView._domrange) {                                                                             // 251
            eachView._domrange.moveMember(fromIndex, toIndex);                                                         // 252
            updateIndices(                                                                                             // 253
              Math.min(fromIndex, toIndex), Math.max(fromIndex, toIndex));                                             // 254
          } else {                                                                                                     // 255
            var subviews = eachView.initialSubviews;                                                                   // 256
            var itemView = subviews[fromIndex];                                                                        // 257
            subviews.splice(fromIndex, 1);                                                                             // 258
            subviews.splice(toIndex, 0, itemView);                                                                     // 259
          }                                                                                                            // 260
        });                                                                                                            // 261
      }                                                                                                                // 262
    });                                                                                                                // 263
                                                                                                                       // 264
    if (eachView.elseFunc && eachView.numItems === 0) {                                                                // 265
      eachView.inElseMode = true;                                                                                      // 266
      eachView.initialSubviews[0] =                                                                                    // 267
        Blaze.View('each_else', eachView.elseFunc);                                                                    // 268
    }                                                                                                                  // 269
  });                                                                                                                  // 270
                                                                                                                       // 271
  eachView.onViewDestroyed(function () {                                                                               // 272
    if (eachView.stopHandle)                                                                                           // 273
      eachView.stopHandle.stop();                                                                                      // 274
  });                                                                                                                  // 275
                                                                                                                       // 276
  return eachView;                                                                                                     // 277
};                                                                                                                     // 278
                                                                                                                       // 279
Blaze._TemplateWith = function (arg, contentFunc) {                                                                    // 280
  var w;                                                                                                               // 281
                                                                                                                       // 282
  var argFunc = arg;                                                                                                   // 283
  if (typeof arg !== 'function') {                                                                                     // 284
    argFunc = function () {                                                                                            // 285
      return arg;                                                                                                      // 286
    };                                                                                                                 // 287
  }                                                                                                                    // 288
                                                                                                                       // 289
  // This is a little messy.  When we compile `{{> Template.contentBlock}}`, we                                        // 290
  // wrap it in Blaze._InOuterTemplateScope in order to skip the intermediate                                          // 291
  // parent Views in the current template.  However, when there's an argument                                          // 292
  // (`{{> Template.contentBlock arg}}`), the argument needs to be evaluated                                           // 293
  // in the original scope.  There's no good order to nest                                                             // 294
  // Blaze._InOuterTemplateScope and Spacebars.TemplateWith to achieve this,                                           // 295
  // so we wrap argFunc to run it in the "original parentView" of the                                                  // 296
  // Blaze._InOuterTemplateScope.                                                                                      // 297
  //                                                                                                                   // 298
  // To make this better, reconsider _InOuterTemplateScope as a primitive.                                             // 299
  // Longer term, evaluate expressions in the proper lexical scope.                                                    // 300
  var wrappedArgFunc = function () {                                                                                   // 301
    var viewToEvaluateArg = null;                                                                                      // 302
    if (w.parentView && w.parentView.name === 'InOuterTemplateScope') {                                                // 303
      viewToEvaluateArg = w.parentView.originalParentView;                                                             // 304
    }                                                                                                                  // 305
    if (viewToEvaluateArg) {                                                                                           // 306
      return Blaze._withCurrentView(viewToEvaluateArg, argFunc);                                                       // 307
    } else {                                                                                                           // 308
      return argFunc();                                                                                                // 309
    }                                                                                                                  // 310
  };                                                                                                                   // 311
                                                                                                                       // 312
  var wrappedContentFunc = function () {                                                                               // 313
    var content = contentFunc.call(this);                                                                              // 314
                                                                                                                       // 315
    // Since we are generating the Blaze._TemplateWith view for the                                                    // 316
    // user, set the flag on the child view.  If `content` is a template,                                              // 317
    // construct the View so that we can set the flag.                                                                 // 318
    if (content instanceof Blaze.Template) {                                                                           // 319
      content = content.constructView();                                                                               // 320
    }                                                                                                                  // 321
    if (content instanceof Blaze.View) {                                                                               // 322
      content._hasGeneratedParent = true;                                                                              // 323
    }                                                                                                                  // 324
                                                                                                                       // 325
    return content;                                                                                                    // 326
  };                                                                                                                   // 327
                                                                                                                       // 328
  w = Blaze.With(wrappedArgFunc, wrappedContentFunc);                                                                  // 329
  w.__isTemplateWith = true;                                                                                           // 330
  return w;                                                                                                            // 331
};                                                                                                                     // 332
                                                                                                                       // 333
Blaze._InOuterTemplateScope = function (templateView, contentFunc) {                                                   // 334
  var view = Blaze.View('InOuterTemplateScope', contentFunc);                                                          // 335
  var parentView = templateView.parentView;                                                                            // 336
                                                                                                                       // 337
  // Hack so that if you call `{{> foo bar}}` and it expands into                                                      // 338
  // `{{#with bar}}{{> foo}}{{/with}}`, and then `foo` is a template                                                   // 339
  // that inserts `{{> Template.contentBlock}}`, the data context for                                                  // 340
  // `Template.contentBlock` is not `bar` but the one enclosing that.                                                  // 341
  if (parentView.__isTemplateWith)                                                                                     // 342
    parentView = parentView.parentView;                                                                                // 343
                                                                                                                       // 344
  view.onViewCreated(function () {                                                                                     // 345
    this.originalParentView = this.parentView;                                                                         // 346
    this.parentView = parentView;                                                                                      // 347
    this.__childDoesntStartNewLexicalScope = true;                                                                     // 348
  });                                                                                                                  // 349
  return view;                                                                                                         // 350
};                                                                                                                     // 351
                                                                                                                       // 352
// XXX COMPAT WITH 0.9.0                                                                                               // 353
Blaze.InOuterTemplateScope = Blaze._InOuterTemplateScope;                                                              // 354
                                                                                                                       // 355
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/blaze/lookup.js                                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Blaze._globalHelpers = {};                                                                                             // 1
                                                                                                                       // 2
// Documented as Template.registerHelper.                                                                              // 3
// This definition also provides back-compat for `UI.registerHelper`.                                                  // 4
Blaze.registerHelper = function (name, func) {                                                                         // 5
  Blaze._globalHelpers[name] = func;                                                                                   // 6
};                                                                                                                     // 7
                                                                                                                       // 8
var bindIfIsFunction = function (x, target) {                                                                          // 9
  if (typeof x !== 'function')                                                                                         // 10
    return x;                                                                                                          // 11
  return _.bind(x, target);                                                                                            // 12
};                                                                                                                     // 13
                                                                                                                       // 14
// If `x` is a function, binds the value of `this` for that function                                                   // 15
// to the current data context.                                                                                        // 16
var bindDataContext = function (x) {                                                                                   // 17
  if (typeof x === 'function') {                                                                                       // 18
    return function () {                                                                                               // 19
      var data = Blaze.getData();                                                                                      // 20
      if (data == null)                                                                                                // 21
        data = {};                                                                                                     // 22
      return x.apply(data, arguments);                                                                                 // 23
    };                                                                                                                 // 24
  }                                                                                                                    // 25
  return x;                                                                                                            // 26
};                                                                                                                     // 27
                                                                                                                       // 28
Blaze._OLDSTYLE_HELPER = {};                                                                                           // 29
                                                                                                                       // 30
Blaze._getTemplateHelper = function (template, name, tmplInstanceFunc) {                                               // 31
  // XXX COMPAT WITH 0.9.3                                                                                             // 32
  var isKnownOldStyleHelper = false;                                                                                   // 33
                                                                                                                       // 34
  if (template.__helpers.has(name)) {                                                                                  // 35
    var helper = template.__helpers.get(name);                                                                         // 36
    if (helper === Blaze._OLDSTYLE_HELPER) {                                                                           // 37
      isKnownOldStyleHelper = true;                                                                                    // 38
    } else if (helper != null) {                                                                                       // 39
      return wrapHelper(bindDataContext(helper), tmplInstanceFunc);                                                    // 40
    } else {                                                                                                           // 41
      return null;                                                                                                     // 42
    }                                                                                                                  // 43
  }                                                                                                                    // 44
                                                                                                                       // 45
  // old-style helper                                                                                                  // 46
  if (name in template) {                                                                                              // 47
    // Only warn once per helper                                                                                       // 48
    if (! isKnownOldStyleHelper) {                                                                                     // 49
      template.__helpers.set(name, Blaze._OLDSTYLE_HELPER);                                                            // 50
      if (! template._NOWARN_OLDSTYLE_HELPERS) {                                                                       // 51
        Blaze._warn('Assigning helper with `' + template.viewName + '.' +                                              // 52
                    name + ' = ...` is deprecated.  Use `' + template.viewName +                                       // 53
                    '.helpers(...)` instead.');                                                                        // 54
      }                                                                                                                // 55
    }                                                                                                                  // 56
    if (template[name] != null) {                                                                                      // 57
      return wrapHelper(bindDataContext(template[name]), tmplInstanceFunc);                                            // 58
    }                                                                                                                  // 59
  }                                                                                                                    // 60
                                                                                                                       // 61
  return null;                                                                                                         // 62
};                                                                                                                     // 63
                                                                                                                       // 64
var wrapHelper = function (f, templateFunc) {                                                                          // 65
  if (typeof f !== "function") {                                                                                       // 66
    return f;                                                                                                          // 67
  }                                                                                                                    // 68
                                                                                                                       // 69
  return function () {                                                                                                 // 70
    var self = this;                                                                                                   // 71
    var args = arguments;                                                                                              // 72
                                                                                                                       // 73
    return Blaze.Template._withTemplateInstanceFunc(templateFunc, function () {                                        // 74
      return Blaze._wrapCatchingExceptions(f, 'template helper').apply(self, args);                                    // 75
    });                                                                                                                // 76
  };                                                                                                                   // 77
};                                                                                                                     // 78
                                                                                                                       // 79
Blaze._lexicalBindingLookup = function (view, name) {                                                                  // 80
  var currentView = view;                                                                                              // 81
  var blockHelpersStack = [];                                                                                          // 82
                                                                                                                       // 83
  // walk up the views stopping at a Spacebars.include or Template view that                                           // 84
  // doesn't have an InOuterTemplateScope view as a parent                                                             // 85
  do {                                                                                                                 // 86
    // skip block helpers views                                                                                        // 87
    // if we found the binding on the scope, return it                                                                 // 88
    if (_.has(currentView._scopeBindings, name)) {                                                                     // 89
      var bindingReactiveVar = currentView._scopeBindings[name];                                                       // 90
      return function () {                                                                                             // 91
        return bindingReactiveVar.get();                                                                               // 92
      };                                                                                                               // 93
    }                                                                                                                  // 94
  } while (! (currentView.__startsNewLexicalScope &&                                                                   // 95
              ! (currentView.parentView &&                                                                             // 96
                 currentView.parentView.__childDoesntStartNewLexicalScope))                                            // 97
           && (currentView = currentView.parentView));                                                                 // 98
                                                                                                                       // 99
  return null;                                                                                                         // 100
};                                                                                                                     // 101
                                                                                                                       // 102
// templateInstance argument is provided to be available for possible                                                  // 103
// alternative implementations of this function by 3rd party packages.                                                 // 104
Blaze._getTemplate = function (name, templateInstance) {                                                               // 105
  if ((name in Blaze.Template) && (Blaze.Template[name] instanceof Blaze.Template)) {                                  // 106
    return Blaze.Template[name];                                                                                       // 107
  }                                                                                                                    // 108
  return null;                                                                                                         // 109
};                                                                                                                     // 110
                                                                                                                       // 111
Blaze._getGlobalHelper = function (name, templateInstance) {                                                           // 112
  if (Blaze._globalHelpers[name] != null) {                                                                            // 113
    return wrapHelper(bindDataContext(Blaze._globalHelpers[name]), templateInstance);                                  // 114
  }                                                                                                                    // 115
  return null;                                                                                                         // 116
};                                                                                                                     // 117
                                                                                                                       // 118
// Looks up a name, like "foo" or "..", as a helper of the                                                             // 119
// current template; the name of a template; a global helper;                                                          // 120
// or a property of the data context.  Called on the View of                                                           // 121
// a template (i.e. a View with a `.template` property,                                                                // 122
// where the helpers are).  Used for the first name in a                                                               // 123
// "path" in a template tag, like "foo" in `{{foo.bar}}` or                                                            // 124
// ".." in `{{frobulate ../blah}}`.                                                                                    // 125
//                                                                                                                     // 126
// Returns a function, a non-function value, or null.  If                                                              // 127
// a function is found, it is bound appropriately.                                                                     // 128
//                                                                                                                     // 129
// NOTE: This function must not establish any reactive                                                                 // 130
// dependencies itself.  If there is any reactivity in the                                                             // 131
// value, lookup should return a function.                                                                             // 132
Blaze.View.prototype.lookup = function (name, _options) {                                                              // 133
  var template = this.template;                                                                                        // 134
  var lookupTemplate = _options && _options.template;                                                                  // 135
  var helper;                                                                                                          // 136
  var binding;                                                                                                         // 137
  var boundTmplInstance;                                                                                               // 138
  var foundTemplate;                                                                                                   // 139
                                                                                                                       // 140
  if (this.templateInstance) {                                                                                         // 141
    boundTmplInstance = _.bind(this.templateInstance, this);                                                           // 142
  }                                                                                                                    // 143
                                                                                                                       // 144
  // 0. looking up the parent data context with the special "../" syntax                                               // 145
  if (/^\./.test(name)) {                                                                                              // 146
    // starts with a dot. must be a series of dots which maps to an                                                    // 147
    // ancestor of the appropriate height.                                                                             // 148
    if (!/^(\.)+$/.test(name))                                                                                         // 149
      throw new Error("id starting with dot must be a series of dots");                                                // 150
                                                                                                                       // 151
    return Blaze._parentData(name.length - 1, true /*_functionWrapped*/);                                              // 152
                                                                                                                       // 153
  }                                                                                                                    // 154
                                                                                                                       // 155
  // 1. look up a helper on the current template                                                                       // 156
  if (template && ((helper = Blaze._getTemplateHelper(template, name, boundTmplInstance)) != null)) {                  // 157
    return helper;                                                                                                     // 158
  }                                                                                                                    // 159
                                                                                                                       // 160
  // 2. look up a binding by traversing the lexical view hierarchy inside the                                          // 161
  // current template                                                                                                  // 162
  if (template && (binding = Blaze._lexicalBindingLookup(Blaze.currentView, name)) != null) {                          // 163
    return binding;                                                                                                    // 164
  }                                                                                                                    // 165
                                                                                                                       // 166
  // 3. look up a template by name                                                                                     // 167
  if (lookupTemplate && ((foundTemplate = Blaze._getTemplate(name, boundTmplInstance)) != null)) {                     // 168
    return foundTemplate;                                                                                              // 169
  }                                                                                                                    // 170
                                                                                                                       // 171
  // 4. look up a global helper                                                                                        // 172
  if ((helper = Blaze._getGlobalHelper(name, boundTmplInstance)) != null) {                                            // 173
    return helper;                                                                                                     // 174
  }                                                                                                                    // 175
                                                                                                                       // 176
  // 5. look up in a data context                                                                                      // 177
  return function () {                                                                                                 // 178
    var isCalledAsFunction = (arguments.length > 0);                                                                   // 179
    var data = Blaze.getData();                                                                                        // 180
    var x = data && data[name];                                                                                        // 181
    if (! x) {                                                                                                         // 182
      if (lookupTemplate) {                                                                                            // 183
        throw new Error("No such template: " + name);                                                                  // 184
      } else if (isCalledAsFunction) {                                                                                 // 185
        throw new Error("No such function: " + name);                                                                  // 186
      } else if (name.charAt(0) === '@' && ((x === null) ||                                                            // 187
                                            (x === undefined))) {                                                      // 188
        // Throw an error if the user tries to use a `@directive`                                                      // 189
        // that doesn't exist.  We don't implement all directives                                                      // 190
        // from Handlebars, so there's a potential for confusion                                                       // 191
        // if we fail silently.  On the other hand, we want to                                                         // 192
        // throw late in case some app or package wants to provide                                                     // 193
        // a missing directive.                                                                                        // 194
        throw new Error("Unsupported directive: " + name);                                                             // 195
      }                                                                                                                // 196
    }                                                                                                                  // 197
    if (! data) {                                                                                                      // 198
      return null;                                                                                                     // 199
    }                                                                                                                  // 200
    if (typeof x !== 'function') {                                                                                     // 201
      if (isCalledAsFunction) {                                                                                        // 202
        throw new Error("Can't call non-function: " + x);                                                              // 203
      }                                                                                                                // 204
      return x;                                                                                                        // 205
    }                                                                                                                  // 206
    return x.apply(data, arguments);                                                                                   // 207
  };                                                                                                                   // 208
};                                                                                                                     // 209
                                                                                                                       // 210
// Implement Spacebars' {{../..}}.                                                                                     // 211
// @param height {Number} The number of '..'s                                                                          // 212
Blaze._parentData = function (height, _functionWrapped) {                                                              // 213
  // If height is null or undefined, we default to 1, the first parent.                                                // 214
  if (height == null) {                                                                                                // 215
    height = 1;                                                                                                        // 216
  }                                                                                                                    // 217
  var theWith = Blaze.getView('with');                                                                                 // 218
  for (var i = 0; (i < height) && theWith; i++) {                                                                      // 219
    theWith = Blaze.getView(theWith, 'with');                                                                          // 220
  }                                                                                                                    // 221
                                                                                                                       // 222
  if (! theWith)                                                                                                       // 223
    return null;                                                                                                       // 224
  if (_functionWrapped)                                                                                                // 225
    return function () { return theWith.dataVar.get(); };                                                              // 226
  return theWith.dataVar.get();                                                                                        // 227
};                                                                                                                     // 228
                                                                                                                       // 229
                                                                                                                       // 230
Blaze.View.prototype.lookupTemplate = function (name) {                                                                // 231
  return this.lookup(name, {template:true});                                                                           // 232
};                                                                                                                     // 233
                                                                                                                       // 234
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/blaze/template.js                                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// [new] Blaze.Template([viewName], renderFunction)                                                                    // 1
//                                                                                                                     // 2
// `Blaze.Template` is the class of templates, like `Template.foo` in                                                  // 3
// Meteor, which is `instanceof Template`.                                                                             // 4
//                                                                                                                     // 5
// `viewKind` is a string that looks like "Template.foo" for templates                                                 // 6
// defined by the compiler.                                                                                            // 7
                                                                                                                       // 8
/**                                                                                                                    // 9
 * @class                                                                                                              // 10
 * @summary Constructor for a Template, which is used to construct Views with particular name and content.             // 11
 * @locus Client                                                                                                       // 12
 * @param {String} [viewName] Optional.  A name for Views constructed by this Template.  See [`view.name`](#view_name).
 * @param {Function} renderFunction A function that returns [*renderable content*](#renderable_content).  This function is used as the `renderFunction` for Views constructed by this Template.
 */                                                                                                                    // 15
Blaze.Template = function (viewName, renderFunction) {                                                                 // 16
  if (! (this instanceof Blaze.Template))                                                                              // 17
    // called without `new`                                                                                            // 18
    return new Blaze.Template(viewName, renderFunction);                                                               // 19
                                                                                                                       // 20
  if (typeof viewName === 'function') {                                                                                // 21
    // omitted "viewName" argument                                                                                     // 22
    renderFunction = viewName;                                                                                         // 23
    viewName = '';                                                                                                     // 24
  }                                                                                                                    // 25
  if (typeof viewName !== 'string')                                                                                    // 26
    throw new Error("viewName must be a String (or omitted)");                                                         // 27
  if (typeof renderFunction !== 'function')                                                                            // 28
    throw new Error("renderFunction must be a function");                                                              // 29
                                                                                                                       // 30
  this.viewName = viewName;                                                                                            // 31
  this.renderFunction = renderFunction;                                                                                // 32
                                                                                                                       // 33
  this.__helpers = new HelperMap;                                                                                      // 34
  this.__eventMaps = [];                                                                                               // 35
                                                                                                                       // 36
  this._callbacks = {                                                                                                  // 37
    created: [],                                                                                                       // 38
    rendered: [],                                                                                                      // 39
    destroyed: []                                                                                                      // 40
  };                                                                                                                   // 41
};                                                                                                                     // 42
var Template = Blaze.Template;                                                                                         // 43
                                                                                                                       // 44
var HelperMap = function () {};                                                                                        // 45
HelperMap.prototype.get = function (name) {                                                                            // 46
  return this[' '+name];                                                                                               // 47
};                                                                                                                     // 48
HelperMap.prototype.set = function (name, helper) {                                                                    // 49
  this[' '+name] = helper;                                                                                             // 50
};                                                                                                                     // 51
HelperMap.prototype.has = function (name) {                                                                            // 52
  return (' '+name) in this;                                                                                           // 53
};                                                                                                                     // 54
                                                                                                                       // 55
/**                                                                                                                    // 56
 * @summary Returns true if `value` is a template object like `Template.myTemplate`.                                   // 57
 * @locus Client                                                                                                       // 58
 * @param {Any} value The value to test.                                                                               // 59
 */                                                                                                                    // 60
Blaze.isTemplate = function (t) {                                                                                      // 61
  return (t instanceof Blaze.Template);                                                                                // 62
};                                                                                                                     // 63
                                                                                                                       // 64
/**                                                                                                                    // 65
 * @name  onCreated                                                                                                    // 66
 * @instance                                                                                                           // 67
 * @memberOf Template                                                                                                  // 68
 * @summary Register a function to be called when an instance of this template is created.                             // 69
 * @param {Function} callback A function to be added as a callback.                                                    // 70
 * @locus Client                                                                                                       // 71
 */                                                                                                                    // 72
Template.prototype.onCreated = function (cb) {                                                                         // 73
  this._callbacks.created.push(cb);                                                                                    // 74
};                                                                                                                     // 75
                                                                                                                       // 76
/**                                                                                                                    // 77
 * @name  onRendered                                                                                                   // 78
 * @instance                                                                                                           // 79
 * @memberOf Template                                                                                                  // 80
 * @summary Register a function to be called when an instance of this template is inserted into the DOM.               // 81
 * @param {Function} callback A function to be added as a callback.                                                    // 82
 * @locus Client                                                                                                       // 83
 */                                                                                                                    // 84
Template.prototype.onRendered = function (cb) {                                                                        // 85
  this._callbacks.rendered.push(cb);                                                                                   // 86
};                                                                                                                     // 87
                                                                                                                       // 88
/**                                                                                                                    // 89
 * @name  onDestroyed                                                                                                  // 90
 * @instance                                                                                                           // 91
 * @memberOf Template                                                                                                  // 92
 * @summary Register a function to be called when an instance of this template is removed from the DOM and destroyed.  // 93
 * @param {Function} callback A function to be added as a callback.                                                    // 94
 * @locus Client                                                                                                       // 95
 */                                                                                                                    // 96
Template.prototype.onDestroyed = function (cb) {                                                                       // 97
  this._callbacks.destroyed.push(cb);                                                                                  // 98
};                                                                                                                     // 99
                                                                                                                       // 100
Template.prototype._getCallbacks = function (which) {                                                                  // 101
  var self = this;                                                                                                     // 102
  var callbacks = self[which] ? [self[which]] : [];                                                                    // 103
  // Fire all callbacks added with the new API (Template.onRendered())                                                 // 104
  // as well as the old-style callback (e.g. Template.rendered) for                                                    // 105
  // backwards-compatibility.                                                                                          // 106
  callbacks = callbacks.concat(self._callbacks[which]);                                                                // 107
  return callbacks;                                                                                                    // 108
};                                                                                                                     // 109
                                                                                                                       // 110
var fireCallbacks = function (callbacks, template) {                                                                   // 111
  Template._withTemplateInstanceFunc(                                                                                  // 112
    function () { return template; },                                                                                  // 113
    function () {                                                                                                      // 114
      for (var i = 0, N = callbacks.length; i < N; i++) {                                                              // 115
        callbacks[i].call(template);                                                                                   // 116
      }                                                                                                                // 117
    });                                                                                                                // 118
};                                                                                                                     // 119
                                                                                                                       // 120
Template.prototype.constructView = function (contentFunc, elseFunc) {                                                  // 121
  var self = this;                                                                                                     // 122
  var view = Blaze.View(self.viewName, self.renderFunction);                                                           // 123
  view.template = self;                                                                                                // 124
                                                                                                                       // 125
  view.templateContentBlock = (                                                                                        // 126
    contentFunc ? new Template('(contentBlock)', contentFunc) : null);                                                 // 127
  view.templateElseBlock = (                                                                                           // 128
    elseFunc ? new Template('(elseBlock)', elseFunc) : null);                                                          // 129
                                                                                                                       // 130
  if (self.__eventMaps || typeof self.events === 'object') {                                                           // 131
    view._onViewRendered(function () {                                                                                 // 132
      if (view.renderCount !== 1)                                                                                      // 133
        return;                                                                                                        // 134
                                                                                                                       // 135
      if (! self.__eventMaps.length && typeof self.events === "object") {                                              // 136
        // Provide limited back-compat support for `.events = {...}`                                                   // 137
        // syntax.  Pass `template.events` to the original `.events(...)`                                              // 138
        // function.  This code must run only once per template, in                                                    // 139
        // order to not bind the handlers more than once, which is                                                     // 140
        // ensured by the fact that we only do this when `__eventMaps`                                                 // 141
        // is falsy, and we cause it to be set now.                                                                    // 142
        Template.prototype.events.call(self, self.events);                                                             // 143
      }                                                                                                                // 144
                                                                                                                       // 145
      _.each(self.__eventMaps, function (m) {                                                                          // 146
        Blaze._addEventMap(view, m, view);                                                                             // 147
      });                                                                                                              // 148
    });                                                                                                                // 149
  }                                                                                                                    // 150
                                                                                                                       // 151
  view._templateInstance = new Blaze.TemplateInstance(view);                                                           // 152
  view.templateInstance = function () {                                                                                // 153
    // Update data, firstNode, and lastNode, and return the TemplateInstance                                           // 154
    // object.                                                                                                         // 155
    var inst = view._templateInstance;                                                                                 // 156
                                                                                                                       // 157
    /**                                                                                                                // 158
     * @instance                                                                                                       // 159
     * @memberOf Blaze.TemplateInstance                                                                                // 160
     * @name  data                                                                                                     // 161
     * @summary The data context of this instance's latest invocation.                                                 // 162
     * @locus Client                                                                                                   // 163
     */                                                                                                                // 164
    inst.data = Blaze.getData(view);                                                                                   // 165
                                                                                                                       // 166
    if (view._domrange && !view.isDestroyed) {                                                                         // 167
      inst.firstNode = view._domrange.firstNode();                                                                     // 168
      inst.lastNode = view._domrange.lastNode();                                                                       // 169
    } else {                                                                                                           // 170
      // on 'created' or 'destroyed' callbacks we don't have a DomRange                                                // 171
      inst.firstNode = null;                                                                                           // 172
      inst.lastNode = null;                                                                                            // 173
    }                                                                                                                  // 174
                                                                                                                       // 175
    return inst;                                                                                                       // 176
  };                                                                                                                   // 177
                                                                                                                       // 178
  /**                                                                                                                  // 179
   * @name  created                                                                                                    // 180
   * @instance                                                                                                         // 181
   * @memberOf Template                                                                                                // 182
   * @summary Provide a callback when an instance of a template is created.                                            // 183
   * @locus Client                                                                                                     // 184
   * @deprecated in 1.1                                                                                                // 185
   */                                                                                                                  // 186
  // To avoid situations when new callbacks are added in between view                                                  // 187
  // instantiation and event being fired, decide on all callbacks to fire                                              // 188
  // immediately and then fire them on the event.                                                                      // 189
  var createdCallbacks = self._getCallbacks('created');                                                                // 190
  view.onViewCreated(function () {                                                                                     // 191
    fireCallbacks(createdCallbacks, view.templateInstance());                                                          // 192
  });                                                                                                                  // 193
                                                                                                                       // 194
  /**                                                                                                                  // 195
   * @name  rendered                                                                                                   // 196
   * @instance                                                                                                         // 197
   * @memberOf Template                                                                                                // 198
   * @summary Provide a callback when an instance of a template is rendered.                                           // 199
   * @locus Client                                                                                                     // 200
   * @deprecated in 1.1                                                                                                // 201
   */                                                                                                                  // 202
  var renderedCallbacks = self._getCallbacks('rendered');                                                              // 203
  view.onViewReady(function () {                                                                                       // 204
    fireCallbacks(renderedCallbacks, view.templateInstance());                                                         // 205
  });                                                                                                                  // 206
                                                                                                                       // 207
  /**                                                                                                                  // 208
   * @name  destroyed                                                                                                  // 209
   * @instance                                                                                                         // 210
   * @memberOf Template                                                                                                // 211
   * @summary Provide a callback when an instance of a template is destroyed.                                          // 212
   * @locus Client                                                                                                     // 213
   * @deprecated in 1.1                                                                                                // 214
   */                                                                                                                  // 215
  var destroyedCallbacks = self._getCallbacks('destroyed');                                                            // 216
  view.onViewDestroyed(function () {                                                                                   // 217
    fireCallbacks(destroyedCallbacks, view.templateInstance());                                                        // 218
  });                                                                                                                  // 219
                                                                                                                       // 220
  return view;                                                                                                         // 221
};                                                                                                                     // 222
                                                                                                                       // 223
/**                                                                                                                    // 224
 * @class                                                                                                              // 225
 * @summary The class for template instances                                                                           // 226
 * @param {Blaze.View} view                                                                                            // 227
 * @instanceName template                                                                                              // 228
 */                                                                                                                    // 229
Blaze.TemplateInstance = function (view) {                                                                             // 230
  if (! (this instanceof Blaze.TemplateInstance))                                                                      // 231
    // called without `new`                                                                                            // 232
    return new Blaze.TemplateInstance(view);                                                                           // 233
                                                                                                                       // 234
  if (! (view instanceof Blaze.View))                                                                                  // 235
    throw new Error("View required");                                                                                  // 236
                                                                                                                       // 237
  view._templateInstance = this;                                                                                       // 238
                                                                                                                       // 239
  /**                                                                                                                  // 240
   * @name view                                                                                                        // 241
   * @memberOf Blaze.TemplateInstance                                                                                  // 242
   * @instance                                                                                                         // 243
   * @summary The [View](#blaze_view) object for this invocation of the template.                                      // 244
   * @locus Client                                                                                                     // 245
   * @type {Blaze.View}                                                                                                // 246
   */                                                                                                                  // 247
  this.view = view;                                                                                                    // 248
  this.data = null;                                                                                                    // 249
                                                                                                                       // 250
  /**                                                                                                                  // 251
   * @name firstNode                                                                                                   // 252
   * @memberOf Blaze.TemplateInstance                                                                                  // 253
   * @instance                                                                                                         // 254
   * @summary The first top-level DOM node in this template instance.                                                  // 255
   * @locus Client                                                                                                     // 256
   * @type {DOMNode}                                                                                                   // 257
   */                                                                                                                  // 258
  this.firstNode = null;                                                                                               // 259
                                                                                                                       // 260
  /**                                                                                                                  // 261
   * @name lastNode                                                                                                    // 262
   * @memberOf Blaze.TemplateInstance                                                                                  // 263
   * @instance                                                                                                         // 264
   * @summary The last top-level DOM node in this template instance.                                                   // 265
   * @locus Client                                                                                                     // 266
   * @type {DOMNode}                                                                                                   // 267
   */                                                                                                                  // 268
  this.lastNode = null;                                                                                                // 269
                                                                                                                       // 270
  // This dependency is used to identify state transitions in                                                          // 271
  // _subscriptionHandles which could cause the result of                                                              // 272
  // TemplateInstance#subscriptionsReady to change. Basically this is triggered                                        // 273
  // whenever a new subscription handle is added or when a subscription handle                                         // 274
  // is removed and they are not ready.                                                                                // 275
  this._allSubsReadyDep = new Tracker.Dependency();                                                                    // 276
  this._allSubsReady = false;                                                                                          // 277
                                                                                                                       // 278
  this._subscriptionHandles = {};                                                                                      // 279
};                                                                                                                     // 280
                                                                                                                       // 281
/**                                                                                                                    // 282
 * @summary Find all elements matching `selector` in this template instance, and return them as a JQuery object.       // 283
 * @locus Client                                                                                                       // 284
 * @param {String} selector The CSS selector to match, scoped to the template contents.                                // 285
 * @returns {DOMNode[]}                                                                                                // 286
 */                                                                                                                    // 287
Blaze.TemplateInstance.prototype.$ = function (selector) {                                                             // 288
  var view = this.view;                                                                                                // 289
  if (! view._domrange)                                                                                                // 290
    throw new Error("Can't use $ on template instance with no DOM");                                                   // 291
  return view._domrange.$(selector);                                                                                   // 292
};                                                                                                                     // 293
                                                                                                                       // 294
/**                                                                                                                    // 295
 * @summary Find all elements matching `selector` in this template instance.                                           // 296
 * @locus Client                                                                                                       // 297
 * @param {String} selector The CSS selector to match, scoped to the template contents.                                // 298
 * @returns {DOMElement[]}                                                                                             // 299
 */                                                                                                                    // 300
Blaze.TemplateInstance.prototype.findAll = function (selector) {                                                       // 301
  return Array.prototype.slice.call(this.$(selector));                                                                 // 302
};                                                                                                                     // 303
                                                                                                                       // 304
/**                                                                                                                    // 305
 * @summary Find one element matching `selector` in this template instance.                                            // 306
 * @locus Client                                                                                                       // 307
 * @param {String} selector The CSS selector to match, scoped to the template contents.                                // 308
 * @returns {DOMElement}                                                                                               // 309
 */                                                                                                                    // 310
Blaze.TemplateInstance.prototype.find = function (selector) {                                                          // 311
  var result = this.$(selector);                                                                                       // 312
  return result[0] || null;                                                                                            // 313
};                                                                                                                     // 314
                                                                                                                       // 315
/**                                                                                                                    // 316
 * @summary A version of [Tracker.autorun](#tracker_autorun) that is stopped when the template is destroyed.           // 317
 * @locus Client                                                                                                       // 318
 * @param {Function} runFunc The function to run. It receives one argument: a Tracker.Computation object.              // 319
 */                                                                                                                    // 320
Blaze.TemplateInstance.prototype.autorun = function (f) {                                                              // 321
  return this.view.autorun(f);                                                                                         // 322
};                                                                                                                     // 323
                                                                                                                       // 324
/**                                                                                                                    // 325
 * @summary A version of [Meteor.subscribe](#meteor_subscribe) that is stopped                                         // 326
 * when the template is destroyed.                                                                                     // 327
 * @return {SubscriptionHandle} The subscription handle to the newly made                                              // 328
 * subscription. Call `handle.stop()` to manually stop the subscription, or                                            // 329
 * `handle.ready()` to find out if this particular subscription has loaded all                                         // 330
 * of its inital data.                                                                                                 // 331
 * @locus Client                                                                                                       // 332
 * @param {String} name Name of the subscription.  Matches the name of the                                             // 333
 * server's `publish()` call.                                                                                          // 334
 * @param {Any} [arg1,arg2...] Optional arguments passed to publisher function                                         // 335
 * on server.                                                                                                          // 336
 * @param {Function|Object} [options] If a function is passed instead of an                                            // 337
 * object, it is interpreted as an `onReady` callback.                                                                 // 338
 * @param {Function} [options.onReady] Passed to [`Meteor.subscribe`](#meteor_subscribe).                              // 339
 * @param {Function} [options.onStop] Passed to [`Meteor.subscribe`](#meteor_subscribe).                               // 340
 * @param {DDP.Connection} [options.connection] The connection on which to make the                                    // 341
 * subscription.                                                                                                       // 342
 */                                                                                                                    // 343
Blaze.TemplateInstance.prototype.subscribe = function (/* arguments */) {                                              // 344
  var self = this;                                                                                                     // 345
                                                                                                                       // 346
  var subHandles = self._subscriptionHandles;                                                                          // 347
  var args = _.toArray(arguments);                                                                                     // 348
                                                                                                                       // 349
  // Duplicate logic from Meteor.subscribe                                                                             // 350
  var options = {};                                                                                                    // 351
  if (args.length) {                                                                                                   // 352
    var lastParam = _.last(args);                                                                                      // 353
                                                                                                                       // 354
    // Match pattern to check if the last arg is an options argument                                                   // 355
    var lastParamOptionsPattern = {                                                                                    // 356
      onReady: Match.Optional(Function),                                                                               // 357
      // XXX COMPAT WITH 1.0.3.1 onError used to exist, but now we use                                                 // 358
      // onStop with an error callback instead.                                                                        // 359
      onError: Match.Optional(Function),                                                                               // 360
      onStop: Match.Optional(Function),                                                                                // 361
      connection: Match.Optional(Match.Any)                                                                            // 362
    };                                                                                                                 // 363
                                                                                                                       // 364
    if (_.isFunction(lastParam)) {                                                                                     // 365
      options.onReady = args.pop();                                                                                    // 366
    } else if (lastParam && Match.test(lastParam, lastParamOptionsPattern)) {                                          // 367
      options = args.pop();                                                                                            // 368
    }                                                                                                                  // 369
  }                                                                                                                    // 370
                                                                                                                       // 371
  var subHandle;                                                                                                       // 372
  var oldStopped = options.onStop;                                                                                     // 373
  options.onStop = function (error) {                                                                                  // 374
    // When the subscription is stopped, remove it from the set of tracked                                             // 375
    // subscriptions to avoid this list growing without bound                                                          // 376
    delete subHandles[subHandle.subscriptionId];                                                                       // 377
                                                                                                                       // 378
    // Removing a subscription can only change the result of subscriptionsReady                                        // 379
    // if we are not ready (that subscription could be the one blocking us being                                       // 380
    // ready).                                                                                                         // 381
    if (! self._allSubsReady) {                                                                                        // 382
      self._allSubsReadyDep.changed();                                                                                 // 383
    }                                                                                                                  // 384
                                                                                                                       // 385
    if (oldStopped) {                                                                                                  // 386
      oldStopped(error);                                                                                               // 387
    }                                                                                                                  // 388
  };                                                                                                                   // 389
                                                                                                                       // 390
  var connection = options.connection;                                                                                 // 391
  var callbacks = _.pick(options, ["onReady", "onError", "onStop"]);                                                   // 392
                                                                                                                       // 393
  // The callbacks are passed as the last item in the arguments array passed to                                        // 394
  // View#subscribe                                                                                                    // 395
  args.push(callbacks);                                                                                                // 396
                                                                                                                       // 397
  // View#subscribe takes the connection as one of the options in the last                                             // 398
  // argument                                                                                                          // 399
  subHandle = self.view.subscribe.call(self.view, args, {                                                              // 400
    connection: connection                                                                                             // 401
  });                                                                                                                  // 402
                                                                                                                       // 403
  if (! _.has(subHandles, subHandle.subscriptionId)) {                                                                 // 404
    subHandles[subHandle.subscriptionId] = subHandle;                                                                  // 405
                                                                                                                       // 406
    // Adding a new subscription will always cause us to transition from ready                                         // 407
    // to not ready, but if we are already not ready then this can't make us                                           // 408
    // ready.                                                                                                          // 409
    if (self._allSubsReady) {                                                                                          // 410
      self._allSubsReadyDep.changed();                                                                                 // 411
    }                                                                                                                  // 412
  }                                                                                                                    // 413
                                                                                                                       // 414
  return subHandle;                                                                                                    // 415
};                                                                                                                     // 416
                                                                                                                       // 417
/**                                                                                                                    // 418
 * @summary A reactive function that returns true when all of the subscriptions                                        // 419
 * called with [this.subscribe](#TemplateInstance-subscribe) are ready.                                                // 420
 * @return {Boolean} True if all subscriptions on this template instance are                                           // 421
 * ready.                                                                                                              // 422
 */                                                                                                                    // 423
Blaze.TemplateInstance.prototype.subscriptionsReady = function () {                                                    // 424
  this._allSubsReadyDep.depend();                                                                                      // 425
                                                                                                                       // 426
  this._allSubsReady = _.all(this._subscriptionHandles, function (handle) {                                            // 427
    return handle.ready();                                                                                             // 428
  });                                                                                                                  // 429
                                                                                                                       // 430
  return this._allSubsReady;                                                                                           // 431
};                                                                                                                     // 432
                                                                                                                       // 433
/**                                                                                                                    // 434
 * @summary Specify template helpers available to this template.                                                       // 435
 * @locus Client                                                                                                       // 436
 * @param {Object} helpers Dictionary of helper functions by name.                                                     // 437
 */                                                                                                                    // 438
Template.prototype.helpers = function (dict) {                                                                         // 439
  for (var k in dict)                                                                                                  // 440
    this.__helpers.set(k, dict[k]);                                                                                    // 441
};                                                                                                                     // 442
                                                                                                                       // 443
// Kind of like Blaze.currentView but for the template instance.                                                       // 444
// This is a function, not a value -- so that not all helpers                                                          // 445
// are implicitly dependent on the current template instance's `data` property,                                        // 446
// which would make them dependenct on the data context of the template                                                // 447
// inclusion.                                                                                                          // 448
Template._currentTemplateInstanceFunc = null;                                                                          // 449
                                                                                                                       // 450
Template._withTemplateInstanceFunc = function (templateInstanceFunc, func) {                                           // 451
  if (typeof func !== 'function')                                                                                      // 452
    throw new Error("Expected function, got: " + func);                                                                // 453
  var oldTmplInstanceFunc = Template._currentTemplateInstanceFunc;                                                     // 454
  try {                                                                                                                // 455
    Template._currentTemplateInstanceFunc = templateInstanceFunc;                                                      // 456
    return func();                                                                                                     // 457
  } finally {                                                                                                          // 458
    Template._currentTemplateInstanceFunc = oldTmplInstanceFunc;                                                       // 459
  }                                                                                                                    // 460
};                                                                                                                     // 461
                                                                                                                       // 462
/**                                                                                                                    // 463
 * @summary Specify event handlers for this template.                                                                  // 464
 * @locus Client                                                                                                       // 465
 * @param {EventMap} eventMap Event handlers to associate with this template.                                          // 466
 */                                                                                                                    // 467
Template.prototype.events = function (eventMap) {                                                                      // 468
  var template = this;                                                                                                 // 469
  var eventMap2 = {};                                                                                                  // 470
  for (var k in eventMap) {                                                                                            // 471
    eventMap2[k] = (function (k, v) {                                                                                  // 472
      return function (event/*, ...*/) {                                                                               // 473
        var view = this; // passed by EventAugmenter                                                                   // 474
        var data = Blaze.getData(event.currentTarget);                                                                 // 475
        if (data == null)                                                                                              // 476
          data = {};                                                                                                   // 477
        var args = Array.prototype.slice.call(arguments);                                                              // 478
        var tmplInstanceFunc = _.bind(view.templateInstance, view);                                                    // 479
        args.splice(1, 0, tmplInstanceFunc());                                                                         // 480
                                                                                                                       // 481
        return Template._withTemplateInstanceFunc(tmplInstanceFunc, function () {                                      // 482
          return v.apply(data, args);                                                                                  // 483
        });                                                                                                            // 484
      };                                                                                                               // 485
    })(k, eventMap[k]);                                                                                                // 486
  }                                                                                                                    // 487
                                                                                                                       // 488
  template.__eventMaps.push(eventMap2);                                                                                // 489
};                                                                                                                     // 490
                                                                                                                       // 491
/**                                                                                                                    // 492
 * @function                                                                                                           // 493
 * @name instance                                                                                                      // 494
 * @memberOf Template                                                                                                  // 495
 * @summary The [template instance](#template_inst) corresponding to the current template helper, event handler, callback, or autorun.  If there isn't one, `null`.
 * @locus Client                                                                                                       // 497
 * @returns {Blaze.TemplateInstance}                                                                                   // 498
 */                                                                                                                    // 499
Template.instance = function () {                                                                                      // 500
  return Template._currentTemplateInstanceFunc                                                                         // 501
    && Template._currentTemplateInstanceFunc();                                                                        // 502
};                                                                                                                     // 503
                                                                                                                       // 504
// Note: Template.currentData() is documented to take zero arguments,                                                  // 505
// while Blaze.getData takes up to one.                                                                                // 506
                                                                                                                       // 507
/**                                                                                                                    // 508
 * @summary                                                                                                            // 509
 *                                                                                                                     // 510
 * - Inside an `onCreated`, `onRendered`, or `onDestroyed` callback, returns                                           // 511
 * the data context of the template.                                                                                   // 512
 * - Inside an event handler, returns the data context of the template on which                                        // 513
 * this event handler was defined.                                                                                     // 514
 * - Inside a helper, returns the data context of the DOM node where the helper                                        // 515
 * was used.                                                                                                           // 516
 *                                                                                                                     // 517
 * Establishes a reactive dependency on the result.                                                                    // 518
 * @locus Client                                                                                                       // 519
 * @function                                                                                                           // 520
 */                                                                                                                    // 521
Template.currentData = Blaze.getData;                                                                                  // 522
                                                                                                                       // 523
/**                                                                                                                    // 524
 * @summary Accesses other data contexts that enclose the current data context.                                        // 525
 * @locus Client                                                                                                       // 526
 * @function                                                                                                           // 527
 * @param {Integer} [numLevels] The number of levels beyond the current data context to look. Defaults to 1.           // 528
 */                                                                                                                    // 529
Template.parentData = Blaze._parentData;                                                                               // 530
                                                                                                                       // 531
/**                                                                                                                    // 532
 * @summary Defines a [helper function](#template_helpers) which can be used from all templates.                       // 533
 * @locus Client                                                                                                       // 534
 * @function                                                                                                           // 535
 * @param {String} name The name of the helper function you are defining.                                              // 536
 * @param {Function} function The helper function itself.                                                              // 537
 */                                                                                                                    // 538
Template.registerHelper = Blaze.registerHelper;                                                                        // 539
                                                                                                                       // 540
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/blaze/backcompat.js                                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
UI = Blaze;                                                                                                            // 1
                                                                                                                       // 2
Blaze.ReactiveVar = ReactiveVar;                                                                                       // 3
UI._templateInstance = Blaze.Template.instance;                                                                        // 4
                                                                                                                       // 5
Handlebars = {};                                                                                                       // 6
Handlebars.registerHelper = Blaze.registerHelper;                                                                      // 7
                                                                                                                       // 8
Handlebars._escape = Blaze._escape;                                                                                    // 9
                                                                                                                       // 10
// Return these from {{...}} helpers to achieve the same as returning                                                  // 11
// strings from {{{...}}} helpers                                                                                      // 12
Handlebars.SafeString = function(string) {                                                                             // 13
  this.string = string;                                                                                                // 14
};                                                                                                                     // 15
Handlebars.SafeString.prototype.toString = function() {                                                                // 16
  return this.string.toString();                                                                                       // 17
};                                                                                                                     // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.blaze = {
  Blaze: Blaze,
  UI: UI,
  Handlebars: Handlebars
};

})();

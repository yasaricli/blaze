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
var _ = Package.underscore._;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var EJSON = Package.ejson.EJSON;

/* Package-scope variables */
var ReactiveDict;

(function(){

//////////////////////////////////////////////////////////////////////////////////
//                                                                              //
// packages/reactive-dict/reactive-dict.js                                      //
//                                                                              //
//////////////////////////////////////////////////////////////////////////////////
                                                                                //
// XXX come up with a serialization method which canonicalizes object key       // 1
// order, which would allow us to use objects as values for equals.             // 2
var stringify = function (value) {                                              // 3
  if (value === undefined)                                                      // 4
    return 'undefined';                                                         // 5
  return EJSON.stringify(value);                                                // 6
};                                                                              // 7
var parse = function (serialized) {                                             // 8
  if (serialized === undefined || serialized === 'undefined')                   // 9
    return undefined;                                                           // 10
  return EJSON.parse(serialized);                                               // 11
};                                                                              // 12
                                                                                // 13
var changed = function (v) {                                                    // 14
  v && v.changed();                                                             // 15
};                                                                              // 16
                                                                                // 17
// XXX COMPAT WITH 0.9.1 : accept migrationData instead of dictName             // 18
ReactiveDict = function (dictName) {                                            // 19
  // this.keys: key -> value                                                    // 20
  if (dictName) {                                                               // 21
    if (typeof dictName === 'string') {                                         // 22
      // the normal case, argument is a string name.                            // 23
      // _registerDictForMigrate will throw an error on duplicate name.         // 24
      ReactiveDict._registerDictForMigrate(dictName, this);                     // 25
      this.keys = ReactiveDict._loadMigratedDict(dictName) || {};               // 26
      this.name = dictName;                                                     // 27
    } else if (typeof dictName === 'object') {                                  // 28
      // back-compat case: dictName is actually migrationData                   // 29
      this.keys = dictName;                                                     // 30
    } else {                                                                    // 31
      throw new Error("Invalid ReactiveDict argument: " + dictName);            // 32
    }                                                                           // 33
  } else {                                                                      // 34
    // no name given; no migration will be performed                            // 35
    this.keys = {};                                                             // 36
  }                                                                             // 37
                                                                                // 38
  this.allDeps = new Tracker.Dependency;                                        // 39
  this.keyDeps = {}; // key -> Dependency                                       // 40
  this.keyValueDeps = {}; // key -> Dependency                                  // 41
};                                                                              // 42
                                                                                // 43
_.extend(ReactiveDict.prototype, {                                              // 44
  // set() began as a key/value method, but we are now overloading it           // 45
  // to take an object of key/value pairs, similar to backbone                  // 46
  // http://backbonejs.org/#Model-set                                           // 47
                                                                                // 48
  set: function (keyOrObject, value) {                                          // 49
    var self = this;                                                            // 50
                                                                                // 51
    if ((typeof keyOrObject === 'object') && (value === undefined)) {           // 52
      // Called as `dict.set({...})`                                            // 53
      self._setObject(keyOrObject);                                             // 54
      return;                                                                   // 55
    }                                                                           // 56
    // the input isn't an object, so it must be a key                           // 57
    // and we resume with the rest of the function                              // 58
    var key = keyOrObject;                                                      // 59
                                                                                // 60
    value = stringify(value);                                                   // 61
                                                                                // 62
    var keyExisted = _.has(self.keys, key);                                     // 63
    var oldSerializedValue = keyExisted ? self.keys[key] : 'undefined';         // 64
    var isNewValue = (value !== oldSerializedValue);                            // 65
                                                                                // 66
    self.keys[key] = value;                                                     // 67
                                                                                // 68
    if (isNewValue || !keyExisted) {                                            // 69
      self.allDeps.changed();                                                   // 70
    }                                                                           // 71
                                                                                // 72
    if (isNewValue) {                                                           // 73
      changed(self.keyDeps[key]);                                               // 74
      if (self.keyValueDeps[key]) {                                             // 75
        changed(self.keyValueDeps[key][oldSerializedValue]);                    // 76
        changed(self.keyValueDeps[key][value]);                                 // 77
      }                                                                         // 78
    }                                                                           // 79
  },                                                                            // 80
                                                                                // 81
  setDefault: function (key, value) {                                           // 82
    var self = this;                                                            // 83
    if (! _.has(self.keys, key)) {                                              // 84
      self.set(key, value);                                                     // 85
    }                                                                           // 86
  },                                                                            // 87
                                                                                // 88
  get: function (key) {                                                         // 89
    var self = this;                                                            // 90
    self._ensureKey(key);                                                       // 91
    self.keyDeps[key].depend();                                                 // 92
    return parse(self.keys[key]);                                               // 93
  },                                                                            // 94
                                                                                // 95
  equals: function (key, value) {                                               // 96
    var self = this;                                                            // 97
                                                                                // 98
    // Mongo.ObjectID is in the 'mongo' package                                 // 99
    var ObjectID = null;                                                        // 100
    if (Package.mongo) {                                                        // 101
      ObjectID = Package.mongo.Mongo.ObjectID;                                  // 102
    }                                                                           // 103
                                                                                // 104
    // We don't allow objects (or arrays that might include objects) for        // 105
    // .equals, because JSON.stringify doesn't canonicalize object key          // 106
    // order. (We can make equals have the right return value by parsing the    // 107
    // current value and using EJSON.equals, but we won't have a canonical      // 108
    // element of keyValueDeps[key] to store the dependency.) You can still use
    // "EJSON.equals(reactiveDict.get(key), value)".                            // 110
    //                                                                          // 111
    // XXX we could allow arrays as long as we recursively check that there     // 112
    // are no objects                                                           // 113
    if (typeof value !== 'string' &&                                            // 114
        typeof value !== 'number' &&                                            // 115
        typeof value !== 'boolean' &&                                           // 116
        typeof value !== 'undefined' &&                                         // 117
        !(value instanceof Date) &&                                             // 118
        !(ObjectID && value instanceof ObjectID) &&                             // 119
        value !== null) {                                                       // 120
      throw new Error("ReactiveDict.equals: value must be scalar");             // 121
    }                                                                           // 122
    var serializedValue = stringify(value);                                     // 123
                                                                                // 124
    if (Tracker.active) {                                                       // 125
      self._ensureKey(key);                                                     // 126
                                                                                // 127
      if (! _.has(self.keyValueDeps[key], serializedValue))                     // 128
        self.keyValueDeps[key][serializedValue] = new Tracker.Dependency;       // 129
                                                                                // 130
      var isNew = self.keyValueDeps[key][serializedValue].depend();             // 131
      if (isNew) {                                                              // 132
        Tracker.onInvalidate(function () {                                      // 133
          // clean up [key][serializedValue] if it's now empty, so we don't     // 134
          // use O(n) memory for n = values seen ever                           // 135
          if (! self.keyValueDeps[key][serializedValue].hasDependents())        // 136
            delete self.keyValueDeps[key][serializedValue];                     // 137
        });                                                                     // 138
      }                                                                         // 139
    }                                                                           // 140
                                                                                // 141
    var oldValue = undefined;                                                   // 142
    if (_.has(self.keys, key)) oldValue = parse(self.keys[key]);                // 143
    return EJSON.equals(oldValue, value);                                       // 144
  },                                                                            // 145
                                                                                // 146
  all: function() {                                                             // 147
    this.allDeps.depend();                                                      // 148
    var ret = {};                                                               // 149
    _.each(this.keys, function(value, key) {                                    // 150
      ret[key] = parse(value);                                                  // 151
    });                                                                         // 152
    return ret;                                                                 // 153
  },                                                                            // 154
                                                                                // 155
  clear: function() {                                                           // 156
    var self = this;                                                            // 157
                                                                                // 158
    var oldKeys = self.keys;                                                    // 159
    self.keys = {};                                                             // 160
                                                                                // 161
    self.allDeps.changed();                                                     // 162
                                                                                // 163
    _.each(oldKeys, function(value, key) {                                      // 164
      changed(self.keyDeps[key]);                                               // 165
      changed(self.keyValueDeps[key][value]);                                   // 166
      changed(self.keyValueDeps[key]['undefined']);                             // 167
    });                                                                         // 168
                                                                                // 169
  },                                                                            // 170
                                                                                // 171
  delete: function(key) {                                                       // 172
    var self = this;                                                            // 173
    var didRemove = false;                                                      // 174
                                                                                // 175
    if (_.has(self.keys, key)) {                                                // 176
      var oldValue = self.keys[key];                                            // 177
      delete self.keys[key];                                                    // 178
      changed(self.keyDeps[key]);                                               // 179
      if (self.keyValueDeps[key]) {                                             // 180
        changed(self.keyValueDeps[key][oldValue]);                              // 181
        changed(self.keyValueDeps[key]['undefined']);                           // 182
      }                                                                         // 183
      self.allDeps.changed();                                                   // 184
      didRemove = true;                                                         // 185
    }                                                                           // 186
                                                                                // 187
    return didRemove;                                                           // 188
  },                                                                            // 189
                                                                                // 190
  _setObject: function (object) {                                               // 191
    var self = this;                                                            // 192
                                                                                // 193
    _.each(object, function (value, key){                                       // 194
      self.set(key, value);                                                     // 195
    });                                                                         // 196
  },                                                                            // 197
                                                                                // 198
  _ensureKey: function (key) {                                                  // 199
    var self = this;                                                            // 200
    if (!(key in self.keyDeps)) {                                               // 201
      self.keyDeps[key] = new Tracker.Dependency;                               // 202
      self.keyValueDeps[key] = {};                                              // 203
    }                                                                           // 204
  },                                                                            // 205
                                                                                // 206
  // Get a JSON value that can be passed to the constructor to                  // 207
  // create a new ReactiveDict with the same contents as this one               // 208
  _getMigrationData: function () {                                              // 209
    // XXX sanitize and make sure it's JSONible?                                // 210
    return this.keys;                                                           // 211
  }                                                                             // 212
});                                                                             // 213
                                                                                // 214
//////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////
//                                                                              //
// packages/reactive-dict/migration.js                                          //
//                                                                              //
//////////////////////////////////////////////////////////////////////////////////
                                                                                //
ReactiveDict._migratedDictData = {}; // name -> data                            // 1
ReactiveDict._dictsToMigrate = {}; // name -> ReactiveDict                      // 2
                                                                                // 3
ReactiveDict._loadMigratedDict = function (dictName) {                          // 4
  if (_.has(ReactiveDict._migratedDictData, dictName))                          // 5
    return ReactiveDict._migratedDictData[dictName];                            // 6
                                                                                // 7
  return null;                                                                  // 8
};                                                                              // 9
                                                                                // 10
ReactiveDict._registerDictForMigrate = function (dictName, dict) {              // 11
  if (_.has(ReactiveDict._dictsToMigrate, dictName))                            // 12
    throw new Error("Duplicate ReactiveDict name: " + dictName);                // 13
                                                                                // 14
  ReactiveDict._dictsToMigrate[dictName] = dict;                                // 15
};                                                                              // 16
                                                                                // 17
if (Meteor.isClient && Package.reload) {                                        // 18
  // Put old migrated data into ReactiveDict._migratedDictData,                 // 19
  // where it can be accessed by ReactiveDict._loadMigratedDict.                // 20
  var migrationData = Package.reload.Reload._migrationData('reactive-dict');    // 21
  if (migrationData && migrationData.dicts)                                     // 22
    ReactiveDict._migratedDictData = migrationData.dicts;                       // 23
                                                                                // 24
  // On migration, assemble the data from all the dicts that have been          // 25
  // registered.                                                                // 26
  Package.reload.Reload._onMigrate('reactive-dict', function () {               // 27
    var dictsToMigrate = ReactiveDict._dictsToMigrate;                          // 28
    var dataToMigrate = {};                                                     // 29
                                                                                // 30
    for (var dictName in dictsToMigrate)                                        // 31
      dataToMigrate[dictName] = dictsToMigrate[dictName]._getMigrationData();   // 32
                                                                                // 33
    return [true, {dicts: dataToMigrate}];                                      // 34
  });                                                                           // 35
}                                                                               // 36
                                                                                // 37
//////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['reactive-dict'] = {
  ReactiveDict: ReactiveDict
};

})();
